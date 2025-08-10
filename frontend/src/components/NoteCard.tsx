import React from 'react';
import { Note } from '../services/api';
import './NoteCard.css';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (noteId: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onDelete }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="note-card">
      <div className="note-header">
        <h3 className="note-title">{note.title}</h3>
        <div className="note-actions">
          <button 
            onClick={() => onEdit(note)}
            className="btn-edit"
            title="Edit note"
          >
            ✏️
          </button>
          <button 
            onClick={() => onDelete(note._id)}
            className="btn-delete"
            title="Delete note"
          >
            🗑️
          </button>
        </div>
      </div>
      
      <div className="note-meta">
        <span className="note-date">
          {formatDate(note.updatedAt)}
        </span>
        {note.isShared && (
          <span className="shared-badge">Shared</span>
        )}
      </div>
      
      {note.tags.length > 0 && (
        <div className="note-tags">
          {note.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default NoteCard;
