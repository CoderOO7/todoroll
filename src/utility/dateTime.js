import { fetchWithTimeout } from './api';

const dateTime = (() => {
  function getLocalTimeZoneByIP() {
    return new Promise(function (resolve, reject) {
      const url = 'https://worldtimeapi.org/api/ip';
      fetchWithTimeout(url)
        .then((response) => response.json())
        .then((data) => {
          resolve(data.timezone);
        })
        .catch((err) => reject(err));
    });
  }

  return { getLocalTimeZoneByIP };
})();

export const { getLocalTimeZoneByIP } = dateTime;
