import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "../app.css";

const ListUsersData = (props) => {
  const onUpdateUserList = (list) => {
    let { id, name, birth, contact, email, location } = list;
    localStorage.setItem("ID", id);
    localStorage.setItem("Name", name);
    localStorage.setItem("DOB", birth);
    localStorage.setItem("Contact", contact);
    localStorage.setItem("Email Id", email);
    localStorage.setItem("Location", location);
  };

  const onDeleteUserList = (id) => {
    axios
      .delete(`https://6528d5ec931d71583df27df1.mockapi.io/userList/${id}`)
      .then(() => {
        props.userDataStore();
      });
  };

  return (
    <Fragment>
      <div className="userList">
        <ul>
          <li className="head">
            <div>Name</div>
            <div>DOB</div>
            <div>Contact</div>
            <div>Email</div>
            <div>Location</div>
          </li>
          {props.users
            .sort((userA, userB) => (userA.name > userB.name ? 1 : -1))
            .map((list) => (
              <li className="body" key={list.id}>
                <div>{list.name}</div>
                <div>{list.birth}</div>
                <div>{list.contact}</div>
                <div>{list.email}</div>
                <div>{list.location}</div>
                <Link to="/updateuser">
                  <button onClick={() => onUpdateUserList(list)}>Update</button>
                </Link>
                <button onClick={() => onDeleteUserList(list.id)}>
                  Delete
                </button>
              </li>
            ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default ListUsersData;
