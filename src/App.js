import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import InitialPage from "./components/ImitialPage";
import UpdateUsers from "./components/UpdateUsers";

import "./app.css";

function App() {

  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<InitialPage />} />
          <Route path="/updateuser" element={<UpdateUsers />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
