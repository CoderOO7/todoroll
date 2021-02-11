import React, { Component } from "react";
import Header from "./Header";
import Overview from "./Overview";
import uniqid from "uniqid";
import { appLocalStorage } from "../utility/storage/localStorage.js";

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: {},
      taskTitle: "",
      tasks: appLocalStorage.getItem("tasks")
        ? appLocalStorage.getItem("tasks")
        : [],
      maxTasks: 5,
      isTasksFull: false,
      isValidationError: false,
      validationErrorMsg: "",
      isUserNameEditFormVisible: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.taskEdit = this.taskEdit.bind(this);
    this.taskDelete = this.taskDelete.bind(this);
    this.taskCompletionToggle = this.taskCompletionToggle.bind(this);

  }

  toggleScreen() {
    this.setState((prevState) => ({
      isScreenActive: !prevState.isScreenActive,
    }));
  }

  taskDelete(taskId) {
    const tasks = this.state.tasks.filter((task) => task.taskId !== taskId);
    appLocalStorage.setItem("tasks", tasks);
    this.setState((prevState) => ({
      tasks,
      isTasksFull: false,
    }));
  }

  taskEdit(taskId, value) {
    const tasks = this.state.tasks.map((task) => {
      if (task.taskId === taskId) {
        task.taskTitle = value;
      }
      return task;
    });

    appLocalStorage.setItem("tasks", tasks);
    this.setState((prevState) => ({ tasks }));
  }

  taskCompletionToggle(taskId) {
    const tasks = this.state.tasks.map((task) => {
      if (task.taskId === taskId) {
        task.isTaskCompleted = !task.isTaskCompleted;
      }
      return task;
    });

    appLocalStorage.setItem("tasks", tasks);
    this.setState((prevState) => ({ tasks }));
  }

  handleChange(event) {
    event.preventDefault();

    const { name, value } = event.target;
    this.setState({
      [name]: value,
      isValidationError: false,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.taskTitle === "") {
      this.setState((prevState) => ({
        isValidationError: true,
        validationErrorMsg: "Input can't be empty",
      }));
      return;
    }

    if (this.state.tasks.length !== this.state.maxTasks) {
      this.setState((prevState) => {
        const task = {
          taskId: uniqid(),
          taskTitle: prevState.taskTitle,
          isTaskCompleted: false,
          taskCreatedAt: new Date().toLocaleDateString(),
        };

        const tasks = this.state.tasks.concat(task);
        appLocalStorage.setItem("tasks", tasks);
        return {
          tasks,
          task: {},
          taskTitle: "",
          isValidationError: false,
        };
      });
    } else {
      this.setState({ isTasksFull: true });
    }
  }


  render() {
    return (
      <main className="content">
        <Header userInfo={this.props.userInfo} setAndUpdateUserInfo={this.props.setAndUpdateUserInfo}/>
        <form className="task_create__form" onSubmit={this.handleSubmit}>
          <label htmlFor="taskTitle" className="task_create_form__label">
            <input
              type="text"
              id="taskTitle"
              name="taskTitle"
              className="task_create__form_input task_create__form_input--task_title"
              onChange={this.handleChange}
              value={this.state.taskTitle}
              placeholder="Enter your today's task"
            />
            {this.state.isValidationError && (
              <span className="form_input_validation_error">
                {this.state.validationErrorMsg}
              </span>
            )}
          </label>
          <button type="submit" hidden>
            Add Task
          </button>
        </form>
        {this.state.isTasksFull && (
          <div className="error_display">
            Focus on these {this.state.maxTasks} tasks first
          </div>
        )}
        <Overview
          tasks={this.state.tasks}
          taskEdit={this.taskEdit}
          taskDelete={this.taskDelete}
          taskCompletionToggle={this.taskCompletionToggle}
        />
      </main>
    );
  }
}

export default HomeScreen;
