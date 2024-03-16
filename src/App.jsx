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

  const taskList = taskItems.map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
    />
  ));

  return (
    <div className="todoapp stack-large">
      <h1>Todo List</h1>

      <Form addTask={addTask} />

      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">3 tasks remaining</h2>
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
