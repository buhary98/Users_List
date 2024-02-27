import React, { Fragment } from "react";

import "../app.css";

const FilterUsers = (props) => {

  const locationHandler = (event) => {
    props.selectLocation(event.target.value);
  }

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
          </select>
        </div>
      </div>
    </Fragment>
  );
};

export default FilterUsers;
