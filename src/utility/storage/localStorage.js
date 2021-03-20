import { APP_NAME } from '../constants';

const appLocalStorage = ((window) => {
  function _storageAvailable(type) {
    try {
      const storage = window[type];
      const x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return false;
    }
  }

  function _getKey(key) {
    return `${APP_NAME}/${key}`;
  }

  function setItem(key, value) {
    if (_storageAvailable('localStorage')) {
      window.localStorage.setItem(_getKey(key), JSON.stringify(value));
    } else {
      console.error('Storage quota exceeded :(');
    }
  }

  function getItem(key) {
    const reference = window.localStorage.getItem(_getKey(key));
    if (reference) {
      return JSON.parse(reference);
    } else {
      console.warn('Provided store key is invalid :(');
      return null;
    }
  }

  function clear() {
    window.sessionStorage.clear();
  }

  return {
    setItem,
    getItem,
    clear
  };
})(window, document);

export { appLocalStorage };
