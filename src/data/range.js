export const range = (start, stop, step) => {
  const a = [stop];
  let b = stop;
  while (b > start) {
    a.push((b -= step || 1));
  }
  return a;
};
