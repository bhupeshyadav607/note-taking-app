import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import "./AddNoteModal.css";

function AddNoteModal({ notes, setNotes, toggleAdd }) {
  const initialValues = { title: "", desc: "" };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleOverlayClick = () => {
    toggleAdd();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
  };

  const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = "Title is required!";
    } else if (
      notes.find(
        (note) =>
          note.title.replaceAll(" ", "").toLowerCase() ===
          values.title.replaceAll(" ", "").toLowerCase()
      )
    ) {
      errors.title = "Title must be unique!";
    }
    if (!values.desc && values.title.length < 10) {
      errors.desc = "Description is required!";
    } else {
      setNotes([...notes, { ...formValues, noteId: uuidv4() }]);
      toggleAdd();
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
        <h2>Add New Note</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <label htmlFor="title">Title: </label>
            <input
              className="title-input"
              type="text"
              name="title"
              placeholder="Title"
              value={formValues.title}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.title}</p>
          <Divider sx={{ margin: "1rem 0" }} />
          <div className="input-field">
            <label htmlFor="desc">Description: </label>
            <textarea
              className="desc-input"
              type="text"
              name="desc"
              placeholder="Description"
              rows={12}
              value={formValues.desc}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.desc}</p>
          <button className="submit-btn" type="submit">
            Add+
          </button>
        </form>
      </Paper>
    </div>
  );
}

export default AddNoteModal;
