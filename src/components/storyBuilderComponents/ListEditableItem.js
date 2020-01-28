import React, { useState, useEffect, useRef } from 'react'
import M from "materialize-css";
import {CopyToClipboard} from 'react-copy-to-clipboard';

const ListEditableItem = ({ title, pathID, editModeVal, deleteOnFirstCancel, deleteCallback, editCallback }) => {
const [optionTitle, setOptionTitle] = useState(title);
const [editOptionTitle, setEditOptionTitle] = useState(title);
const [editMode, setEditMode] = useState(editModeVal);
const [setupMode, setSetupMode] = useState(true);
function toggleEditMode() {
  setEditMode(!editMode);
}
if(!editMode && !setupMode) {
return(
  <React.Fragment>
  <li className="collection-item"><div>{optionTitle} <a  className="secondary-content"><i className="material-icons red-text">delete_forever</i></a><a onClick ={toggleEditMode} className="secondary-content"><i className="material-icons black-text">edit</i></a></div></li>
  </React.Fragment>
);
} else {
  return(
    <React.Fragment>
    <li className="collection-item">

    <form onSubmit={e=> {
      e.preventDefault();
      //editCallback(pathID, editOptionTitle)
      setSetupMode(false);
    }}>
        <input type="text" value={editOptionTitle} onChange={ e => {setEditOptionTitle(e.target.value)}} />
        </form> </li>
    </React.Fragment>
  );
}
}
export default ListEditableItem;
