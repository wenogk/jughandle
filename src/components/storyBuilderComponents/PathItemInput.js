import React from 'react'

function PathItemInput() {
  return (
    <div className="row">
     <div className="col s12 m12">
       <div className="card white" style={{height:"auto"}}>
         <div className="card-content">
           <span className="card-title">Story Root</span>
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
       <li><a className="waves-effect waves-light btn-small red"><i className="material-icons right">queue</i>Add question</a></li>
    <li><a className="waves-effect waves-light btn-small green"><i className="material-icons right">video_call</i>Add video</a></li>
    <li><a className="waves-effect waves-light btn-small blue"><i className="material-icons right">collections</i>Add picture</a></li>
       </ul>
      </div>
       </div>
     </div>
    </div>
  );
}

export default PathItemInput;
