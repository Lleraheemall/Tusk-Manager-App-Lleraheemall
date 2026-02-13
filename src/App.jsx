import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { CreateTusk } from "./pages/CreateTusk";
import { TuskDetails } from "./pages/TuskDetails";
import { EditTusk } from "./pages/EditTusk";
import { NotFound } from "./pages/NotFound";

function App() {
  const [tusks, setTusks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedTusks = localStorage.getItem("todo_tasks_v1");
    if (savedTusks) {
      setTusks(JSON.parse(savedTusks));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) localStorage.setItem("todo_tasks_v1", JSON.stringify(tusks));
  }, [tusks, isLoaded]);

  const addTusk = (newTusk) => {
    setTusks((prev) => [...prev, newTusk]);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home tusks={tusks} setTusks={setTusks} />} />
        <Route path="/new" element={<CreateTusk onAdd={addTusk} />} />
        <Route
          path="/tusk/:id"
          element={<TuskDetails tusks={tusks} setTusks={setTusks} />}
        />
        <Route
          path="/tusk/:id/edit"
          element={<EditTusk tusks={tusks} setTusks={setTusks} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
