import React, { Component } from "react";

class WelcomeScreen extends Component {
  constructor() {
    super();

    this.state = {
      userName: "",
      isValidationError: false,
      validationErrorMsg: "",
    };

    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handleNextBtnClick = this.handleNextBtnClick.bind(this);
  }

  handleUserNameChange(event) {
    event.preventDefault();

    const { name, value } = event.target;
    this.setState((prevState) => ({ [name]: value, isValidationError: false }));
  }

  handleNextBtnClick() {
    if (this.state.userName === "") {
      this.setState((prevState) => ({
        isValidationError: true,
        validationErrorMsg: "Your name can't be empty",
      }));
      return;
    } else {
      this.props.toggleUserWelcomed();
      this.props.setAndUpdateUserInfo(this.state.userName);
    }
  }

  render() {
    return (
      <div className="user_info">
        <h1>{"Hi there, What's your name ?"}</h1>
        <label htmlFor="userName" className="user_info__label">
          <input
            type="text"
            name="userName"
            className="user_info__input--user_name"
            onChange={this.handleUserNameChange}
            value={this.state.userName}
          />
          {this.state.isValidationError && (
            <span className="form_input_validation_error">
              {this.state.validationErrorMsg}
            </span>
          )}
        </label>

        <button
          className="user_info_btn user_info_btn--next"
          onClick={this.handleNextBtnClick}
        >
          Next
        </button>
      </div>
    );
  }
}

export default WelcomeScreen;
