import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllTrees } from '../services/api';

const TreeList = () => {
  const [trees, setTrees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrees = async () => {
      try {
        const data = await getAllTrees();
        setTrees(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch family trees');
        setLoading(false);
      }
    };

    fetchTrees();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Family Trees</h1>
      {trees.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No family trees found.
        </div>
      ) : (
        <div className="list-group">
          {trees.map((tree) => (
            <Link
              key={tree.id}
              to={`/tree/${tree.id}`}
              className="list-group-item list-group-item-action"
            >
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{tree.name || `Tree #${tree.id}`}</h5>
              </div>
              {tree.description && (
                <p className="mb-1 text-muted">{tree.description}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeList;
