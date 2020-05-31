import React, { useState, useEffect, useRef } from 'react'
import M from "materialize-css";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import ListEditableItem from './ListEditableItem'
import MediaEditableItem from './MediaEditableItem'
import ImageHandler from './ImageHandler'
import {useSelector, useDispatch} from 'react-redux';
function randomID () {
  //check if duplicate id
  function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
  }
  return Math.random().toString(36).substr(2, randomIntFromInterval(9,20));
}
const PathItemInput = ({ title, pathID, textVal, parentTitle, hasVideoDefault, defaultVideoURL, defaultOptions=[]}) => {
  const PATHS = useSelector((state) => {return(state)});
  const [counter, setCounter] = useState(0)
  const [pathItemText, setPathItemText] = useState(textVal)
  const [prevPathItemText, setPrevPathItemText] = useState(textVal)
  const [pathItemVideoURL, setPathItemVideoURL] = useState(defaultVideoURL)
  const [hasVideo, setHasVideo] = useState(hasVideoDefault)
  const textAreaBox = useRef("firstRootBox");
  const dispatch = useDispatch(); //for redux
  function addScript(src){
    var tag = document.createElement('script');
    tag.async = true;
    tag.src = src;
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(tag);
  }
function onChanged(args) {
  dispatch(args);
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
    if(counter === 0) {
      textAreaBox.current.focus();
      setCounter((counter) => counter+1)
    }
  });

  function handleAddVideoStep1() {
    if(hasVideo){ return;}
    setHasVideo(true);
  }
  function handleAddVideoStep2(pathID, mediaURL) {
    //alert("added: " + mediaURL)
    setPathItemVideoURL(mediaURL)
    onChanged({type: "add-video", pathID: pathID, url : mediaURL});
  }

  function editVideoHandler(pathID, mediaURL) {
    //alert("edited: " + mediaURL)
    setPathItemVideoURL(mediaURL)
    onChanged({type: "edit-video", pathID: pathID, url : mediaURL});
  }
  function deleteVideoHandler(pathID) {
  //  alert("delete video in pathID: " + pathID)
    setHasVideo(false);
    onChanged({type: "delete-video", pathID: pathID});
  }

  function handleAddOptionStep1() {
    let newID = randomID();
    onChanged({type: "add-option", pathID: pathID, newOptionID : newID, text: ""});
  }

  function handleAddOptionStep2(parentID, pathID, text) {
    editOptionHandler(pathID, text);
  }

  function deleteOptionHandler(parentID, pathID) {
    onChanged({type: "delete-option", parentID: parentID,  pathID: pathID});
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
  function getParentID(pathID) {
    for (let idVal in PATHS) {
      for(let optionIndex in PATHS[idVal].options) {
        if(PATHS[idVal].options[optionIndex].pathID === pathID) {
          return idVal;
        }
      }
    }
    return "root";
  }
  let optionsFromRedux = PATHS[pathID].options;
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
       <div className={((pathItemText.trim().length>0)||(hasVideo)) ? "card grey lighten-4" : "card grey lighten-4"} style={{height:"auto"}}>
         <div className="card-content">
         <span className="hoverPointer new badge blue" data-badge-caption={"#" + pathID}></span>

         <span className="card-title" > {title} { (pathID!="root") ? <i class="tiny material-icons">adjust</i> : "" } {parentTitle} </span>
         {(hasVideo) ? (
           <ul className="collection with-header ">

              <MediaEditableItem editModeVal={false} pathID={pathID} deleteCallback={deleteVideoHandler} editCallback={editVideoHandler} setupCompleteCallback={handleAddVideoStep2} setupLabelText="Paste the youtube or vimeo video link here and hit enter!" editLabelText="Edit the url and hit enter!" mediaURL={pathItemVideoURL} />


             </ul>
         ) : ""}

           {((PATHS[pathID].image!=null)) &&
             <div class="collection">
            <div class="collection-item"> <a href={PATHS[pathID].image} target="_blank">{PATHS[pathID].image}</a><a onClick={()=>{
              if (window.confirm('Are you sure you wish to remove this image?')){
               onChanged({type: "delete-image", pathID: pathID});
              }
             }
           } class="secondary-content">Remove image</a></div>
             </div>
           }


           <div className="input-field col s12">
             <textarea ref={textAreaBox}
           id="textarea2" className="materialize-textarea" data-length="120" onChange={e=> {
             if(pathItemText!=textVal) {
               setPathItemText(textVal);
               console.log("NOT EQUAL")
             }
                 onChanged({type: "change-path-text", pathID: pathID, text: e.target.value});
                 setPrevPathItemText(pathItemText);
                 setPathItemText(e.target.value);
           }
           }>{pathItemText}</textarea>
             <label for="textarea2">{(pathID =="root") ? "Start path text" : ""}</label>
           </div>
           <br/>
         </div>
        <div className="center-align" style={{padding:"10px"}}>
         <ul className="list-inline">
       <li style={{padding:"5px"}}><a onClick={handleAddOptionStep1} className="tooltipped btn-small purple" data-tooltip="Add a option for a story pathway."><i className="material-icons right">queue</i>Add option</a></li>
    <li style={{padding:"5px"}}><a onClick={handleAddVideoStep1} className="tooltipped btn-small black" data-tooltip="Add a video for this story item."><i className="material-icons right">video_call</i>Video</a></li>
    <li style={{padding:"5px"}}>{ < ImageHandler pathID={pathID} />}</li>
    <li style={{padding:"5px"}}>
    <CopyToClipboard text={pathID /* option id val here! */}
              onCopy={() => {copyPathIDSuccess()}}>
              <a className="tooltipped btn-small red darken-3" data-tooltip="Copy the current path id for use as a reference for an option."><i className="material-icons right">content_copy</i>Copy path id</a>
            </CopyToClipboard>

    </li>
       </ul>
      </div>

      { (optionsFromRedux.length>0) &&

      <ul className="collection with-header">
        <li className="collection-header"><span className="card-title">Options ({optionsFromRedux.length})</span></li>

        {optionsFromRedux.map((value) => {

        return (
        ///  <React.Fragment>
        //  <li key={index} className="collection-item"><div>Option {value} <a onClick={e => deleteOptionHandler(e,index)} className="secondary-content"><i className="material-icons red-text">delete_forever</i></a><a className="secondary-content"><i className="material-icons black-text">edit</i></a></div></li>
        <ListEditableItem editModeVal={false} title={value.text} parentID ={getParentID(value.pathID)} pathID={value.pathID} deleteCallback={deleteOptionHandler} editCallback={editOptionHandler} setupCompleteCallback={handleAddOptionStep2} setupLabelText="Type the option text and hit enter!" editLabelText="Edit the text and hit enter!" />

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
