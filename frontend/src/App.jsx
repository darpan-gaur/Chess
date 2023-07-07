import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./Pages/HomePage";

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage/>}/>
      </Routes>
    </Router>
  )
}

export default App
