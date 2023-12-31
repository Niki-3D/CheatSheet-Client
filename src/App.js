import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [titles, setTitles] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState(null);

  useEffect(() => {
    fetch("https://niki3d.pythonanywhere.com/navbar_titles")
      .then((res) => res.json())
      .then((data) => {
        setTitles(data.navbar_titles);
      });
  }, []);

  const handleTitleClick = (titleId) => {
    fetch(`https://niki3d.pythonanywhere.com/information/${titleId}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedTitle(data);
      });
  };

  return (
    <div>
      <nav className="navbar">
        {titles.map((title) => (
          <div
            key={title.id}
            onClick={() => handleTitleClick(title.id)}
            className={`navbar-item ${
              selectedTitle && selectedTitle.id === title.id ? "active" : ""
            }`}
          >
            {title.title}
          </div>
        ))}
      </nav>

      <div className="title-container">
        {selectedTitle ? (
          <div className="selected-title white-box rounded-box">
            <h2>{selectedTitle.title}</h2>
            <p>{selectedTitle.content}</p>
          </div>
        ) : (
          <div className="initial-title white-box rounded-box">
            <h2>HISTORY</h2>
            <p>Select a topic from the navbar to learn more.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
