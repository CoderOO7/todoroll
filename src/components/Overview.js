import React, { Component } from "react";
import uniqid from "uniqid";
import Todo from "./Todo";

class Overview extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="task__list">
        {this.props.tasks.map((task, idx) => {
          const { taskId, taskTitle, isTaskCompleted } = task;
          return (
            <div className="task__item" key={uniqid()}>
              <Todo
                taskId={taskId}
                taskTitle={taskTitle}
                taskDelete={this.props.taskDelete}
                taskEdit={this.props.taskEdit}
                taskCompletionToggle={this.props.taskCompletionToggle}
                isTaskCompleted={isTaskCompleted}
              />
            </div>
          );
        })}
      </section>
    );
  }
}

export default Overview;
