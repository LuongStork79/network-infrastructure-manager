function e(e) {
  let t = e.replace(/[^a-fA-F0-9]/g, ``).toUpperCase();
  return (
    t.length > 12 && (t = t.slice(0, 12)),
    t.match(/.{1,2}/g)?.join(`:`) ?? ``
  );
}
export { e as t };
