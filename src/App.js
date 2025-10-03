import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TreeList from './components/TreeList';
import TreeViewer from './components/TreeViewer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<TreeList />} />
          <Route path="/tree/:treeId" element={<TreeViewer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
