import React, { Component } from "react";
import { format, utcToZonedTime } from "date-fns-tz";
import {getLocalTimeZoneByIP} from "../utility/dateTime.js";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ltz: this.props.userInfo.ltz,
      date: utcToZonedTime(new Date(),this.props.userInfo.ltz),
      userName: this.props.userInfo.userName,
      isUserNameEditFormVisible: false,
    };

    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handleUserNameClick = this.handleUserNameClick.bind(this);
    this.handleUserNameSubmit = this.handleUserNameSubmit.bind(this);
  }

  componentDidMount() {

    const self =  this;

    getLocalTimeZoneByIP().then((ltz)=>{
      self.setState((prevState)=>{
        return{
          ltz,
          isLocalTimeZoneSet: true,
          date: utcToZonedTime(new Date(), ltz),
        };
      });
    }).catch(err=>{
      console.error(err);
    });

    //update clock every minute
    this.timerId = setInterval(function updateClock(){
      self.setState((prevState) => ({
        date: utcToZonedTime(new Date(), self.state.ltz),
      }));
    }, 60 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  handleUserNameClick(event) {
    this.setState((prevState) => ({ isUserNameEditFormVisible: true }));
  }

  handleUserNameChange(event) {
    const { name, value } = event.target;
    this.setState((prevState) => ({ [name]: value }));
  }

  handleUserNameSubmit(event) {
    event.preventDefault();
    const userName = this.state.userName;
    if (userName !== "") {
      this.setState((prevState) => ({
        userName,
        isUserNameEditFormVisible: false,
      }));
      this.props.setAndUpdateUserInfo(userName);
    }
  }

  getGreetMsg() {
    const hours = format(this.state.date,"HH");

    let greetMsg = "";
    if (hours < 12) {
      greetMsg = "Good Morning";
    } else if (hours < 17) {
      greetMsg = "Good Afternoon";
    } else {
      greetMsg = "Good Evening";
    }
    return greetMsg;
  }

  render() {
    const userNameFormTemplate = (
      <form
        onSubmit={this.handleUserNameSubmit}
        className="header__username_edit_form"
      >
        <input
          type="text"
          name="userName"
          className="username_edit_form__input username_edit_form__input--username"
          onChange={this.handleUserNameChange}
          value={this.state.userName}
          size={this.state.userName.length ? this.state.userName.length : 1}
        />
      </form>
    );

    return (
      <header className="header">
        <div className="header__current_time">
          {format(this.state.date, "HH:mm")}
        </div>
        <div className="header__user_greet">
          <span>{this.getGreetMsg()},&nbsp;</span>
          <span onClick={this.handleUserNameClick} className="header__username">
            {this.state.isUserNameEditFormVisible
              ? userNameFormTemplate
              : this.state.userName}
          </span>
        </div>
      </header>
    );
  }
}

export default Header;
