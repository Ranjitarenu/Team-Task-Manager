import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {

  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
   
    try {

      const res = await axios.get(
        "https://team-task-backend-l8od.onrender.com/api/tasks",
        {
          headers: {
            authorization: token,
          },
        }
      );

      setTasks(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async () => {
    try {

      await axios.post(
        "https://team-task-backend-l8od.onrender.com/api/tasks/create",
        {
          title,
          description,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );

      alert("Task Created");

      fetchTasks();

    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id) => {
  try {

    await axios.put(
      `https://team-task-backend-l8od.onrender.com/api/tasks/${id}`,
      {
        status: "completed",
      },
      {
        headers: {
          authorization: token,
        },
      }
    );

    alert("Task Updated");

    fetchTasks();

  } catch (error) {
    console.log(error);
  }
};

  const deleteTask = async (id) => {
  try {

    await axios.delete(
      `http://localhost:5000/api/tasks/${id}`,
      {
        headers: {
          authorization: token,
        },
      }
    );

    alert("Task Deleted");

    fetchTasks();

  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    fetchTasks();
  }, []);

const handleLogout = () => {
  localStorage.removeItem("token");

  navigate("/");
};

  return (
    <div>

      <h1>Dashboard</h1>

      <button onClick={handleLogout}>
  Logout
</button>

      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br />
      <br />

      <button onClick={createTask}>
        Create Task
      </button>

      <hr />

      {
  tasks.map((task) => (
    <div key={task.id} className="task-card">

      <h3>{task.title}</h3>

      <p>{task.description}</p>

      <p>{task.status}</p>

{
  task.status !== "completed" && (
    <button
      onClick={() => updateStatus(task.id)}
    >
      Mark Completed
    </button>
  )
}

<button
  onClick={() => deleteTask(task.id)}
>
  Delete
</button>

      <hr />

    </div>
  ))
}

    </div>
  );
}

export default Dashboard;