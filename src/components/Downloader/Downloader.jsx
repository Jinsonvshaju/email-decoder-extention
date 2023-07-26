import React, { useState } from "react";
import "./downloader.scss";
import DownloadFile from "../DownloadFile/DownloadFile";

const Downloader = (payload) => {
  const [text, setText] = useState("");
  const [content, setContent] = useState(null);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popup, setPopup] = useState("");
  const { type } = payload;

  const handleChange = (event) => {
    let value = event.target.value;
    setText(value);
    let valueInJson = convertToJson(event.target.value);
    let data;
    if (type === "email") {
      data =
        typeof valueInJson != "undefined" &&
        valueInJson != null &&
        typeof valueInJson.data != "undefined" &&
        valueInJson.data != null &&
        typeof valueInJson.data.content != "undefined" &&
        valueInJson.data.content != null &&
        valueInJson.data.content.length !== 0
          ? valueInJson.data.content
          : null;
    } else if (type === "file") {
      data =
        typeof valueInJson != "undefined" &&
        valueInJson != null &&
        valueInJson.length !== 0
          ? valueInJson
          : null;
    }
    setContent(data);
  };

  const beautifyJson = () => {
    try {
      // Beautify the JSON with 2 spaces for indentation
      setMessage("Valid JSON");
      setPopup(null);
      return JSON.stringify(JSON.parse(text), null, 2);
    } catch (error) {
      let errorMessage = error.message;
      setMessage("Invalid Json");
      setPopup(errorMessage);
      return null;
    }
  };

  const convertToJson = (jsonInString) => {
    try {
      // Beautify the JSON with 2 spaces for indentation
      setMessage("Valid JSON");
      setPopup(null);
      return JSON.parse(jsonInString);
    } catch (error) {
      let errorMessage = error.message;
      setMessage("Invalid Json");
      setPopup(errorMessage);
      return null;
    }
  };

  const handleBeautifyClick = () => {
    let jsonData = beautifyJson();
    if (jsonData != null) {
      setText(jsonData);
    }
  };

  // Function to handle mouse enter event
  const handleMouseEnter = () => {
    setShowPopup(true);
  };

  // Function to handle mouse leave event
  const handleMouseLeave = () => {
    setShowPopup(false);
  };

  const handleScroll = (event) => {
    const textarea = event.target;
    const lineNumberDiv = document.getElementById("line-number-div");
    lineNumberDiv.scrollTop = textarea.scrollTop;
  };

  const lineNumbers = text.split("\n").map((line, index) => (
    <div key={index} className="line-number">
      {index + 1}
    </div>
  ));

  return (
    <div className="notepad-container">
      <div className="heading-icon">
        <h2>Notepad</h2>
        <DownloadFile content={content} type={type} />
      </div>
      <div className="editor-container">
        <div className="line-numbers" id="line-number-div">
          {lineNumbers}
        </div>
        <textarea
          value={text}
          onChange={handleChange}
          onScroll={handleScroll}
        />
      </div>
      <div className="button-container">
        <div>
          <button onClick={handleBeautifyClick}>Beautify</button>
        </div>
        <div>
          {/* Add event handlers for mouse enter and mouse leave */}
          <pre onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {message}
          </pre>
          {showPopup && popup && (
            <div className="popup">
              <p className="popup-message">{popup}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Downloader;
