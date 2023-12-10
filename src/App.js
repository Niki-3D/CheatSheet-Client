import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    fetch("https://niki3d.pythonanywhere.com/topics")
      .then((res) => res.json())
      .then((data) => {
        setTopics(data.topics);
      });
  }, []);

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
  };

  return (
    <div>
      <nav className="navbar">
        {topics.map((topic) => (
          <div
            key={topic.id}
            onClick={() => handleTopicClick(topic)}
            className={`navbar-item ${
              selectedTopic && selectedTopic.id === topic.id ? "active" : ""
            }`}
          >
            {topic.title}
          </div>
        ))}
      </nav>

      <div className="topic-container">
        {selectedTopic ? (
          <div className="selected-topic white-box rounded-box">
            <h2>{selectedTopic.title}</h2>
            <div className="topic-content">
              <div>
                <h3>Information</h3>
                <p>{selectedTopic.info}</p>
              </div>
              <div>
                <h3>Important Information</h3>
                <p>{selectedTopic.important_info}</p>
              </div>
              <div>
                <h3>Important Terms</h3>
                {selectedTopic.important_terms &&
                  selectedTopic.important_terms.map((term) => (
                    <div key={term.id}>
                      <strong>{term.title}:</strong> {term.definition}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="initial-topic white-box rounded-box">
            <h2>Welcome to the Topics Hub</h2>
            <p>Select a topic from the navbar to explore more.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
