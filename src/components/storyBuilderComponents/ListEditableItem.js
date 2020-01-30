import React, { useState, useEffect, useRef } from 'react'
import M from "materialize-css";
import {CopyToClipboard} from 'react-copy-to-clipboard';

const ListEditableItem = ({ title, parentID, pathID, editModeVal, deleteOnFirstCancel, deleteCallback, editCallback, setupCompleteCallback, setupLabelText, editLabelText }) => {
const inputBox = useRef("first");
const inputBox2 = useRef("second");
const [optionTitle, setOptionTitle] = useState(title); //useless, can be removed
const [editOptionTitle, setEditOptionTitle] = useState(title);
const [editMode, setEditMode] = useState(editModeVal);
const [setupMode, setSetupMode] = useState(true);

useEffect(() => {
  if(setupMode) {
    inputBox.current.focus();
  } else if(editMode) {
    inputBox2.current.focus();
  }
}, [editMode,setupMode]);

function toggleEditMode() {
  setEditMode(!editMode);
}
if(!editMode && !setupMode) {
return(
  //
  <React.Fragment>
  <li className="collection-item"><div>{title} <a onClick={() => {deleteCallback(parentID,pathID)}}  className="secondary-content" ><i  className="material-icons red-text">delete_forever</i></a><a onClick ={toggleEditMode} className="secondary-content"><i className="material-icons black-text">edit</i></a></div></li>
  </React.Fragment>
);
} else if(setupMode) {
  return(
    <React.Fragment>
    <li className="collection-item">

    <form onSubmit={e=> {
      e.preventDefault();
      if((editOptionTitle.replace(/\s/g,''))=="") {return}
      setOptionTitle(editOptionTitle);
      //editCallback(pathID, editOptionTitle)
      setupCompleteCallback(parentID,pathID,editOptionTitle);
      setSetupMode(false);
    }}>
    <div className="input-field">
        <input id="ListEditableItemInputEdit" ref={inputBox} type="text" value={editOptionTitle} onChange={ e => {setEditOptionTitle(e.target.value)}} />
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
      if((editOptionTitle.replace(/\s/g,''))=="") {return}
      setOptionTitle(editOptionTitle);
      editCallback(pathID, editOptionTitle);
      toggleEditMode();
    }}>
    <div className="input-field">
        <input ref={inputBox2} type="text" value={editOptionTitle} onChange={ e => {setEditOptionTitle(e.target.value)}} />
        <label for="ListEditableItemInputEdit">{editLabelText}</label>
    </div>
        </form> </li>
    </React.Fragment>
  );
}
}
export default ListEditableItem;
