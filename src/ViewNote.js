import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./ViewNote.css";

function ViewNote() {
  const location = useLocation();
  const navigate = useNavigate();

  const note = location.state.note;

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="view-container">
      <Paper className="view-paper" elevation={4}>
        <Paper className="content-paper" elevation={3}>
          <Typography variant="h2">{note.title}</Typography>
          <Divider />
          <Typography className="note-content" variant="body1">
            {note.desc}
          </Typography>
          <Button
            className="back-btn"
            variant="contained"
            color="secondary"
            onClick={handleBack}
          >
            Back
          </Button>
        </Paper>
      </Paper>
    </div>
  );
}

export default ViewNote;
