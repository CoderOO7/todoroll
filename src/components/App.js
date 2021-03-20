import React, { Component } from 'react';

import HomeScreen from './HomeScreen';
import WelcomeScreen from './WelcomeScreen';
import { appLocalStorage } from '../utility/storage/localStorage.js';
import { unsplash } from '../utility/unsplash';
import { DEFAULT_BG_IMG_URL } from '../utility/constants';

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
    }, 1000 * 60 * 10);
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

  _setBackgroundImage() {
    (async () => {
      let backgroundImgPath = DEFAULT_BG_IMG_URL;
      try {
        backgroundImgPath = await unsplash.getImage();
      } catch (err) {
        console.error(err);
      }
      this.setState({ backgroundImgPath });
    })();
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
