import React, { useState } from "react";
import Styled from "./AddFriend.module.css";
const SearchFriend = (props) => {
  const [name, setName] = useState('');
  const addNameHandler = (e) => {
    const keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
      props.addNameHandler(name);
      setName("")
    };
    /*if (name !== "") {
      setTimeout(() => {
        props.addNameHandler(name);
        //setName('');
      }, 2000);
    }*/
  };
  const setNameHandler = (e) => {
    setName(e.target.value);
  };

  return (
    <div className={Styled.addBar}>
      <input
        className={Styled.add}
        autoComplete="off"
        type="text"
        placeholder="Enter your friend's name"
        name="friend"
        value={name}
        onKeyUp={addNameHandler}
        onChange={setNameHandler}
      />
    </div>
  );
};
export default SearchFriend;
