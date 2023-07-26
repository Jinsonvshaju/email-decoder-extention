import Downloader from "./components/Downloader/Downloader.jsx";
import CronDescriber from "./components/CronDescriber/CronDescriber.jsx";
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
            <Route path="/component1" element={<Downloader type={"email"} />} />
            <Route path="/component2" element={<CronDescriber />} />
            <Route path="/component3" element={<Downloader type={"file"} />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
