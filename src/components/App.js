import React, { Component } from 'react';
import { format, utcToZonedTime } from 'date-fns-tz';

import HomeScreen from './HomeScreen';
import WelcomeScreen from './WelcomeScreen';
import { appLocalStorage } from '../utility/storage/localStorage.js';
import {
  UNSPLASH_API_ENDPOINT,
  UNSPLASH_API_ACCESS_KEY,
  UNSPLASH_COLLECTION_ID
} from '../utility/contants';
import { getViewportDimensions } from '../utility/helpers';
import { fetchWithTimeout } from '../utility/api';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: appLocalStorage.getItem('userInfo')
        ? appLocalStorage.getItem('userInfo')
        : {},
      isUserWelcomed: appLocalStorage.getItem('isUserWelcomed')
        ? appLocalStorage.getItem('isUserWelcomed')
        : false,

      backgroundImgPath: ''
    };

    this.toggleUserWelcomed = this.toggleUserWelcomed.bind(this);
    this.setAndUpdateUserInfo = this.setAndUpdateUserInfo.bind(this);
    this._setBackgroundImage = this._setBackgroundImage.bind(this);
  }

  componentDidMount() {
    //Initially set background image on app laod
    this._setBackgroundImage();

    //Update background Image
    this.timerId = setInterval(() => {
      this._setBackgroundImage();
    }, 1000 * 10);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  toggleUserWelcomed() {
    appLocalStorage.setItem('isUserWelcomed', !this.state.isUserWelcomed);
    this.setState((prevState) => ({
      isUserWelcomed: !prevState.isUserWelcomed
    }));
  }

  setAndUpdateUserInfo(userName, ltz) {
    const userInfo = Object.assign({}, this.state.userInfo, {
      userName: userName,
      ltz: ltz
    });
    appLocalStorage.setItem('userInfo', userInfo);
    this.setState((prevState) => ({ userInfo }));
  }

  async _getImage() {
    const resMeta = await this._fetchImageMeta();
    const imageData = await this._fetchImageData(resMeta.urls.raw);

    const backgroundImgPath = URL.createObjectURL(imageData);
    this.setState((prevState) => ({ backgroundImgPath }));
  }

  async _fetchImageMeta() {
    const headers = new Headers();
    headers.set('Authorization', `CLIENT-ID ${UNSPLASH_API_ACCESS_KEY}`);
    const url = `${UNSPLASH_API_ENDPOINT}/photos/random`;
    const res = await fetchWithTimeout(`${url}`, { headers }, 3000);
    return res.json();
  }

  async _fetchImageData(url) {
    const width = getViewportDimensions().width;
    const quality = 85;

    const params = new URLSearchParams();

    params.set('w', width);
    params.set('q', quality);

    console.log(params);
    const res = await fetch(url + params, { mode: 'cors' });
    const data = res.blob();
    return data;
  }

  _setBackgroundImage() {
    // if (!this.state.isUserWelcomed) {
    this._getImage('default-bg');
    // } else {
    /* const hours = format(
        utcToZonedTime(new Date(), this.state.userInfo.ltz),
        "HH"
      );
      if (
        hours < 12 &&
        !this.state.backgroundImgPath.includes("good-morning")
      ) {
        this._loadImage("good-morning");
      } else if (
        hours >= 12 &&
        hours < 17 &&
        !this.state.backgroundImgPath.includes("good-afternoon")
      ) {
        this._loadImage("good-afternoon");
      } else if (
        hours >= 17 &&
        hours <= 24 &&
        !this.state.backgroundImgPath.includes("good-evening")
      ) {
        this._loadImage("good-evening");
      } */
    // }
  }

  render() {
    const styles = {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url(${this.state.backgroundImgPath})`
    };

    return (
      <div className='app' style={styles}>
        {!this.state.isUserWelcomed ? (
          <WelcomeScreen
            setAndUpdateUserInfo={this.setAndUpdateUserInfo}
            toggleUserWelcomed={this.toggleUserWelcomed}
          />
        ) : (
          <HomeScreen
            userInfo={this.state.userInfo}
            ltz={this.state.ltz}
            setAndUpdateUserInfo={this.setAndUpdateUserInfo}
          />
        )}
      </div>
    );
  }
}

export default App;
