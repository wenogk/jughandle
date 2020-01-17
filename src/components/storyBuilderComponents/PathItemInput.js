import React, { useState, useEffect } from 'react'
import M from "materialize-css";
function PathItemInput() {
  let pathID = "#2";
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

  return (
    <div className="row">
     <div className="col s12 m12">
       <div className="card white" style={{height:"auto"}}>
         <div className="card-content">
         <span className="new badge blue" data-badge-caption="#1"></span>
         <span className="card-title">Story root </span>
           <p>I am a very simple card. I am good at containing small bits of information.
           I am convenient because I require little markup to use effectively.</p>
           <div className="input-field col s12">
             <textarea id="textarea2" className="materialize-textarea" data-length="120"></textarea>
             <label for="textarea2">Start Path</label>
           </div>
           <br/>
         </div>
        <div className="center-align" style={{padding:"10px"}}>
         <ul className="list-inline">
       <li><a onClick={handleAddOption} className=" btn-small red"><i className="material-icons right">queue</i>Add option</a></li>
    <li><a className=" btn-small green"><i className="material-icons right">video_call</i>Add video</a></li>
    <li><a className=" btn-small orange"><i className="material-icons right">collections</i>Add picture</a></li>
       </ul>
      </div>
      { (options.length>0) &&

      <ul className="collection with-header">
        <li className="collection-header"><span className="card-title">Options ({options.length})</span></li>



        {options.map((value, index) => {
        return (
          <React.Fragment>
          <li key={index} className="collection-item"><div>Option {value} </div></li>

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
