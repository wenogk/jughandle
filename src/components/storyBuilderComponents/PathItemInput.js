import React, { useState, useEffect } from 'react'
import M from "materialize-css";

function PathItemInput() {
  let pathID = "#root";
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
    //alert(JSON.stringify(options))
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
         <span className="new badge blue" data-badge-caption="#root"></span>
         <span className="card-title">Story root </span>
           <p>This is the root.</p>
           <div className="input-field col s12">
             <textarea id="textarea2" className="materialize-textarea" data-length="120"></textarea>
             <label for="textarea2">Start Path</label>
           </div>
           <br/>
         </div>
        <div className="center-align" style={{padding:"10px"}}>
         <ul className="list-inline">
       <li style={{padding:"5px"}}><a onClick={handleAddOption} className=" btn-small purple"><i className="material-icons right">queue</i>Add option</a></li>
    <li style={{padding:"5px"}}><a className=" btn-small black"><i className="material-icons right">video_call</i>Video</a></li>
    <li style={{padding:"5px"}}><a className=" btn-small teal darken-4"><i className="material-icons right">collections</i>Picture</a></li>
    <li style={{padding:"5px"}}><a onClick={(e) => {copyPathIDHandler()}} className=" btn-small red darken-3"><i className="material-icons right">content_copy</i>Copy path id</a></li>
       </ul>
      </div>
      { (options.length>0) &&

      <ul className="collection with-header">
        <li className="collection-header"><span className="card-title">Options ({options.length})</span></li>



        {options.map((value, index) => {
        return (
          <React.Fragment>
          <li key={index} className="collection-item"><div>Option {value} <a onClick={e => deleteOptionHandler(e,index)} class="secondary-content"><i class="material-icons">delete_forever</i></a></div></li>

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
