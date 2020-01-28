import React, { useState, useEffect, useRef } from 'react'
import M from "materialize-css";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import ListEditableItem from './ListEditableItem'
function randomID () {
  //check if duplicate id
  function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
  }
  return Math.random().toString(36).substr(2, randomIntFromInterval(9,20));
}
const PathItemInput = ({ title, onChanged, pathID, textVal }) => {
  const [options, setOptions] = useState([])

  function addScript(src){
    var tag = document.createElement('script');
    tag.async = true;
    tag.src = src;
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(tag);
  }

  const scriptUrl = process.env.PUBLIC_URL + "js/storyBuilder.js"

  useEffect(() => {

    M.Tooltip.init(".tooltipped");
    addScript(scriptUrl);
    const options = {
      onOpenStart: () => {
        console.log("Open Start");
      },
      onOpenEnd: () => {
        console.log("Open End");
      },
      onCloseStart: () => {
        console.log("Close Start");
      },
      onCloseEnd: () => {
        console.log("Close End");
      },
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: "4%",
      endingTop: "10%"
    };
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, options);
  });

  function handleAddOptionStep1() {
    let newID = randomID();
    let newOption = {
      parentID : pathID,
      pathID : newID,
      text : ""
    }
    let newOptionsArr = [...options, newOption];
    setOptions(newOptionsArr);
  //  onChanged({type: "add-option", pathID: pathID, newOptionID : newID, text: "option " + newID});
  }

  function handleAddOptionStep2(parentID, pathID, text) {
    onChanged({type: "add-option", pathID: parentID, newOptionID : pathID, text: text});
  }

  function deleteOptionHandler(e,index) {
    let newArr = [...options]
    newArr.splice(index, 1)
    setOptions(newArr);
  }

  function editOptionHandler(pathID, newTitle) {
    onChanged({type: "change-option-text", pathID: pathID, text: newTitle});
  }

  function copyPathIDSuccess() {
    const options = {
      html: "ID copied to clipboard!",
      inDuration: 300,
      outDuration: 375,
      displyLength: 4000,
      classes: "rounded",
      completeCallback: () => {
        console.log("dismissed");
      }
    };
    M.toast(options);
  }

  return (
    <React.Fragment>
    <div
        id="modal1"
        className="modal"
      >
        <div className="modal-content">
          <h4>Modal Header</h4>
          <p>A bunch of text</p>
        </div>
        <div class="modal-footer">
          <a className="modal-close waves-effect waves-red btn-flat">
            Disagree
          </a>
          <a className="modal-close waves-effect waves-green btn-flat">
            Agree
          </a>
        </div>
      </div>
    <div className="row">
     <div className="col s12 m12">
       <div className="card white" style={{height:"auto"}}>
         <div className="card-content">
         <span className="hoverPointer new badge blue" data-badge-caption={"#" + pathID}></span>
         <span className="card-title" >{title} </span>
         <a data-target="modal1">Modal</a>
           <div className="input-field col s12">
             <textarea ref={input => {
               if(pathID=="root") {
               //input && input.focus()
                }
             }
           }
           id="textarea2" className="materialize-textarea" data-length="120" onChange={e=> {onChanged({type: "change-path-text", pathID: pathID, text: e.target.value})}}>{textVal}</textarea>
             <label for="textarea2">{(pathID =="root") ? "Start path text" : ""}</label>
           </div>
           <br/>
         </div>
        <div className="center-align" style={{padding:"10px"}}>
         <ul className="list-inline">
       <li style={{padding:"5px"}}><a onClick={handleAddOptionStep1} className="tooltipped btn-small purple" data-tooltip="Add a option for a story pathway."><i className="material-icons right">queue</i>Add option</a></li>
    <li style={{padding:"5px"}}><a className="tooltipped btn-small black" data-tooltip="Add a video for this story item."><i className="material-icons right">video_call</i>Video</a></li>
    <li style={{padding:"5px"}}><a className="tooltipped btn-small teal darken-4" data-tooltip="Add an image to this story item."><i className="material-icons right">collections</i>Picture</a></li>
    <li style={{padding:"5px"}}>
    <CopyToClipboard text={pathID /* option id val here! */}
              onCopy={() => {copyPathIDSuccess()}}>
              <a className="tooltipped btn-small red darken-3" data-tooltip="Copy the current path id for use as a reference for an option."><i className="material-icons right">content_copy</i>Copy path id</a>
            </CopyToClipboard>

    </li>
       </ul>
      </div>
      { (options.length>0) &&

      <ul className="collection with-header">
        <li className="collection-header"><span className="card-title">Options ({options.length})</span></li>

        {options.map((value) => {
          console.log("TITLE IS " + value.text);
        return (
        ///  <React.Fragment>
        //  <li key={index} className="collection-item"><div>Option {value} <a onClick={e => deleteOptionHandler(e,index)} className="secondary-content"><i className="material-icons red-text">delete_forever</i></a><a className="secondary-content"><i className="material-icons black-text">edit</i></a></div></li>
        <ListEditableItem editModeVal={false} title={value.text} parentID ={value.parentID} pathID={value.pathID} deleteCallback={deleteOptionHandler} editCallback={editOptionHandler} setupCompleteCallback={handleAddOptionStep2} />

      );
      })}



        </ul> }
       </div>
     </div>
    </div>
    </React.Fragment>
  );
}

export default PathItemInput;
