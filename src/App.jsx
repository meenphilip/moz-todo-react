import { useState } from "react";
import { nanoid } from "nanoid";
import Form from "./components/Form";
import Todo from "./components/Todo";
import FilterButton from "./components/FilterButton";

function App({ tasks }) {
  const [taskItems, setTaskItems] = useState(tasks);

  // Add task func
  const addTask = (name) => {
    const newTask = {
      id: `todo-${nanoid()}`,
      name,
      completed: false,
    };
    // Update the state with the new task added
    setTaskItems([...taskItems, newTask]);
  };

  // mark task completed
  const toggleTaskCompleted = (id) => {
    const updatedTasks = taskItems.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTaskItems(updatedTasks);
    console.log(taskItems);
  };

  // delete task
  const deleteTask = (id) => {
    // console.log(id);
    const remainingTasks = taskItems.filter((task) => id !== task.id);
    setTaskItems(remainingTasks);
  };

  const taskList = taskItems.map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
    />
  ));

  // counting tasks
  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>Todo List</h1>

      <Form addTask={addTask} />

      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
