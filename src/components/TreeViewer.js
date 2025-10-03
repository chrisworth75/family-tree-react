import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTreeWithMembers } from '../services/api';
import './TreeViewer.css';

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

  if (loading) return <div className="loading">Loading tree...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!treeData) return <div className="error">Tree not found</div>;

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
    <div className="tree-viewer">
      <Link to="/" className="back-link">← Back to Trees</Link>

      <h1>{tree.name || `Tree #${tree.id}`}</h1>
      {tree.description && <p className="tree-description">{tree.description}</p>}

      <div className="tree-content">
        <section className="members-section">
          <h2>Family Members ({members.length})</h2>
          {members.length === 0 ? (
            <p>No members found.</p>
          ) : (
            <div className="members-grid">
              {members.map((member) => (
                <div key={member.id} className="member-card">
                  <h3>
                    {member.firstName || member.first_name} {member.lastName || member.last_name}
                  </h3>
                  {(member.birthDate || member.birth_date) && (
                    <p>Born: {member.birthDate || member.birth_date}</p>
                  )}
                  {(member.gender) && <p>Gender: {member.gender}</p>}
                  {member.isAlive !== undefined && (
                    <p>Status: {member.isAlive ? 'Alive' : 'Deceased'}</p>
                  )}
                  {(member.deathDate || member.death_date) && (
                    <p>Died: {member.deathDate || member.death_date}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {relationships.length > 0 && (
          <section className="relationships-section">
            <h2>Relationships ({relationships.length})</h2>
            <div className="relationships-list">
              {relationships.map((rel, index) => (
                <div key={rel.id || index} className="relationship-card">
                  <p>
                    <strong>Type:</strong> {getRelationshipLabel(rel.relationshipType || rel.relationship_type)}
                  </p>
                  <p>
                    <strong>Between:</strong> Member #{rel.member1_id || rel.member?.id}
                    &amp; Member #{rel.member2_id || rel.relatedMember?.id}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default TreeViewer;
