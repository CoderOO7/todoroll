import React, { Component } from "react";
import HomeScreen from "./HomeScreen";
import WelcomeScreen from "./WelcomeScreen";
import { appLocalStorage } from "../utility/storage/localStorage.js";
import "../assets/styles/style.css";

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
    };

    this.toggleUserWelcomed = this.toggleUserWelcomed.bind(this);
    this.setAndUpdateUserInfo = this.setAndUpdateUserInfo.bind(this);
  }

  toggleUserWelcomed() {
    appLocalStorage.setItem("isUserWelcomed", !this.state.isUserWelcomed);
    this.setState((prevState) => ({
      isUserWelcomed: !prevState.isUserWelcomed,
    }));
  }

  setAndUpdateUserInfo(userName,ltz) {
    const userInfo = Object.assign({}, this.state.userInfo, {
      userName: userName,
      ltz: ltz,
    });
    console.log(userInfo);
    appLocalStorage.setItem("userInfo", userInfo);
    this.setState((prevState) => ({ userInfo }));
  }

  render() {
    return (
      <div className="app">
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
