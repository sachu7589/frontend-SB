import Form from "./Form"
import List from "./List"
import Update from "./Update"
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
function App() {

  return (
    <Router>
        <Form />
        <List />
        <Routes>
          <Route path="/update/:id" element={<Update />} />
        </Routes>
    </Router>
  )
}

export default App
