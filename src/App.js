import EmailDownloader from "./components/EmailDownloader/EmailDownloader.jsx";
import CronDescriber from "./components/CronDescriber/CronDescriber.jsx";
import JsonDownloader from "./components/JsonDownloder/JsonDownloader.jsx";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import "./App.scss";
import React, { useState } from "react";

function App() {
  const [showNav, setShowNav] = useState(true);

  const handleLinkClick = () => {
    setShowNav(false);
  };

  return (
    <Router>
      <div>
        {showNav ? (
          <nav>
            <ul>
              <li>
                <Link to="/component1" onClick={handleLinkClick}>
                  email downloader
                </Link>
              </li>
              <li>
                <Link to="/component3" onClick={handleLinkClick}>
                  json downloader
                </Link>
              </li>
              <li>
                <Link to="/component2" onClick={handleLinkClick}>
                cron describer
                </Link>
              </li>
            </ul>
          </nav>
        ) : (
          <Routes>
            <Route path="/component1" element={<EmailDownloader />} />
            <Route path="/component2" element={<CronDescriber />} />
            <Route path="/component3" element={<JsonDownloader />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
