import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [titles, setTitles] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState(null);

  useEffect(() => {
    fetch('https://niki3d.pythonanywhere.com/titles')
      .then((res) => res.json())
      .then((data) => {
        setTitles(data.titles);
      });
  }, []);

  const handleTitleClick = (titleId) => {
    fetch(`https://niki3d.pythonanywhere.com/titles/${titleId}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedTitle(data);
      });
  };

  return (
    <div className="title-container">
      {titles.length === 0 ? (
        <p>Loading...</p>
      ) : (
        titles.map((title) => (
          <div
            key={title.id}
            onClick={() => handleTitleClick(title.id)}
            className="title-box gold-box rounded-box" 
          >
            {title.title}
          </div>
        ))
      )}

      {selectedTitle && (
        <div className="selected-title white-box rounded-box">
          <h2>{selectedTitle.title}</h2>
          <p>{selectedTitle.info}</p>
        </div>
      )}
    </div>
  );
}

export default App;
