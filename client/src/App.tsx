import "./App.css";
import "./styles/global.css";

import { Route, Routes } from "react-router-dom";

import Tasks from "./components/Tasks";

function App() {
  return (
    <main className="font-">
      <Routes>
        <Route path="/" element={<Tasks />} />
      </Routes>
    </main>
  );
}

export default App;
