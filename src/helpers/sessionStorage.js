export const getItem = (key) => {
  const itemStr = sessionStorage.getItem(key);
  if (!itemStr) return null;

  const item = JSON.parse(itemStr);

  if (item.expiry) {
    const now = Date.now();

    const isNotValid = Math.floor(now) > Math.floor(item.expiry);

    if (isNotValid) {
      sessionStorage.removeItem(key);
      return null;
    } else return item.value;
  } else return item.value;
};

export const setItem = (key, value, ttl) => {
  try {
    const item = { value: value };

    if (ttl) {
      const expiryTime = Date.now() + ttl * 1000;
      item.expiry = expiryTime;
    }

    return sessionStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.log(error);
  }
};
