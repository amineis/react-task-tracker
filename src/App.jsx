import { useEffect, useState } from 'react';
import './App.css';
import './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask'
import Footer from './components/Footer';
import About from './components/About';


function App() {

  const [showAdd, setShowAdd] = useState(false)

  const [tasks, setTasks] = useState([])


  useEffect(() => {
    
    const getTasks = async () => {
      const res = await fetchData()
      setTasks(res)
    }

    getTasks()
  }, [])


  const fetchData = async () => {
    const res = await fetch("http://localhost:5000/tasks")
    const data = await res.json()
    return data
  }

  const deleteTask = async (id) => {
    await fetch("http://localhost:5000/tasks/"+id, {
      method: "DELETE"
    })

    setTasks(tasks.filter(
      (task) => task.id !== id
    ))
  }
  const toggleReminder = async (id) => {
    const tasktoToggle = await fetch("http://localhost:5000/tasks/"+id)
    const updTask = {...tasktoToggle, reminder: !tasktoToggle.reminder}

    const res = await fetch("http://localhost:5000/tasks/"+id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(updTask)
    })
    
    const data = await res.json()

    setTasks(tasks.map((task) => (
      task.id === id ? {...task, reminder: data.reminder} : task
    )))
  }
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks, data])
  }

  return (
    <Router>
    <div className="container">
      
      <Routes>
  
        <Route path='/about' Component={About}/>
        <Route path='/' exact render={(props) => {
          <><Header title="Task Tracker" onShow={() => setShowAdd(!showAdd)} showAddTask={showAdd}/>
          {showAdd ? <AddTask onAdd={addTask} /> : <></>}
          {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'No tasks'}
          </>
        }}/>
      </Routes>
      <Footer />
    </div>
    </Router>
  );
}
  
export default App;
