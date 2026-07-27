import { useState, useReducer } from "react";

const initialState = {
  todo: [{ id: 1, text: "Learn useReducer" }],
  inProgress: [],
  done: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_CARD": {
      const { column, text } = action.payload;
      const newCard = { id: Date.now(), text: text };
      return {
        ...state,
        [column]: [...state[column], newCard],
      };
    }
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [cardText, setCardText] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("todo");

  function handleAdd() {
    if (cardText.trim() === "") return;

    dispatch({
      type: "ADD_CARD",
      payload: {
        column: selectedColumn,
        text: cardText,
      },
    });

    setCardText("");
  }

return (
  <div className="min-h-screen bg-[#0b1120] text-white">
    {/* Header */}
    <header className="border-b border-slate-800 bg-[#111827]">
      <div className="max-w-7xl mx-auto px-8 py-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Kanban Board
        </h1>
        <p className="text-slate-400 mt-1">
          Organize your work efficiently
        </p>
      </div>
    </header>

    {/* Toolbar */}
    <div className="max-w-7xl mx-auto px-8 py-6">
      <div className="flex flex-wrap gap-4 items-center">

        <input
          type="text"
          value={cardText}
          onChange={(e) => setCardText(e.target.value)}
          placeholder="Write a task..."
          className="flex-1 min-w-[260px] rounded-xl bg-[#1e293b] border border-slate-700 px-4 py-3 outline-none focus:border-blue-500 transition"
        />

        <select
          value={selectedColumn}
          onChange={(e) => setSelectedColumn(e.target.value)}
          className="rounded-xl bg-[#1e293b] border border-slate-700 px-4 py-3 outline-none cursor-pointer"
        >
          <option value="todo">To Do</option>
          <option value="inProgress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <button
          onClick={handleAdd}
          className="rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-3 font-semibold transition-all active:scale-95"
        >
          + Add Card
        </button>
      </div>
    </div>

    {/* Board */}
    <div className="max-w-7xl mx-auto px-8 pb-10">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Todo */}
        <div className="rounded-2xl bg-[#111827] border border-slate-800 p-4">

          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-sky-500"></div>
              <h2 className="font-semibold text-lg">To Do</h2>
            </div>

            <span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">
              {state.todo.length}
            </span>
          </div>

          <div className="space-y-4">

            {state.todo.map((card) => (
              <div
                key={card.id}
                className="rounded-xl bg-[#1e293b] border border-slate-700 p-4 shadow-md hover:border-sky-500 hover:-translate-y-1 transition-all duration-200 cursor-pointer"
              >
                <p className="font-medium">{card.text}</p>

                <div className="mt-4 flex justify-between text-xs text-slate-400">
                  <span>#Task</span>
                  <span>Todo</span>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* In Progress */}
        <div className="rounded-2xl bg-[#111827] border border-slate-800 p-4">

          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-amber-400"></div>
              <h2 className="font-semibold text-lg">In Progress</h2>
            </div>

            <span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">
              {state.inProgress.length}
            </span>
          </div>

          <div className="space-y-4">

            {state.inProgress.map((card) => (
              <div
                key={card.id}
                className="rounded-xl bg-[#1e293b] border border-slate-700 p-4 shadow-md hover:border-amber-400 hover:-translate-y-1 transition-all duration-200 cursor-pointer"
              >
                <p className="font-medium">{card.text}</p>

                <div className="mt-4 flex justify-between text-xs text-slate-400">
                  <span>#Task</span>
                  <span>Working</span>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Done */}
        <div className="rounded-2xl bg-[#111827] border border-slate-800 p-4">

          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
              <h2 className="font-semibold text-lg">Done</h2>
            </div>

            <span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">
              {state.done.length}
            </span>
          </div>

          <div className="space-y-4">

            {state.done.map((card) => (
              <div
                key={card.id}
                className="rounded-xl bg-[#1e293b] border border-slate-700 p-4 shadow-md hover:border-emerald-500 hover:-translate-y-1 transition-all duration-200 cursor-pointer"
              >
                <p className="font-medium">{card.text}</p>

                <div className="mt-4 flex justify-between text-xs text-slate-400">
                  <span>#Task</span>
                  <span>Completed</span>
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  </div>
);

}

export default App;