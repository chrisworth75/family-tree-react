import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();

  return (
    <div className="container">
      <nav className="navbar navbar-dark bg-dark px-0" aria-label="Custom navbar" id="family-tree-nav">
        <div className="container-fluid d-flex justify-content-between align-items-start">

          {/* LEFT SIDE: Brand + vertical nav */}
          <div className="d-flex flex-column align-items-start">
            <Link className="navbar-brand mb-2" to="/">Family Tree</Link>
            <ul className="navbar-nav flex-row">
              <li className="nav-item me-3">
                <Link
                  to="/"
                  className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                >
                  Trees
                </Link>
              </li>
              <li className="nav-item me-3">
                <Link
                  to="/create"
                  className={`nav-link ${location.pathname === '/create' ? 'active' : ''}`}
                >
                  Create Tree
                </Link>
              </li>
              <li className="nav-item me-3">
                <Link
                  to="/search"
                  className={`nav-link ${location.pathname === '/search' ? 'active' : ''}`}
                >
                  Search
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/reports"
                  className={`nav-link ${location.pathname === '/reports' ? 'active' : ''}`}
                >
                  Reports
                </Link>
              </li>
            </ul>
          </div>

          {/* RIGHT SIDE: User menu */}
          <ul className="navbar-nav flex-row">
            <li className="nav-item">
              <Link to="/settings" className="nav-link">Settings</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
