import React, { useState, useEffect, useRef } from 'react'
import M from "materialize-css";
import {CopyToClipboard} from 'react-copy-to-clipboard';

const PathItemInput = ({ onChanged, pathID, textVal }) => {
  const [options, setOptions] = useState([])
  const [PATH_ITEM, setPathItem] = useState(
    {
      text : textVal,
      options: [

      ]
    }
  );
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

  function handleAddOption() {
    let val = options.length + 1
    setOptions(oldArray => [...oldArray, val]);
  }

  function handleTextChange() {
    setPathItem({...PATH_ITEM, })
  }

  function deleteOptionHandler(e,index) {
    let newArr = [...options]
    newArr.splice(index, 1)
    setOptions(newArr);
  }

  function copyPathIDHandler() {
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
    <div className="row">
     <div className="col s12 m12">
       <div className="card white" style={{height:"auto"}}>
         <div className="card-content">
         <span className="hoverPointer new badge blue" data-badge-caption={"#" + pathID}></span>
         <span className="card-title">Story root </span>
           <div className="input-field col s12">
             <textarea ref={input => input && input.focus()} id="textarea2" className="materialize-textarea" data-length="120">{textVal}</textarea>
             <label for="textarea2">Start Path</label>
           </div>
           <br/>
         </div>
        <div className="center-align" style={{padding:"10px"}}>
         <ul className="list-inline">
       <li style={{padding:"5px"}}><a onClick={handleAddOption} className="tooltipped btn-small purple" data-tooltip="Add a option for a story pathway."><i className="material-icons right">queue</i>Add option</a></li>
    <li style={{padding:"5px"}}><a className="tooltipped btn-small black" data-tooltip="Add a video for this story item."><i className="material-icons right">video_call</i>Video</a></li>
    <li style={{padding:"5px"}}><a className="tooltipped btn-small teal darken-4" data-tooltip="Add an image to this story item."><i className="material-icons right">collections</i>Picture</a></li>
    <li style={{padding:"5px"}}>
    <CopyToClipboard text={pathID /* option id val here! */}
              onCopy={() => {copyPathIDHandler()}}>
              <a className="tooltipped btn-small red darken-3" data-tooltip="Copy the current path id for use as a reference for an option."><i className="material-icons right">content_copy</i>Copy path id</a>
            </CopyToClipboard>

    </li>
       </ul>
      </div>
      { (options.length>0) &&

      <ul className="collection with-header">
        <li className="collection-header"><span className="card-title">Options ({options.length})</span></li>



        {options.map((value, index) => {
        return (
          <React.Fragment>
          <li key={index} className="collection-item"><div>Option {value} <a onClick={e => deleteOptionHandler(e,index)} className="secondary-content"><i className="material-icons red-text">delete_forever</i></a><a className="secondary-content"><i className="material-icons black-text">edit</i></a></div></li>

        </React.Fragment>
      );
      })}



        </ul> }
       </div>
     </div>
    </div>
  );
}

export default PathItemInput;
