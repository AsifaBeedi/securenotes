import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { notesAPI, Note } from '../services/api';
import { EncryptionService } from '../utils/encryption';
import NoteCard from '../components/NoteCard';
import NoteEditor from '../components/NoteEditor';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [masterPassword, setMasterPassword] = useState('');
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(true);

  useEffect(() => {
    if (masterPassword) {
      fetchNotes();
    }
  }, [masterPassword, searchTerm]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await notesAPI.getAllNotes(1, searchTerm);
      setNotes(response.notes);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = (password: string) => {
    setMasterPassword(password);
    setShowPasswordPrompt(false);
  };

  const handleCreateNote = () => {
    setEditingNote(null);
    setShowEditor(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setShowEditor(true);
  };

  const handleSaveNote = async (title: string, content: string, tags: string[]) => {
    try {
      const encryptedContent = EncryptionService.encrypt(content, masterPassword);
      
      if (editingNote) {
        await notesAPI.updateNote(editingNote._id, {
          title,
          encryptedContent,
          tags
        });
      } else {
        await notesAPI.createNote({
          title,
          encryptedContent,
          tags
        });
      }
      
      setShowEditor(false);
      setEditingNote(null);
      fetchNotes();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save note');
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await notesAPI.deleteNote(noteId);
        fetchNotes();
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to delete note');
      }
    }
  };

  if (showPasswordPrompt) {
    return (
      <div className="password-prompt">
        <div className="password-card">
          <h2>Enter Master Password</h2>
          <p>This password will be used to encrypt/decrypt your notes.</p>
          <form onSubmit={(e) => {
            e.preventDefault();
            const password = (e.target as any).password.value;
            if (password) {
              handlePasswordSubmit(password);
            }
          }}>
            <input
              type="password"
              name="password"
              placeholder="Enter your master password"
              required
              autoFocus
            />
            <button type="submit" className="btn-primary">
              Continue
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Secure Notes</h1>
          <div className="header-actions">
            <span>Welcome, {user?.username}</span>
            <button onClick={logout} className="btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button onClick={handleCreateNote} className="btn-primary">
            + New Note
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading">Loading notes...</div>
        ) : (
          <div className="notes-grid">
            {notes.length === 0 ? (
              <div className="no-notes">
                <p>No notes found. Create your first secure note!</p>
              </div>
            ) : (
              notes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onEdit={handleEditNote}
                  onDelete={handleDeleteNote}
                />
              ))
            )}
          </div>
        )}
      </main>

      {showEditor && (
        <NoteEditor
          note={editingNote}
          masterPassword={masterPassword}
          onSave={handleSaveNote}
          onCancel={() => {
            setShowEditor(false);
            setEditingNote(null);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
