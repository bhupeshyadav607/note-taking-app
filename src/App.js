import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Data from "./seedNotes";
import LandingPage from "./LandingPage.js";
import ViewNote from "./ViewNote";
import "./App.css";

function App() {
  const savedNotes = JSON.parse(window.localStorage.getItem("notes"));
  const [notes, setNotes] = useState(savedNotes || Data);

  useEffect(() => {
    syncLocalStorage();
  }, [notes]);

  const deleteNote = (id) => {
    const leftNotes = notes.filter((note) => note.noteId !== id);
    setNotes(leftNotes);
  };

  const syncLocalStorage = () => {
    //save to local Storage
    window.localStorage.setItem("notes", JSON.stringify(notes));
  };

  return (
    <div className="App">
      <Routes>
        <Route exact path="/:title/:id" element={<ViewNote />} />
        <Route
          exact
          path="/"
          element={
            <LandingPage
              notes={notes}
              setNotes={setNotes}
              deleteNote={deleteNote}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
