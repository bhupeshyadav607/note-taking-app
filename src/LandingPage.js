import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import AddNoteModal from "./AddNoteModal";
import NoteCard from "./NoteCard";
import EditNoteModal from "./EditNoteModal";
import "./LandingPage.css";

function LandingPage({ notes, setNotes, deleteNote }) {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const navigate = useNavigate();

  const toggleAdd = () => {
    setIsAdding(!isAdding);
  };

  const toggleEdit = (id) => {
    setSelectedId(id);
    setIsEditing(!isEditing);
  };

  const toggleView = (id) => {
    const selectedNote = notes.find((note) => note.noteId === id);

    navigate(
      `/${selectedNote.title.replaceAll(" ", "-").toLowerCase()}/${
        selectedNote.noteId
      }`,
      {
        state: { note: selectedNote },
      }
    );
  };

  return (
    <div className="landing-page">
      {isAdding ? (
        <AddNoteModal notes={notes} setNotes={setNotes} toggleAdd={toggleAdd} />
      ) : isEditing ? (
        <EditNoteModal notes={notes} id={selectedId} toggleEdit={toggleEdit} />
      ) : (
        <Paper className="landing-paper">
          <h1>Notes</h1>
          <Divider />
          <Paper className="add-note" elevation={4}>
            <h2>To add a new note: </h2>
            <button onClick={toggleAdd}>Click Here</button>
            <div>
              <p className="blink-text">
                It is a good practice to write a note of your important
                things...
              </p>
            </div>
          </Paper>
          <Paper className="notes" elevation={3}>
            {notes.map((note) => (
              <NoteCard
                key={note.noteId}
                note={note}
                deleteNote={deleteNote}
                toggleEdit={toggleEdit}
                toggleView={toggleView}
              />
            ))}
          </Paper>
        </Paper>
      )}
    </div>
  );
}

export default LandingPage;
