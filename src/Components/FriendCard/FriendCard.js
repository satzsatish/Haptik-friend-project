import React from "react";
import Styled from "./FriendCard.module.css";
import blankStar from '../../Asset/blankStar.png';
import filledStar from '../../Asset/filledStar.png';
import deleteImage from '../../Asset/delete.png';

const FriendCard = (props) => {
  /*const deleteHandler = (id) => {
    props.removeHandler=id;
    console.log(`sdhsad ${id}`);
  }*/
  let img;
  if(props.showfav == 'Y'){
    img = <img onClick={props.favorite} title="favorite" src={filledStar}/>;
  }else{
    img = <img onClick={props.favorite} title="click to add in favorite list" src={blankStar}/>;
  }
  return (
    <div className={Styled.friendcard}>
      <div>
        <p className={Styled.showNamed}>{props.name}</p>
        <p>is your friend</p>
      </div>
      <div className={Styled.imgshow}>
      {img}
      </div>
      <div className={Styled.imgshow}>
        <img src={deleteImage} title="Delete name from list" onClick={props.removeHandler}/>
      </div>
    </div>
  );
};

export default FriendCard;
