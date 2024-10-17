import "./App.css";
import CreateRecipe from "./pages/CreateRecipe";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ShowRecipeDetails from "./pages/ShowRecipeDetails";
import UpdateRecipe from "./pages/UpdateRecipe";

const App = () => {
  return (
    <>
      <Router>
        <header>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-recipe" element={<CreateRecipe />} />
            <Route path="/show-recipe/:id" element={<ShowRecipeDetails />} />
            <Route path="/update-recipe/:id" element={<UpdateRecipe />} />
          </Routes>
        </header>
      </Router>
    </>
  );
}

export default App;
