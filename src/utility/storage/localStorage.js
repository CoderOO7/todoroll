const appLocalStorage = (function (window) {
  function _storageAvailable(type) {
    try {
      const storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return false;
    }
  }

  function setItem(key, value) {
    if (_storageAvailable("localStorage")) {
      window.localStorage.setItem(key, JSON.stringify(value));
    } else {
      console.error("Storage quota exceeded :(");
    }
  }

  function getItem(key) {
    const reference = window.localStorage.getItem(key);
    if (reference) {
      return JSON.parse(reference);
    } else {
      console.warn("Provided store key is invalid :(");
      return null;
    }
  }

  return {
    setItem,
    getItem,
  };
})(window);

export { appLocalStorage };
