import React, { useState, useEffect, useRef } from 'react'
import M from "materialize-css";
import {CopyToClipboard} from 'react-copy-to-clipboard';

const ListEditableItem = ({ title, pathID, editModeVal, deleteOnFirstCancel, deleteCallback, editCallback, setupCompleteCallback, setupLabelText, editLabelText }) => {
const inputBox = useRef("first");
const inputBox2 = useRef("second");
const [optionTitle, setOptionTitle] = useState(title); //useless, can be removed
const [editVideoURL, seteditVideoURL] = useState(title);
const [editMode, setEditMode] = useState(editModeVal);
const [setupMode, setSetupMode] = useState(true);
const [counter, setCounter] = useState(0)
useEffect(() => {
  if(counter === 0) {
  if(setupMode) {
    inputBox.current.focus();
  } else if(editMode) {
    inputBox2.current.focus();
  }
  setCounter(1);
}
}, [editMode,setupMode,counter]);

function toggleEditMode() {
  setEditMode(!editMode);
}
if(!editMode && !setupMode) {
return(
  //
  <React.Fragment>
  <li className="collection-item"><div>{title} <a onClick={() => {deleteCallback(pathID)}}  className="secondary-content" ><i  className="material-icons red-text">delete_forever</i></a><a onClick ={toggleEditMode} className="secondary-content"><i className="material-icons black-text">edit</i></a></div></li>
  </React.Fragment>
);
} else if(setupMode) {
  return(
    <React.Fragment>
    <li className="collection-item">

    <form onSubmit={e=> {
      e.preventDefault();
      if((editVideoURL.replace(/\s/g,''))=="") {return}
      setOptionTitle(editVideoURL);
      //editCallback(pathID, editVideoURL)
      setupCompleteCallback(pathID,editVideoURL);
      setSetupMode(false);
    }}>
    <div className="input-field">
        <input id="ListEditableItemInputEdit" ref={inputBox} type="text" value={editVideoURL} onChange={ e => {seteditVideoURL(e.target.value)}} />
         <label for="ListEditableItemInputEdit">{setupLabelText}</label>
         </div>
        </form> </li>
    </React.Fragment>
  );
} else if(editMode) {
  return(
    <React.Fragment>
    <li className="collection-item">

    <form onSubmit={e=> {
      e.preventDefault();
      if((editVideoURL.replace(/\s/g,''))=="") {return}
      setOptionTitle(editVideoURL);
      editCallback(pathID, editVideoURL);
      toggleEditMode();
    }}>
    <div className="input-field">
        <input ref={inputBox2} type="text" value={editVideoURL} onChange={ e => {seteditVideoURL(e.target.value)}} />
        <label for="ListEditableItemInputEdit">{editLabelText}</label>
    </div>
        </form> </li>
    </React.Fragment>
  );
}
}
export default ListEditableItem;
