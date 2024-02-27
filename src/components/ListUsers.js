import React, { Fragment } from "react";

import "../app.css";

const ListUsers = (props) => {
  const locationHandler = (event) => {
    props.selectLocation(event.target.value);
  };

  const city = ["chennai", "tuticorin", "bangalore", "mumbai", "madurai"];

  return (
    <Fragment>
      <div className="card filter">
        <div className="control">
          <label>Locations</label>
          <select value={props.location} onChange={locationHandler}>
            <option value="all">All</option>
            <option value="chennai">Chennai</option>
            <option value="tuticorin">Tuticorin</option>
            <option value="bangalore">Bangalore</option>
            <option value="mumbai">Mumbai</option>
            <option value="madurai">Madurai</option>
            <option value="others">Others</option>
          </select>
        </div>
      </div>
      <div className="card users">
        <ul>
          {props.lists
            .sort((userA, userB) => (userA.name > userB.name ? 1 : -1))
            .filter((user) =>
              props.location === "all"
                ? props.lists
                : props.location === "others"
                ? !city.includes(user.location.toLowerCase())
                : user.location.toLowerCase() === props.location
            )
            .map((user) => (
              <li key={user.id}>
                <div>{user.name}</div>
                <div>{user.birth}</div>
                <div>{user.contact}</div>
                <div>{user.email}</div>
                <div>{user.location.toLowerCase()}</div>
              </li>
            ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default ListUsers;
