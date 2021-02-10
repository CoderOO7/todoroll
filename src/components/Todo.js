import React, { Component } from "react";

class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskTitle: this.props.taskTitle,
      isTaskCompleted: this.props.isTaskCompleted,
      isTaskEditFormVisible: false,
    };

    this.handleTaskItemClick = this.handleTaskItemClick.bind(this);
    this.handleTaskTitleChange = this.handleTaskTitleChange.bind(this);
    this.handleTaskCompletionChange = this.handleTaskCompletionChange.bind(
      this
    );
    this.handleTaskEditFormSubmit = this.handleTaskEditFormSubmit.bind(this);
    this.handleTaskEditFormCancel = this.handleTaskEditFormCancel.bind(this);
  }

  handleTaskItemClick(event) {
    const _buttonEl = event.target.closest("button");

    if (!_buttonEl) {
      return;
    }

    if (_buttonEl.className.includes("task__item_action_btn--edit")) {
      this.setState((prevState) => ({ isTaskEditFormVisible: true }));
    }

    if (_buttonEl.className.includes("task__item_action_btn--delete")) {
      this.props.taskDelete(this.props.taskId);
    }
  }

  handleTaskCompletionChange(event) {
    this.props.taskCompletionToggle(this.props.taskId);
    this.setState((prevState) => {
      return {
        isTaskCompleted: !prevState.isTaskCompleted,
      };
    });
  }

  handleTaskTitleChange(event) {
    const { name, value } = event.target;
    this.setState((prevState) => {
      return {
        [name]: value,
      };
    });
  }

  handleTaskEditFormSubmit(event) {
    event.preventDefault();

    const _formEl = event.target;
    const _taskTitle = _formEl.taskTitle.value;
    const _taskId = this.props.taskId;
    this.props.taskEdit(_taskId, _taskTitle);
    this.setState((prevState) => {
      return {
        taskTitle: this.props.taskTitle,
        isTaskEditFormVisible: true,
      };
    });
  }

  handleTaskEditFormCancel(event) {
    this.setState((prevState) => {
      return {
        taskTitle: prevState.taskTitle,
        isTaskEditFormVisible: false,
      };
    });
  }

  render() {
    const taskEditTemplate = (
      <form
        onSubmit={this.handleTaskEditFormSubmit}
        className="task__edit_form"
      >
        <input
          type="text"
          name="taskTitle"
          onChange={this.handleTaskTitleChange}
          value={this.state.taskTitle}
          className="task__edit_form_input"
        />
        <div className="task__edit_form_actions">
          <button
            type="submit"
            className="task__edit_form_action_btn task__edit_form_action_btn--save"
          >
            Save
          </button>
          <button
            type="button"
            onClick={this.handleTaskEditFormCancel}
            className="task__edit_form_action_btn task__edit_form_action_btn--cancel"
          >
            Cancel
          </button>
        </div>
      </form>
    );

    const taskViewTemplate = (
      <div className="task__item_view" onClick={this.handleTaskItemClick}>
        <div className="task__item_info">
          <input
            type="checkbox"
            className="task__item_checkbox"
            onChange={this.handleTaskCompletionChange}
            checked={this.state.isTaskCompleted}
          />
          <div className="task__item_content">{this.props.taskTitle}</div>
        </div>
        <div className="task__item_actions">
          <button className="task__item_action_btn task__item_action_btn--edit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
          <button className="task__item_action_btn task__item_action_btn--delete">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    );

    return (
      <div className="task__item_wrap">
        {this.state.isTaskEditFormVisible ? taskEditTemplate : taskViewTemplate}
      </div>
    );
  }
}

export default Todo;
