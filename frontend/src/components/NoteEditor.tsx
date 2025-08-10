import React, { useState, useEffect } from 'react';
import { Note, notesAPI } from '../services/api';
import { EncryptionService } from '../utils/encryption';
import ReactMarkdown from 'react-markdown';
import './NoteEditor.css';

interface NoteEditorProps {
  note: Note | null;
  masterPassword: string;
  onSave: (title: string, content: string, tags: string[]) => void;
  onCancel: () => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({
  note,
  masterPassword,
  onSave,
  onCancel
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setTags(note.tags);
      
      // Load and decrypt the note content
      const loadNoteContent = async () => {
        try {
          setLoading(true);
          const fullNote = await notesAPI.getNote(note._id);
          const decryptedContent = EncryptionService.decrypt(
            fullNote.encryptedContent,
            masterPassword
          );
          setContent(decryptedContent);
          setError('');
        } catch (err: any) {
          setError('Failed to decrypt note. Check your master password.');
        } finally {
          setLoading(false);
        }
      };
      
      loadNoteContent();
    } else {
      // New note
      setTitle('');
      setContent('');
      setTags([]);
    }
  }, [note, masterPassword]);

  const handleSave = () => {
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    
    onSave(title.trim(), content, tags);
  };

  const handleAddTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="note-editor-overlay">
      <div className="note-editor">
        <div className="editor-header">
          <input
            type="text"
            placeholder="Note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="title-input"
          />
          <div className="editor-actions">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="btn-preview"
            >
              {showPreview ? 'Edit' : 'Preview'}
            </button>
            <button onClick={handleSave} className="btn-primary">
              Save
            </button>
            <button onClick={onCancel} className="btn-secondary">
              Cancel
            </button>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="tags-section">
          <div className="tags-list">
            {tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="tag-remove"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="tag-input-group">
            <input
              type="text"
              placeholder="Add tag..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="tag-input"
            />
            <button onClick={handleAddTag} className="btn-add-tag">
              Add
            </button>
          </div>
        </div>

        <div className="editor-content">
          {loading ? (
            <div className="loading">Decrypting note...</div>
          ) : showPreview ? (
            <div className="markdown-preview">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          ) : (
            <textarea
              placeholder="Write your secure note here... (Markdown supported)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="content-textarea"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;
