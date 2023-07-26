import cronTrue from "cronstrue";
import React, { useState } from "react";
import "./cron-describer.scss";

const CronDescriber = () => {
  const [cronString, setCronString] = useState("");
  const [explanation, setExplanation] = useState("");

  const handleInputChange = (event) => {
    let value = event.target.value;
    setCronString(value);
    updateExplain(value);
  };

  const updateExplain = (cron) => {
    try {
      const cronExplanation =
        typeof cron !== "undefined" && cron !== null && cron.length !== 0
          ? cronTrue.toString(cron)
          : "";
      setExplanation(cronExplanation);
    } catch (error) {
      setExplanation(`Invalid cron. Reason: ${error}`);
    }
  };

  return (
    <div className="cron-describer-container">
      <input
        type="text"
        value={cronString}
        onChange={handleInputChange}
        placeholder="Enter a cron string..."
      />
      <div className="cron-explanation">
        {explanation && <p>{explanation}</p>}
      </div>
    </div>
  );
};

export default CronDescriber;
