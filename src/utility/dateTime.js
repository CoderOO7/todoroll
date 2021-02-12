const dateTime = (()=>{

  function getLocalTimeZoneByIP() {
    return new Promise(function (resolve, reject) {
      fetch("https://worldtimeapi.org/api/ip",{mode: "cors"})
        .then((response) => response.json())
        .then((data) => {
          resolve(data.timezone);
        })
        .catch((err) => reject(err));
      });
  };

  return{ getLocalTimeZoneByIP };
})();


export const {getLocalTimeZoneByIP} = dateTime;
