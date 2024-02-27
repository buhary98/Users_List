import React, { useState, Fragment, useEffect } from "react";
import axios from "axios";

import UsersForm from "./UsersForm";
import ListUsers from "./ListUsers";
import ListUsersData from "./ListUsersData";

import "../app.css";

function InitialPage() {
  /* const userLists = [
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
  ]; */

  const [userData, setUserData] = useState([]);
  /* const onUserDataHandler = (newUsers) => {
    setUserData((prevList) => {
      return [...prevList, newUsers];
    });
  }; */

  const [enterCity, setEnterCity] = useState("all");
  const onFilterLocationHandler = (onSelectLocation) => {
    setEnterCity(onSelectLocation);
  };

  const [apiList, setApiList] = useState([]);

  const getUserList = () => {
    axios
      .get("https://6528d5ec931d71583df27df1.mockapi.io/userList")
      .then((getList) => {
        setApiList(getList.data);
        setUserData([]);
        getList.data.forEach((data) => {
          setUserData((prevState) => [...prevState, data]);
        });
      });
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <Fragment>
      <UsersForm
        /* userDetails={onUserDataHandler} */ userApiData={getUserList}
      />
      <ListUsers
        lists={userData}
        location={enterCity}
        selectLocation={onFilterLocationHandler}
      />
      <ListUsersData users={apiList} userDataStore={getUserList} />
    </Fragment>
  );
}

export default InitialPage;
