import { useState } from "react";
import { nanoid } from "nanoid";
import Form from "./components/Form";
import Todo from "./components/Todo";
import FilterButton from "./components/FilterButton";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App({ tasks }) {
  const [taskItems, setTaskItems] = useState(tasks);
  const [filter, setFilter] = useState("All");

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
  };

  // delete task
  const deleteTask = (id) => {
    // console.log(id);
    const remainingTasks = taskItems.filter((task) => id !== task.id);
    setTaskItems(remainingTasks);
  };

  // Edit Task
  const editTask = (id, newName) => {
    const editedTaskList = taskItems.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // Copy the task and update its name
        return { ...task, name: newName };
      }
      // Return the original task if it's not the edited task
      return task;
    });
    setTaskItems(editedTaskList);
  };

  const taskList = taskItems
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  // Set Filters
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  // counting tasks
  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>Todo List</h1>

      <Form addTask={addTask} />

      <div className="filters btn-group stack-exception">{filterList}</div>
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
