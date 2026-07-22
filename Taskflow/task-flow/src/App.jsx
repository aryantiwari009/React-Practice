import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [name, setName] = useState("");
  const [filter, setFilter] = useState("all");

  const [tasks, setTasks] = useState([
    { id: 1, text: "Buy groceries", done: false },
    { id: 2, text: "Walk the dog", done: true },
    { id: 3, text: "Finish React project", done: false },
  ]);

  function toggleTask(id) {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  }

  function handleAdd() {
    if (name.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: name, done: false }]);
    setName("");
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  const visibleItems = tasks.filter(task => {
    if (filter === "active") return !task.done;
    if (filter === "completed") return task.done;
    return true;
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-indigo-900 flex justify-center items-center p-6">
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-white">📝 Task Flow</h1>
          <p className="text-gray-300 mt-2">Organize your day beautifully</p>
        </div>

        <div className="flex gap-4 mb-8">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            type="text"
            placeholder="Enter your task..."
            className="flex-1 px-5 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-500 outline-none transition-all duration-300 focus:ring-4 focus:ring-blue-400 focus:scale-[1.01]"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAdd}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold shadow-lg"
          >
            + Add
          </motion.button>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          {["all","active","completed"].map(item=>(
            <motion.button
              key={item}
              layout
              whileTap={{scale:0.95}}
              whileHover={{scale:1.05}}
              onClick={()=>setFilter(item)}
              className={`px-5 py-2 rounded-full transition-all duration-300 font-medium ${
                filter===item
                ? "bg-blue-500 text-white shadow-lg scale-105"
                : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
            >
              {item.charAt(0).toUpperCase()+item.slice(1)}
            </motion.button>
          ))}
        </div>

        <div className="text-white mb-4 font-medium">
          Total Tasks: {visibleItems.length}
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {visibleItems.length===0 ? (
              <motion.div
                key="empty"
                initial={{opacity:0,y:20}}
                animate={{opacity:1,y:0}}
                exit={{opacity:0,y:-20}}
                className="text-center text-gray-300 py-10"
              >
                No tasks found.
              </motion.div>
            ) : (
              visibleItems.map(task=>(
                <motion.div
                  layout
                  key={task.id}
                  initial={{opacity:0,y:30,scale:0.95}}
                  animate={{opacity:1,y:0,scale:1}}
                  exit={{opacity:0,y:-30,scale:0.9}}
                  transition={{duration:0.3}}
                  className="bg-white rounded-2xl px-5 py-4 shadow-lg hover:shadow-2xl transition-all duration-300 flex justify-between items-center"
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={()=>toggleTask(task.id)}
                      className="w-5 h-5 accent-green-500 cursor-pointer"
                    />

                    <span
                      className={`text-lg font-medium transition-all duration-300 ${
                        task.done
                          ? "line-through text-gray-400"
                          : "text-gray-800"
                      }`}
                    >
                      {task.text}
                    </span>
                  </div>

                  <motion.button
                    whileHover={{scale:1.05}}
                    whileTap={{scale:0.95}}
                    onClick={()=>deleteTask(task.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-medium shadow"
                  >
                    Delete
                  </motion.button>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;
