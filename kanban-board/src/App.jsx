import { useState, useReducer } from "react";
import { ArrowRight, Trash2 } from "lucide-react";

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
    case "DELETE_CARD": {
      const { column, cardId } = action.payload;
      return {
        ...state,
        [column]: state[column].filter((card) => card.id !== cardId),
      };
    }

    case "MOVE_CARD": {
      const { cardId, fromColumn, toColumn } = action.payload;
      const card = state[fromColumn].find((c) => c.id === cardId);

      return {
        ...state,
        [fromColumn]: state[fromColumn].filter((c) => c.id !== cardId),
        [toColumn]: [...state[toColumn], card],
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
    <div className="min-h-screen bg-linear-to-br from-[#020617] via-[#0f172a] to-[#111827] text-white overflow-hidden">
      {/* Background Blur */}
      <div className="absolute top-0 left-0 h-96 w-96 bg-blue-600/20 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 h-96 w-96 bg-purple-600/20 blur-[150px] rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-5xl font-bold tracking-tight">Kanban Board</h1>

            <p className="text-slate-400 mt-2">Manage your work beautifully.</p>
          </div>

          <div className="text-right">
            <h2 className="text-xl font-semibold">Total Tasks</h2>

            <p className="text-4xl font-bold text-blue-400">
              {state.todo.length + state.inProgress.length + state.done.length}
            </p>
          </div>
        </div>

        {/* Toolbar */}

        <div className="mb-10 rounded-3xl border border-slate-700 bg-white/5 backdrop-blur-xl p-6 shadow-2xl">
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              value={cardText}
              onChange={(e) => setCardText(e.target.value)}
              placeholder="Enter a new task..."
              className="flex-1 rounded-2xl bg-slate-900/70 border border-slate-700 px-5 py-4 outline-none focus:border-blue-500 transition"
            />

            <div className="relative">
              <select
                value={selectedColumn}
                onChange={(e) => setSelectedColumn(e.target.value)}
                className="
      appearance-none
      bg-[#111827]
      border border-slate-700
      text-slate-200
      rounded-2xl
      px-5
      py-3
      pr-12
      font-medium
      cursor-pointer
      outline-none
      transition-all
      duration-200
      hover:border-blue-500
      focus:border-blue-500
      focus:ring-4
      focus:ring-blue-500/20
    "
              >
                <option value="todo">📋 To Do</option>
                <option value="inProgress">🚀 In Progress</option>
                <option value="done">✅ Done</option>
              </select>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            <button
              onClick={handleAdd}
              className="rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 px-8 py-4 font-semibold hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30 transition"
            >
              + Add Task
            </button>
          </div>
        </div>

        {/* Board */}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* TODO */}

          <div className="rounded-3xl bg-white/5 border border-slate-700 backdrop-blur-xl p-5">
            <div className="sticky top-0 flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-sky-500"></div>

                <h2 className="font-bold text-xl">To Do</h2>
              </div>

              <span className="h-8 w-8 rounded-full bg-sky-500/20 flex items-center justify-center">
                {state.todo.length}
              </span>
            </div>

            <div className="space-y-5">
              {state.todo.map((card) => (
                <div
                  key={card.id}
                  className="group rounded-2xl bg-[#111827] border border-slate-700 p-5 hover:border-blue-500 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{card.text}</h3>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          dispatch({
                            type: "MOVE_CARD",
                            payload: {
                              cardId: card.id,
                              fromColumn: "todo",
                              toColumn: "inProgress",
                            },
                          })
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500 text-white transition hover:bg-sky-600"
                      >
                        <ArrowRight size={16} strokeWidth={2.5} />
                      </button>

                      <button
                        onClick={() =>
                          dispatch({
                            type: "DELETE_CARD",
                            payload: {
                              column: "todo",
                              cardId: card.id,
                            },
                          })
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500 text-white transition hover:bg-red-600"
                      >
                        <Trash2 size={16} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between items-center">
                    <span className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">
                      Todo
                    </span>

                    <span className="text-xs text-slate-500">#{card.id}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* IN PROGRESS */}

          <div className="rounded-3xl bg-white/5 border border-slate-700 backdrop-blur-xl p-5">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <h2 className="font-bold text-xl">In Progress</h2>
              </div>

              <span className="h-8 w-8 rounded-full bg-yellow-400/20 flex items-center justify-center">
                {state.inProgress.length}
              </span>
            </div>

            <div className="space-y-5">
              {state.inProgress.map((card) => (
                <div
                  key={card.id}
                  className="group rounded-2xl bg-[#111827] border border-slate-700 p-5 hover:border-yellow-400 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex justify-between">
                    <h3>{card.text}</h3>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          dispatch({
                            type: "MOVE_CARD",
                            payload: {
                              cardId: card.id,
                              fromColumn: "inProgress",
                              toColumn: "done",
                            },
                          })
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500 text-white transition hover:bg-sky-600"
                      >
                        <ArrowRight size={16} strokeWidth={2.5} />
                      </button>

                      <button
                        onClick={() =>
                          dispatch({
                            type: "DELETE_CARD",
                            payload: {
                              column: "inProgress",
                              cardId: card.id,
                            },
                          })
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500 text-white transition hover:bg-red-600"
                      >
                        <Trash2 size={16} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <span className="text-xs bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full">
                      Working
                    </span>

                    <span className="text-xs text-slate-500">#{card.id}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DONE */}

          <div className="rounded-3xl bg-white/5 border border-slate-700 backdrop-blur-xl p-5">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <h2 className="font-bold text-xl">Done</h2>
              </div>

              <span className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                {state.done.length}
              </span>
            </div>

            <div className="space-y-5">
              {state.done.map((card) => (
                <div
                  key={card.id}
                  className="group rounded-2xl bg-[#111827] border border-slate-700 p-5 hover:border-emerald-500 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex justify-between">
                    <h3>{card.text}</h3>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          dispatch({
                            type: "MOVE_CARD",
                            payload: {
                              cardId: card.id,
                              fromColumn: "done",
                              toColumn: "todo",
                            },
                          })
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500 text-white transition hover:bg-sky-600"
                      >
                        <ArrowRight size={16} strokeWidth={2.5} />
                      </button>

                      <button
                        onClick={() =>
                          dispatch({
                            type: "DELETE_CARD",
                            payload: {
                              column: "done",
                              cardId: card.id,
                            },
                          })
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500 text-white transition hover:bg-red-600"
                      >
                        <Trash2 size={16} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <span className="text-xs bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full">
                      Completed
                    </span>

                    <span className="text-xs text-slate-500">#{card.id}</span>
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
