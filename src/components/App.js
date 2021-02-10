import React, { Component } from "react";
import HomeScreen from "./HomeScreen";
import WelcomeScreen from "./WelcomeScreen";
import "../assets/styles/style.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : {},
      isUserWelcomed: localStorage.getItem("isUserWelcomed")
        ? localStorage.getItem("isUserWelcomed")
        : false,
    };

    this.toggleUserWelcomed = this.toggleUserWelcomed.bind(this);
    this.setAndUpdateUserInfo = this.setAndUpdateUserInfo.bind(this);
  }

  toggleUserWelcomed() {
    localStorage.setItem("isUserWelcomed", !this.state.isUserWelcomed);
    this.setState((prevState) => ({
      isUserWelcomed: !prevState.isUserWelcomed,
    }));
  }

  setAndUpdateUserInfo(userName) {
    const userInfo = Object.assign({}, this.state.userInfo, {
      userName: userName,
    });
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
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
            setAndUpdateUserInfo={this.setAndUpdateUserInfo}
          />
        )}
      </div>
    );
  }
}

export default App;
