import "./App.css";
import CreateRecipe from "./pages/CreateRecipe";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <Router>
        <header>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-recipe" element={<CreateRecipe />} />
          </Routes>
        </header>
      </Router>
    </>
  );
}

export default App;
