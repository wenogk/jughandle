import React, { useState, useEffect, useRef } from 'react'
import M from "materialize-css";
import {CopyToClipboard} from 'react-copy-to-clipboard';

function validURL(str) { /// from https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

const ListEditableItem = ({ mediaURL, pathID, editModeVal, deleteOnFirstCancel, deleteCallback, editCallback, setupCompleteCallback, setupLabelText, editLabelText }) => {
const inputBox = useRef("first");
const inputBox2 = useRef("second");
const [editMediaURL, seteditMediaURL] = useState(mediaURL);
const [editMode, setEditMode] = useState(editModeVal);
const [setupMode, setSetupMode] = useState(true);
const [counter, setCounter] = useState(0)
useEffect(() => {

  if(setupMode) {
    inputBox.current.focus();
  } else if(editMode) {
    inputBox2.current.focus();
  }


}, [editMode,setupMode,counter]);

function toggleEditMode() {
  setEditMode(!editMode);
}
if(!editMode && !setupMode) {
return(
  //
  <React.Fragment>
  <li className="collection-item"><div>{mediaURL} <a onClick={() => {deleteCallback(pathID)}}  className="secondary-content" ><i  className="material-icons red-text">delete_forever</i></a><a onClick ={toggleEditMode} className="secondary-content"><i className="material-icons black-text">edit</i></a></div></li>
  </React.Fragment>
);
} else if(setupMode) {
  return(
    <React.Fragment>
    <li className="collection-item">

    <form onSubmit={e=> {
      e.preventDefault();
      if((editMediaURL.replace(/\s/g,''))=="" || !validURL(editMediaURL)) {return}

      //editCallback(pathID, editMediaURL)
      setupCompleteCallback(pathID,editMediaURL);
      setSetupMode(false);
    }}>
    <div className="input-field">
        <input id="ListEditableItemInputEdit" ref={inputBox} type="text" value={editMediaURL} onChange={ e => {seteditMediaURL(e.target.value)}} />
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
      if((editMediaURL.replace(/\s/g,''))=="" || !validURL(editMediaURL)) {return}
      editCallback(pathID, editMediaURL);
      toggleEditMode();
    }}>
    <div className="input-field">
        <input ref={inputBox2} type="text" value={editMediaURL} onChange={ e => {seteditMediaURL(e.target.value)}} />
        <label for="ListEditableItemInputEdit">{editLabelText}</label>
    </div>
        </form> </li>
    </React.Fragment>
  );
}
}
export default ListEditableItem;
