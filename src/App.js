import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import TreeList from './components/TreeList';
import TreeViewer from './components/TreeViewer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <Header />
        </header>

        <main className="main">
          <div className="content">
            <Routes>
              <Route path="/" element={<TreeList />} />
              <Route path="/tree/:treeId" element={<TreeViewer />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
