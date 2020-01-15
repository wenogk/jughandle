import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
function CreateStory() {
  return (
  <React.Fragment>
  <Navbar />
  <h1>Create page</h1>
  <br />
  <div className="row">
      <form className="col s12">
        <div className="row">
          <div className="input-field col s6">
            <input id="input_text" type="text" data-length="10" />
            <label for="input_text">Input text</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <textarea id="textarea2" className="materialize-textarea" data-length="120"></textarea>
            <label for="textarea2">Textarea</label>
          </div>
        </div>

<div className="fixed-action-btn">
  <a className="btn-floating btn-large red">
    <i className="large material-icons">mode_edit</i>
  </a>
  <ul>
    <li><a className="btn-floating red"><i className="material-icons">insert_chart</i></a></li>
    <li><a className="btn-floating yellow darken-1"><i className="material-icons">format_quote</i></a></li>
    <li><a className="btn-floating green"><i className="material-icons">publish</i></a></li>
    <li><a className="btn-floating blue"><i className="material-icons">attach_file</i></a></li>
  </ul>
</div>
      </form>
    </div>
  <Footer />
  </React.Fragment>
  );
}

export default CreateStory;
