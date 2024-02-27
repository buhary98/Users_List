import React, { useState, useRef, Fragment, useEffect } from "react";
import axios from "axios";

import "../app.css";

function FirstApp() {
  const userLists = [
    {
      id: 1,
      name: "Kadher",
      birth: new Date("1997-02-27"),
      contact: 9858367032,
      email: "kadher@test",
      location: "Chennai",
    },
    {
      id: 2,
      name: "Murugan",
      birth: new Date("1977-08-15"),
      contact: 7582321262,
      email: "muru.gan.123@test",
      location: "Bangalore",
    },
    {
      id: 3,
      name: "Raja",
      birth: new Date("1992-11-26"),
      contact: 9874353423,
      email: "raja.002@test",
      location: "Madurai",
    },
    {
      id: 4,
      name: "Peter",
      birth: new Date("1969-10-30"),
      contact: 6351624343,
      email: "jhon.42@test",
      location: "Mumbai",
    },
    {
      id: 5,
      name: "Fathima Beevi",
      birth: new Date("1998-01-11"),
      contact: 9909352731,
      email: "fathi.786@test",
      location: "Chennai",
    },
  ];

  const [usersList, setUsersList] = useState(userLists);

  const nameRef = useRef();
  const contactRef = useRef();
  const emailRef = useRef();

  const [enteredDate, setEnteredDate] = useState("");
  const dateHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const [enteredLocation, setEnteredLocation] = useState("");
  const locationHandler = (event) => {
    setEnteredLocation(event.target.value);
  };

  const [selectLocation, setSelectLocation] = useState("all");
  const selectHandler = (event) => {
    setSelectLocation(event.target.value);
  };

  const [apiList, setApiList] = useState([]);
  useEffect(() => {
    axios
      .get("https://6528d5ec931d71583df27df1.mockapi.io/userList")
      .then((response) => {
        setApiList(response.data);
      });
  }, []);

  const onUpdateUserList = (list) => {
    let { id, name, birth, contact, email, location } = list;
    localStorage.setItem("ID", id);
    localStorage.setItem("Name", name);
    localStorage.setItem("DOB", birth);
    localStorage.setItem("Contact", contact);
    localStorage.setItem("Email Id", email);
    localStorage.setItem("Location", location);
  };

  const getUserList = () => {
    axios
      .get("https://6528d5ec931d71583df27df1.mockapi.io/userList")
      .then((getList) => {
        setApiList(getList.data);
      });
  };

  const onDeleteUserList = (id) => {
    axios
      .delete(`https://6528d5ec931d71583df27df1.mockapi.io/userList/${id}`)
      .then(() => {
        getUserList();
      });
  };

  const addUserHandler = (event) => {
    event.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredContact = contactRef.current.value;
    const enteredEmail = emailRef.current.value;

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

    const newUserList = {
      id: Math.floor(Math.random()),
      name: enteredName,
      birth: new Date(enteredDate),
      contact: enteredContact,
      email: enteredEmail,
      location: enteredLocation,
    };

    setUsersList((prevUsers) => {
      return [...prevUsers, newUserList];
    });

    axios
      .post("https://6528d5ec931d71583df27df1.mockapi.io/userList", {
        name: enteredName,
        birth: new Date(enteredDate),
        contact: enteredContact,
        email: enteredEmail,
        location: enteredLocation,
      })
      .then(() => {
        getUserList();
      });

    nameRef.current.value = "";
    contactRef.current.value = "";
    emailRef.current.value = "";
    setEnteredDate("");
    setEnteredLocation("");
  };

  return (
    <Fragment>
      <div className="card input">
        <form onSubmit={addUserHandler}>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" ref={nameRef} />
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
            ref={contactRef}
          />
          <label htmlFor="email">E-mail Id</label>
          <input id="email" type="email" ref={emailRef} />
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
      <div className="card filter">
        <div className="control">
          <label>Locations</label>
          <select value={selectLocation} onChange={selectHandler}>
            {<option value="all">All</option>}
            <option value="chennai">Chennai</option>
            <option value="tuticorin">Tuticorin</option>
            <option value="bangalore">Bangalore</option>
            <option value="mumbai">Mumbai</option>
            <option value="madurai">Madurai</option>
          </select>
        </div>
      </div>
      <div className="card users">
        <ul>
          {usersList
            .filter((user) =>
              selectLocation === "all"
                ? userLists
                : user.location.toLowerCase() === selectLocation
            )
            .map((user) => (
              <li key={user.id}>
                <div>{user.name}</div>
                <div>{user.birth.toLocaleDateString()}</div>
                <div>{user.contact}</div>
                <div>{user.email}</div>
                <div>{user.location.toLowerCase()}</div>
              </li>
            ))}
        </ul>
      </div>
      <div className="userList">
        <ul>
          <li className="head">
            <div>Name</div>
            <div>DOB</div>
            <div>Contact</div>
            <div>Email</div>
            <div>Location</div>
          </li>
          {apiList.map((list) => (
            <li className="body" key={list.id}>
              <div>{list.name}</div>
              <div>{list.birth}</div>
              <div>{list.contact}</div>
              <div>{list.email}</div>
              <div>{list.location}</div>
              <button onClick={() => onUpdateUserList(list)}>Update</button>
              <button onClick={() => onDeleteUserList(list.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
}

export default FirstApp;
