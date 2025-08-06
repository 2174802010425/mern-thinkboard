import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Detail from "./pages/Detail";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/note/:id" element={<Detail />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
