import React from "react";
import Styled from "./Modal.module.css";

const Modal = (props) => {
  console.log(props.title);
  
  return (
    <div className={Styled.modalBackground}>
      <div className={Styled.modalContainer}>
        <div className={Styled.mtitle}>
        <p>{props.title}</p>
        </div>
        <div className={Styled.body}>
         <p>{props.msg}</p>
        </div>
        <div className={Styled.footer}>
          <button id={Styled.cancelBtn} onClick={() => props.closeModal('')}>Cancel</button>
          { props.ShowDelete && <button onClick={props.deleteNameHandler} className="modal_buttoDelete">
            Confirm
          </button>
          }
        </div>
      </div>
    </div>
  );
};
export default Modal;
