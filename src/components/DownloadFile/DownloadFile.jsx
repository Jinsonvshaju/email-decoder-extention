import React from "react";
import Icon from "./download.png";
import "./download-file.scss";
import { saveAs } from "file-saver";

const DownloadFile = (payload) => {
  const { content, type } = payload;

  const beautifyJson = (data) => {
    try {
      // Beautify the JSON with 2 spaces for indentation
      return JSON.stringify(data, null, 2);
    } catch (error) {
      return null;
    }
  };

  const handleImageClick = () => {
    if (type === "email") {
      const blob = new Blob([content], { type: "text/plain" });
      saveAs(blob, "email.html");
    } else if (type === "file") {
      const blob = new Blob([beautifyJson(content)], { type: "text/plain" });
      saveAs(blob, "file.txt");
    }
  };

  return (
    <img
      src={Icon}
      alt="download-icon"
      onClick={handleImageClick}
      className={
        typeof content !== "undefined" && content !== null
          ? ""
          : "grayed-out-icon"
      }
    />
  );
};

export default DownloadFile;
