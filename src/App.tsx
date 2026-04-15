import React, { useState, useEffect } from 'react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('leather-todos');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((t: Todo) => ({ ...t, createdAt: new Date(t.createdAt) }));
    }
    return [];
  });
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    localStorage.setItem('leather-todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now().toString(),
          text: inputValue.trim(),
          completed: false,
          createdAt: new Date(),
        },
      ]);
      setInputValue('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const pendingCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen flex flex-col" style={{
      background: 'linear-gradient(180deg, #2c1810 0%, #1a0f0a 100%)',
    }}>
      {/* Wood grain texture overlay */}
      <div className="fixed inset-0 opacity-20 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }} />

      <div className="flex-1 flex flex-col items-center px-4 py-6 md:py-12 relative z-10">
        {/* Leather bound notebook container */}
        <div className="w-full max-w-lg md:max-w-xl">
          {/* Notebook cover */}
          <div
            className="rounded-t-lg md:rounded-t-xl p-1"
            style={{
              background: 'linear-gradient(135deg, #8B4513 0%, #654321 50%, #4a2c17 100%)',
              boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.2), inset 0 -2px 4px rgba(0,0,0,0.3)',
            }}
          >
            {/* Stitching line */}
            <div
              className="rounded-t-lg md:rounded-t-xl p-4 md:p-6"
              style={{
                background: 'linear-gradient(135deg, #6B3E26 0%, #5D3A1F 50%, #4a2c17 100%)',
                border: '3px dashed #8B6914',
                borderBottom: 'none',
                boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.4)',
              }}
            >
              {/* Gold embossed title */}
              <div className="text-center mb-4 md:mb-6">
                <h1
                  className="text-2xl md:text-4xl font-bold tracking-wide"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    background: 'linear-gradient(180deg, #FFD700 0%, #B8860B 40%, #8B6914 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 20px rgba(255,215,0,0.3)',
                    filter: 'drop-shadow(1px 1px 0 #2c1810)',
                  }}
                >
                  MY TASKS
                </h1>
                <div
                  className="mt-2 mx-auto w-32 md:w-48 h-0.5"
                  style={{
                    background: 'linear-gradient(90deg, transparent, #B8860B, transparent)',
                  }}
                />
              </div>

              {/* Stats badges */}
              <div className="flex justify-center gap-3 md:gap-4 mb-4">
                <div
                  className="px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm"
                  style={{
                    background: 'linear-gradient(180deg, #C19A6B 0%, #8B7355 100%)',
                    boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3), inset 0 -1px 2px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.4)',
                    color: '#2c1810',
                    fontFamily: "'Crimson Text', serif",
                    fontWeight: 600,
                  }}
                >
                  {pendingCount} Pending
                </div>
                <div
                  className="px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm"
                  style={{
                    background: 'linear-gradient(180deg, #228B22 0%, #006400 100%)',
                    boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3), inset 0 -1px 2px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.4)',
                    color: '#F5F5DC',
                    fontFamily: "'Crimson Text', serif",
                    fontWeight: 600,
                  }}
                >
                  {completedCount} Done
                </div>
              </div>
            </div>
          </div>

          {/* Paper section */}
          <div
            className="relative"
            style={{
              background: 'linear-gradient(180deg, #FFF8DC 0%, #F5F5DC 50%, #EEE8CD 100%)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5), inset 0 0 30px rgba(139,69,19,0.1)',
            }}
          >
            {/* Ruled lines pattern */}
            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #ADD8E6 31px, #ADD8E6 32px)',
                backgroundPosition: '0 16px',
              }}
            />

            {/* Red margin line */}
            <div
              className="absolute top-0 bottom-0 left-8 md:left-12 w-0.5"
              style={{
                background: 'linear-gradient(180deg, #CD5C5C 0%, #8B0000 100%)',
                opacity: 0.4,
              }}
            />

            {/* Content area */}
            <div className="relative p-4 md:p-6 pl-10 md:pl-16">
              {/* Input area */}
              <div className="mb-4 md:mb-6">
                <div
                  className="flex gap-2 md:gap-3 p-2 md:p-3 rounded-lg"
                  style={{
                    background: 'linear-gradient(180deg, rgba(139,69,19,0.1) 0%, rgba(139,69,19,0.05) 100%)',
                    border: '2px solid #8B4513',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
                  }}
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addTodo()}
                    placeholder="Write a new task..."
                    className="flex-1 bg-transparent outline-none text-sm md:text-base px-2 md:px-3 py-2"
                    style={{
                      fontFamily: "'Crimson Text', serif",
                      fontSize: 'clamp(14px, 4vw, 18px)',
                      color: '#2c1810',
                    }}
                  />
                  <button
                    onClick={addTodo}
                    className="px-4 md:px-6 py-2 rounded-lg transition-all duration-200 active:scale-95 text-sm md:text-base min-w-[60px] md:min-w-[80px]"
                    style={{
                      background: 'linear-gradient(180deg, #B8860B 0%, #8B6914 50%, #6B4F0A 100%)',
                      boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.3), 0 3px 6px rgba(0,0,0,0.4)',
                      color: '#FFF8DC',
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 600,
                      textShadow: '0 1px 2px rgba(0,0,0,0.4)',
                      border: '1px solid #DAA520',
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Todo list */}
              <div className="space-y-2 md:space-y-3 max-h-[50vh] md:max-h-96 overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin' }}>
                {todos.length === 0 ? (
                  <div
                    className="text-center py-8 md:py-12 italic"
                    style={{
                      fontFamily: "'Crimson Text', serif",
                      color: '#8B7355',
                      fontSize: 'clamp(14px, 4vw, 18px)',
                    }}
                  >
                    Your task list is empty.<br />Add something to get started!
                  </div>
                ) : (
                  todos.map((todo) => (
                    <div
                      key={todo.id}
                      className="group flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg transition-all duration-200"
                      style={{
                        background: todo.completed
                          ? 'linear-gradient(180deg, rgba(34,139,34,0.15) 0%, rgba(34,139,34,0.08) 100%)'
                          : 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.3) 100%)',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1), inset 0 1px 2px rgba(255,255,255,0.5)',
                        border: `1px solid ${todo.completed ? '#228B22' : '#D2B48C'}`,
                      }}
                    >
                      {/* Checkbox */}
                      <button
                        onClick={() => toggleTodo(todo.id)}
                        className="w-6 h-6 md:w-7 md:h-7 rounded flex-shrink-0 flex items-center justify-center transition-all duration-200"
                        style={{
                          background: todo.completed
                            ? 'linear-gradient(180deg, #228B22 0%, #006400 100%)'
                            : 'linear-gradient(180deg, #FFF8DC 0%, #EEE8CD 100%)',
                          boxShadow: todo.completed
                            ? 'inset 0 1px 2px rgba(255,255,255,0.3), 0 2px 4px rgba(0,0,0,0.3)'
                            : 'inset 0 2px 4px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.1)',
                          border: todo.completed ? '2px solid #32CD32' : '2px solid #8B4513',
                        }}
                      >
                        {todo.completed && (
                          <svg
                            className="w-3 h-3 md:w-4 md:h-4"
                            fill="none"
                            stroke="#F5F5DC"
                            strokeWidth="3"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>

                      {/* Task text */}
                      <span
                        className="flex-1 transition-all duration-200 text-sm md:text-base break-words"
                        style={{
                          fontFamily: "'Crimson Text', serif",
                          fontSize: 'clamp(14px, 4vw, 18px)',
                          color: todo.completed ? '#6B8E6B' : '#2c1810',
                          textDecoration: todo.completed ? 'line-through' : 'none',
                          opacity: todo.completed ? 0.7 : 1,
                        }}
                      >
                        {todo.text}
                      </span>

                      {/* Delete button */}
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="w-7 h-7 md:w-8 md:h-8 rounded-full flex-shrink-0 flex items-center justify-center opacity-60 md:opacity-0 md:group-hover:opacity-100 transition-all duration-200 active:scale-95"
                        style={{
                          background: 'linear-gradient(180deg, #CD5C5C 0%, #8B0000 100%)',
                          boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3), 0 2px 4px rgba(0,0,0,0.3)',
                          border: '1px solid #B22222',
                        }}
                      >
                        <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="#FFF8DC" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Bottom leather binding */}
          <div
            className="rounded-b-lg md:rounded-b-xl p-3 md:p-4"
            style={{
              background: 'linear-gradient(135deg, #8B4513 0%, #654321 50%, #4a2c17 100%)',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.5)',
            }}
          >
            <div
              className="h-2 md:h-3 rounded"
              style={{
                background: 'linear-gradient(90deg, #5D3A1F 0%, #6B3E26 50%, #5D3A1F 100%)',
                border: '2px dashed #8B6914',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)',
              }}
            />
          </div>

          {/* Decorative brass corners */}
          <div
            className="absolute -top-1 -left-1 w-6 h-6 md:w-8 md:h-8 rounded-tl-lg"
            style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #B8860B 50%, #8B6914 100%)',
              boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.5), 0 2px 4px rgba(0,0,0,0.4)',
            }}
          />
          <div
            className="absolute -top-1 -right-1 w-6 h-6 md:w-8 md:h-8 rounded-tr-lg"
            style={{
              background: 'linear-gradient(225deg, #FFD700 0%, #B8860B 50%, #8B6914 100%)',
              boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.5), 0 2px 4px rgba(0,0,0,0.4)',
            }}
          />
        </div>
      </div>

      {/* Footer */}
      <footer
        className="py-4 md:py-6 text-center relative z-10"
        style={{
          fontFamily: "'Crimson Text', serif",
        }}
      >
        <p
          className="text-xs md:text-sm"
          style={{
            color: '#8B7355',
            opacity: 0.6,
          }}
        >
          Requested by @web-user · Built by @clonkbot
        </p>
      </footer>
    </div>
  );
}

export default App;
