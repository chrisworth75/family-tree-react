import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTreeWithMembers } from '../services/api';

const TreeViewer = () => {
  const { treeId } = useParams();
  const [treeData, setTreeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTree = async () => {
      try {
        const data = await getTreeWithMembers(treeId);
        setTreeData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch tree data');
        setLoading(false);
      }
    };

    fetchTree();
  }, [treeId]);

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

  if (!treeData) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning" role="alert">
          Tree not found
        </div>
      </div>
    );
  }

  // Handle different API response structures
  const tree = treeData.tree || treeData;
  const members = treeData.members || tree.members || [];
  const relationships = treeData.relationships || [];

  const getRelationshipLabel = (type) => {
    const labels = {
      'SPOUSE': 'Spouse',
      'PARTNER': 'Partner',
      'CHILD': 'Child',
      'PARENT': 'Parent',
      'spouse': 'Spouse',
      'parent-child': 'Parent-Child',
      'sibling': 'Sibling'
    };
    return labels[type] || type;
  };

  return (
    <div className="container mt-4">
      <Link to="/" className="btn btn-outline-primary mb-3">
        ← Back to Trees
      </Link>

      <div className="card mb-4">
        <div className="card-body">
          <h1 className="card-title">{tree.name || `Tree #${tree.id}`}</h1>
          {tree.description && (
            <p className="card-text text-muted">{tree.description}</p>
          )}
        </div>
      </div>

      <div className="mb-5">
        <h2 className="mb-3">Family Members ({members.length})</h2>
        {members.length === 0 ? (
          <div className="alert alert-info" role="alert">
            No members found.
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {members.map((member) => (
              <div key={member.id} className="col">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title text-primary">
                      {member.firstName || member.first_name} {member.lastName || member.last_name}
                    </h5>
                    <ul className="list-unstyled">
                      {(member.birthDate || member.birth_date) && (
                        <li>
                          <strong>Born:</strong> {member.birthDate || member.birth_date}
                        </li>
                      )}
                      {member.gender && (
                        <li>
                          <strong>Gender:</strong> {member.gender}
                        </li>
                      )}
                      {member.isAlive !== undefined && (
                        <li>
                          <strong>Status:</strong> {member.isAlive ? 'Alive' : 'Deceased'}
                        </li>
                      )}
                      {(member.deathDate || member.death_date) && (
                        <li>
                          <strong>Died:</strong> {member.deathDate || member.death_date}
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {relationships.length > 0 && (
        <div className="mb-5">
          <h2 className="mb-3">Relationships ({relationships.length})</h2>
          <div className="row row-cols-1 row-cols-md-2 g-3">
            {relationships.map((rel, index) => (
              <div key={rel.id || index} className="col">
                <div className="card">
                  <div className="card-body">
                    <p className="mb-2">
                      <strong>Type:</strong> {getRelationshipLabel(rel.relationshipType || rel.relationship_type)}
                    </p>
                    <p className="mb-0">
                      <strong>Between:</strong> Member #{rel.member1_id || rel.member?.id}
                      &amp; Member #{rel.member2_id || rel.relatedMember?.id}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TreeViewer;
