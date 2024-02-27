import React, { useState, Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../app.css";

const UpdateUsers = () => {
  const [updateName, setUpdateName] = useState("");
  const onUpdatedName = (event) => {
    setUpdateName(event.target.value);
  };

  const [updateBirth, setUpdateBirth] = useState("");
  const onUpdatedBirth = (event) => {
    setUpdateBirth(event.target.value);
  };

  const [updateContact, setUpdateContact] = useState("");
  const onUpdatedContact = (event) => {
    setUpdateContact(event.target.value);
  };

  const [updateEmail, setUpdateEmail] = useState("");
  const onUpdatedEmail = (event) => {
    setUpdateEmail(event.target.value);
  };

  const [updateLocation, setUpdateLocation] = useState("");
  const onUpdatedLocation = (event) => {
    setUpdateLocation(event.target.value);
  };

  const [id, setID] = useState(null);

  useEffect(() => {
    setID(localStorage.getItem("ID"));
    setUpdateName(localStorage.getItem("Name"));
    setUpdateBirth(localStorage.getItem("DOB"));
    setUpdateContact(localStorage.getItem("Contact"));
    setUpdateEmail(localStorage.getItem("Email Id"));
    setUpdateLocation(localStorage.getItem("Location"));
  }, []);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const updateAPIList = (event) => {
    event.preventDefault();

    setID(localStorage.setItem("ID", id));
    setUpdateName(localStorage.setItem("Name", updateName));
    setUpdateBirth(localStorage.setItem("DOB", updateBirth));
    setUpdateContact(localStorage.setItem("Contact", updateContact));
    setUpdateEmail(localStorage.setItem("Email Id", updateEmail));
    setUpdateLocation(localStorage.setItem("Location", updateLocation));

    axios.put(`https://6528d5ec931d71583df27df1.mockapi.io/userList/${id}`, {
      name: updateName,
      birth: updateBirth,
      contact: updateContact,
      email: updateEmail,
      location: updateLocation,
    });

    setIsLoading(!isLoading);

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  if (!isLoading) {
    return (
      <Fragment>
        <div className="spinner">Loading.....</div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <div className="card input">
        <form onSubmit={updateAPIList}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={updateName}
            onChange={onUpdatedName}
          />
          <label htmlFor="dob">Date of Birth</label>
          <input
            id="dob"
            type="date"
            min="1951-01-01"
            max="2000-12-31"
            value={updateBirth}
            onChange={onUpdatedBirth}
          />
          <label htmlFor="contact">Contact No</label>
          <input
            id="contact"
            type="text"
            pattern="[0-9]*"
            maxLength="10"
            value={updateContact}
            onChange={onUpdatedContact}
          />
          <label htmlFor="email">E-mail Id</label>
          <input
            id="email"
            type="email"
            value={updateEmail}
            onChange={onUpdatedEmail}
          />
          <label htmlFor="location">Location</label>
          <input
            id="location"
            type="text"
            value={updateLocation}
            onChange={onUpdatedLocation}
          />
          <button className="button" type="submit">
            Update
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default UpdateUsers;
