import React, { Component } from "react";
import { format, utcToZonedTime } from "date-fns-tz";
import { appLocalStorage } from "../utility/storage/localStorage.js";
import HomeScreen from "./HomeScreen";
import WelcomeScreen from "./WelcomeScreen";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: appLocalStorage.getItem("userInfo")
        ? appLocalStorage.getItem("userInfo")
        : {},
      isUserWelcomed: appLocalStorage.getItem("isUserWelcomed")
        ? appLocalStorage.getItem("isUserWelcomed")
        : false,

      backgroundImgPath: "",
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
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  toggleUserWelcomed() {
    appLocalStorage.setItem("isUserWelcomed", !this.state.isUserWelcomed);
    this.setState((prevState) => ({
      isUserWelcomed: !prevState.isUserWelcomed,
    }));
  }

  setAndUpdateUserInfo(userName, ltz) {
    const userInfo = Object.assign({}, this.state.userInfo, {
      userName: userName,
      ltz: ltz,
    });
    appLocalStorage.setItem("userInfo", userInfo);
    this.setState((prevState) => ({ userInfo }));
  }

  _loadImage(imageName) {
    const backgroundImgPath = `../assets/images/${imageName}.webp`;
    this.setState((prevState) => ({ backgroundImgPath }));
  }

  _setBackgroundImage() {
    if (!this.state.isUserWelcomed) {
      this._loadImage("default-bg");
    } else {
      const hours = format(
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
      }
    }
  }

  render() {
    const styles = {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url(${this.state.backgroundImgPath})`,
    };

    return (
      <div className="app" style={styles}>
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
