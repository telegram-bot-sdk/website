export function getStorageItem(key, defaultVal = null) {
  let data = defaultVal;
  try {
    data = localStorage.getItem(key);
  } catch (err) { }

  return data;
}
