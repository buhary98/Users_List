import React, { useState, Fragment } from "react";
import axios from "axios";

import "../app.css";

const UsersForm = (props) => {
  /* const nameRef = useRef();
  const contactRef = useRef();
  const emailRef = useRef(); */

  const [enteredName, setEnteredName] = useState("");
  const nameHandler = (event) => {
    localStorage.setItem("Name", event.target.value);
    setEnteredName(event.target.value);
  };

  const [enteredDate, setEnteredDate] = useState("");
  const dateHandler = (event) => {
    localStorage.setItem("DOB", event.target.value);
    setEnteredDate(event.target.value);
  };

  const [enteredContact, setEnteredContact] = useState("");
  const contactHandler = (event) => {
    localStorage.setItem("Contact", event.target.value);
    setEnteredContact(event.target.value);
  };

  const [enteredEmail, setEnteredEmail] = useState("");
  const emailHandler = (event) => {
    localStorage.setItem("Email Id", event.target.value);
    setEnteredEmail(event.target.value);
  };

  const [enteredLocation, setEnteredLocation] = useState("");
  const locationHandler = (event) => {
    localStorage.setItem("Location", event.target.value);
    setEnteredLocation(event.target.value);
  };

  const addUserHandler = (event) => {
    event.preventDefault();

    /* const enteredName = nameRef.current.value;
    const enteredContact = contactRef.current.value;
    const enteredEmail = emailRef.current.value; */

    if (
      enteredName.trim().length === 0 ||
      enteredDate === 0 ||
      enteredContact.trim().length === 0 ||
      enteredEmail.trim().length === 0 ||
      enteredLocation.trim().length === 0
    ) {
      return alert("Please enter valid details!");
    }

    if (enteredContact.length < 10) {
      return alert("Please enter valid contact number!");
    }

    /* const newUserList = {
      id: Math.floor(Math.random()),
      name: enteredName,
      birth: new Date(enteredDate),
      contact: enteredContact,
      email: enteredEmail,
      location: enteredLocation,
    }; */

    axios
      .post("https://6528d5ec931d71583df27df1.mockapi.io/userList", {
        name: enteredName,
        birth: enteredDate,
        contact: enteredContact,
        email: enteredEmail,
        location: enteredLocation,
      })
      .then(() => {
        props.userApiData();
      });

    /* nameRef.current.value = "";
    contactRef.current.value = "";
    emailRef.current.value = ""; */

    setEnteredName("");
    setEnteredDate("");
    setEnteredContact("");
    setEnteredEmail("");
    setEnteredLocation("");
    //  props.userDetails(newUserList);
  };

  return (
    <Fragment>
      <div className="card input">
        <form onSubmit={addUserHandler}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={enteredName}
            onChange={nameHandler}
          />
          <label htmlFor="dob">Date of Birth</label>
          <input
            id="dob"
            type="date"
            min="1951-01-01"
            max="2000-12-31"
            value={enteredDate}
            onChange={dateHandler}
          />
          <label htmlFor="contact">Contact No</label>
          <input
            id="contact"
            type="text"
            pattern="[0-9]*"
            maxLength="10"
            value={enteredContact}
            onChange={contactHandler}
          />
          <label htmlFor="email">E-mail Id</label>
          <input
            id="email"
            type="email"
            value={enteredEmail}
            onChange={emailHandler}
          />
          <label htmlFor="location">Location</label>
          <input
            id="location"
            type="text"
            value={enteredLocation}
            onChange={locationHandler}
          />
          <button className="button" type="submit">
            Add User
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default UsersForm;
