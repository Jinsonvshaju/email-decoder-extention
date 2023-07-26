import React, { useState } from "react";
import "./json-downloader.scss";
import DownloadFile from "../DownloadFile/DownloadFile";

const JsonDownloader = () => {
  const [text, setText] = useState("");
  const [content, setContent] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    let value = event.target.value;
    setText(value);

    let valueInJson = convertToJson(event.target.value);
    let data =
      typeof valueInJson != "undefined" &&
      valueInJson != null &&
      valueInJson.length !== 0
        ? valueInJson
        : null;
    setContent(data);
  };

  const beautifyJson = () => {
    try {
      // Beautify the JSON with 2 spaces for indentation
      setMessage("Valid JSON");
      return JSON.stringify(JSON.parse(text), null, 2);
    } catch (error) {
      let errorMessage = error.message;
      setMessage(errorMessage);
      return null;
    }
  };

  const convertToJson = (jsonInString) => {
    try {
      // Beautify the JSON with 2 spaces for indentation
      setMessage("Valid JSON");
      return JSON.parse(jsonInString);
    } catch (error) {
      let errorMessage = error.message;
      setMessage(errorMessage);
      return null;
    }
  };

  const handleBeautifyClick = () => {
    let jsonData = beautifyJson();
    if (jsonData != null) {
      setText(jsonData);
    }
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
        <DownloadFile content={content} type={"file"} />
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
          <label>{message}</label>
        </div>
      </div>
    </div>
  );
};

export default JsonDownloader;
