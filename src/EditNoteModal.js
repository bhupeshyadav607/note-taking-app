import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

function EditNoteModal({ notes, id, toggleEdit }) {
  const selectedNote = notes.find((note) => note.noteId === id);
  const initialValues = { title: selectedNote.title, desc: selectedNote.desc };
  const [editValues, setEditValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditValues({ ...editValues, [name]: value });
  };

  const handleOverlayClick = () => {
    toggleEdit();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(editValues));
  };

  const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = "Title is required!";
    } else if (
      notes.find(
        (note) =>
          note.title.replace(" ", "").toLowerCase() ===
          values.title.replace(" ", "").toLowerCase()
      )
    ) {
      errors.title = "Title must be unique!";
    }
    if (!values.desc && values.title.length < 10) {
      errors.desc = "Description is required!";
    } else {
      selectedNote.title = values.title;
      selectedNote.desc = values.desc;
      toggleEdit();
    }
    return errors;
  };
  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <Paper
        className="add-paper"
        onClick={(e) => e.stopPropagation()}
        elevation={4}
      >
        <h2>Edit Note</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <label htmlFor="title">Title: </label>
            <input
              className="title-input"
              type="text"
              name="title"
              placeholder="Title"
              value={editValues.title}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.title}</p>
          <Divider sx={{ margin: "1rem 0" }} />
          <div className="input-field">
            <label htmlFor="desc">Description: </label>
            <input
              className="desc-input"
              type="text"
              name="desc"
              placeholder="Description"
              value={editValues.desc}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.desc}</p>
          <button className="submit-btn" type="submit">
            Save
          </button>
        </form>
      </Paper>
    </div>
  );
}

export default EditNoteModal;
