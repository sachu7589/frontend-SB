import Form from "./Form"
import List from "./List"
import Update from "./Update"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <h1>Todo App</h1>
        <Routes>
          <Route path="/" element={
            <>
              <Form />
              <List />
            </>
          } />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
