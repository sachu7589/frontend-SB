import Form from "./Form"
import List from "./List"
import Update from "./Update"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <Router>
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', color: '#333' }}>Todo App</h1>
        <Routes>
          <Route path="/" element={
            <>
              <Form onTodoAdded={triggerRefresh} />
              <List key={refreshKey} />
            </>
          } />
          <Route path="/update/:id" element={<Update onTodoUpdated={triggerRefresh} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
