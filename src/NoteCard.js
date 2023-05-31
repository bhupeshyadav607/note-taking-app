import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { red } from "@mui/material/colors";
import "./NoteCard.css";

function NoteCard({ note, deleteNote, toggleEdit, toggleView }) {
  const removeNote = () => {
    deleteNote(note.noteId);
  };

  const handleEdit = () => {
    toggleEdit(note.noteId);
  };

  const handleView = () => {
    toggleView(note.noteId);
  };

  return (
    <Card className="note-card" onClick={handleView}>
      <CardContent>
        <Typography className="note-title" variant="h5">
          {note.title}
          <div className="card-action" onClick={(e) => e.stopPropagation()}>
            <EditIcon color="primary" onClick={handleEdit} />
            <DeleteForeverIcon sx={{ color: red[500] }} onClick={removeNote} />
          </div>
        </Typography>
        <Typography className="note-description" variant="body1" gutterBottom>
          {note.desc.slice(0, 100)}
          {note.desc !== "" && note.desc.length >= 100 && (
            <span>
              ...<span className="more">more</span>
            </span>
          )}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default NoteCard;
