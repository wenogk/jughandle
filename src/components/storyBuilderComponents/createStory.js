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
      </form>
    </div>
  <Footer />
  </React.Fragment>
  );
}

export default CreateStory;
