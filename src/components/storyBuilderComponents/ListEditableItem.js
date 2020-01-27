import React, { useState, useEffect, useRef } from 'react'
import M from "materialize-css";
import {CopyToClipboard} from 'react-copy-to-clipboard';

const ListEditableItem = ({ title, pathID }) => {
const [optionTitle, setOptionTitle] = useState(title);
const [editMode, setEditMode] = useState(false);
function toggleEditMode() {
  setEditMode(!editMode);
}
return(
  <React.Fragment>
  <li key={index} className="collection-item"><div>Option {value} <a onClick={e => deleteOptionHandler(e,index)} className="secondary-content"><i className="material-icons red-text">delete_forever</i></a><a className="secondary-content"><i className="material-icons black-text">edit</i></a></div></li>
  </React.Fragment>
);
}
