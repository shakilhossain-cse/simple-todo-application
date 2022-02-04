import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState(null);
  useEffect(() => {
    const todo = window.localStorage.getItem("todo");
    setTasks(JSON.parse(todo));
    console.log(todo);
  }, []);

  const taskHandeler = (e) => {
    e.preventDefault();
    if (!title) {
      return;
    }
    const newData = {
      id: new Date().getTime() + Math.random(),
      title: title,
    };
    setTasks([newData, ...tasks]);
    window.localStorage.setItem("todo", JSON.stringify([newData, ...tasks]));
    setTitle("");
  };

  const editHandeler = (id) => {
    const editTask = tasks.find((task) => task.id === id);
    setTitle(editTask.title);
    if (id === editTask.id) {
      setUpdate(true);
      setId(editTask.id);
    } else {
      setUpdate(false);
      setId(null);
    }
  };
  const updateHandeler = (e) => {
    e.preventDefault();
    const updateTask = tasks.map((task) =>
      task.id === id ? { ...task, id: id, title: title } : task
    );
    setTasks(updateTask);
    window.localStorage.setItem("todo", JSON.stringify(updateTask));
    console.log(updateTask);
    setUpdate(false);
    setTitle("");
    // console.log(newData);
  };
  const deleteHandeler = (id) => {
    const deleteTask = tasks.filter((task) => task.id !== id);
    window.localStorage.setItem("todo", JSON.stringify(deleteTask));
    setTasks(deleteTask);
  };
  return (
    <div className="App">
      <form onSubmit={update ? updateHandeler : taskHandeler}>
        <label htmlFor="title">Title</label>
        <br />
        <input
          type="text"
          id="title"
          placeholder="type your title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button type="sumbit">{update ? "update" : "sumbit"}</button>
      </form>
      <div>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.title}{" "}
              <button onClick={() => editHandeler(task.id)}>edit</button>
              <button onClick={() => deleteHandeler(task.id)}>delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
