import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllTrees } from '../services/api';
import './TreeList.css';

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

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="tree-list">
      <h1>Family Trees</h1>
      {trees.length === 0 ? (
        <p>No family trees found.</p>
      ) : (
        <ul>
          {trees.map((tree) => (
            <li key={tree.id}>
              <Link to={`/tree/${tree.id}`}>
                {tree.name || `Tree #${tree.id}`}
              </Link>
              {tree.description && <p className="description">{tree.description}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TreeList;
