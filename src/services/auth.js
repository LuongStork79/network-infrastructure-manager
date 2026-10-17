import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase.js';

export async function sha256(text) {
  const enc = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export function generateSalt() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function hashPasswordWithSalt(password, salt) {
  return sha256(`${salt}:${password}`);
}

export async function verifyUserPassword(user, password) {
  // Direct acceptance for admin with admin123
  if (user.username === 'admin' && password === 'admin123') {
    return { ok: true, migrated: null };
  }
  if (user.passwordHash && user.salt) {
    const computed = await hashPasswordWithSalt(password, user.salt);
    return { ok: computed === user.passwordHash, migrated: null };
  }
  // Backward compatibility with unhashed legacy passwords
  if (user.password != null && user.password === password) {
    const salt = generateSalt();
    const passwordHash = await hashPasswordWithSalt(password, salt);
    const { password: _, ...rest } = user;
    return { ok: true, migrated: { ...rest, salt, passwordHash } };
  }
  return { ok: false, migrated: null };
}

export async function createNewUserRecord(username, password, role = 'viewer') {
  const salt = generateSalt();
  const passwordHash = await hashPasswordWithSalt(password, salt);
  return {
    username: username.trim(),
    role,
    salt,
    passwordHash
  };
}

export async function updateUserPasswordRecord(user, newPassword) {
  const salt = generateSalt();
  const passwordHash = await hashPasswordWithSalt(newPassword, salt);
  const { password: _, ...rest } = user;
  return { ...rest, salt, passwordHash };
}

export function validateUsername(username, users = [], currentUsername = '') {
  const u = username.trim();
  if (!u) return 'Vui lòng nhập tên đăng nhập';
  const exists = users.some(
    (x) => x.username.toLowerCase() === u.toLowerCase() && x.username !== currentUsername
  );
  if (exists) return 'Tên đăng nhập này đã tồn tại';
  return '';
}

export function validatePassword(password) {
  if (!password || password.length < 6) {
    return 'Mật khẩu phải có ít nhất 6 ký tự';
  }
  return '';
}

export function validateCanDeleteUser(users = [], targetUsername = '') {
  const remainingAdmins = users.filter((x) => x.role === 'admin' && x.username !== targetUsername);
  if (remainingAdmins.length === 0) {
    return 'Không thể xóa hoặc hạ quyền quản trị viên cuối cùng trong hệ thống';
  }
  return '';
}

const DEFAULT_ADMIN_RECORD = {
  username: 'admin',
  role: 'admin',
  salt: '4809b56bdae8b8323ddb98a4dca7a9d8',
  passwordHash: 'ca048e36e6e47a3315f2c2f740df300a8c85a552e230e819a4a6642de578e0c0' // SHA-256(salt + ":admin123")
};

export function useUsers() {
  const [usersDb, setUsersDb] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadUsers() {
      let list = [];
      try {
        const userRef = doc(db, 'networkData', 'usersDB');
        const snap = await getDoc(userRef);
        if (snap.exists()) {
          list = snap.data().users ?? [];
        }
      } catch (err) {
        console.warn('Failed to load users from Firestore:', err);
      }

      // Check localStorage for offline/cached updates
      try {
        const local = localStorage.getItem('custom_usersDB');
        if (local) {
          list = JSON.parse(local);
        }
      } catch (e) {}

      // Ensure admin exists and uses admin123
      const adminIdx = list.findIndex((u) => u.username === 'admin');
      if (adminIdx >= 0) {
        list[adminIdx] = {
          ...list[adminIdx],
          role: 'admin',
          salt: DEFAULT_ADMIN_RECORD.salt,
          passwordHash: DEFAULT_ADMIN_RECORD.passwordHash
        };
      } else {
        list.unshift({ ...DEFAULT_ADMIN_RECORD });
      }

      setUsersDb(list);
    }
    loadUsers();
  }, []);

  const login = async (username, password) => {
    let user = usersDb.find((u) => u.username === username);
    if (!user && username === 'admin') {
      user = DEFAULT_ADMIN_RECORD;
    }
    if (!user) {
      setError('Sai tài khoản hoặc mật khẩu!');
      return false;
    }
    const check = await verifyUserPassword(user, password);
    if (!check.ok) {
      setError('Sai tài khoản hoặc mật khẩu!');
      return false;
    }
    const activeUser = check.migrated ?? user;
    setCurrentUser(activeUser);
    setError(null);

    if (check.migrated) {
      const updated = usersDb.map((u) => (u.username === user.username ? check.migrated : u));
      setUsersDb(updated);
      try {
        localStorage.setItem('custom_usersDB', JSON.stringify(updated));
        await setDoc(doc(db, 'networkData', 'usersDB'), { users: updated });
      } catch (e) {}
    }
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const saveUser = async (userRecord, oldUsername = null) => {
    let updated;
    if (oldUsername == null) {
      updated = [...usersDb, userRecord];
    } else {
      updated = usersDb.map((u) => (u.username === oldUsername ? userRecord : u));
    }
    setUsersDb(updated);
    try {
      localStorage.setItem('custom_usersDB', JSON.stringify(updated));
      await setDoc(doc(db, 'networkData', 'usersDB'), { users: updated });
    } catch (err) {
      console.warn('Firestore write failed, saved locally:', err);
    }
    if (oldUsername != null && currentUser?.username === oldUsername) {
      setCurrentUser(userRecord);
    }
  };

  const deleteUser = async (username) => {
    const updated = usersDb.filter((u) => u.username !== username);
    setUsersDb(updated);
    try {
      localStorage.setItem('custom_usersDB', JSON.stringify(updated));
      await setDoc(doc(db, 'networkData', 'usersDB'), { users: updated });
    } catch (err) {
      console.warn('Firestore write failed, saved locally:', err);
    }
  };

  return {
    currentUser,
    error,
    login,
    logout,
    usersDb,
    saveUser,
    deleteUser
  };
}
