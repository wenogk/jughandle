import React, { useState, useEffect, useLayoutEffect } from 'react'
const TextItem = ({ PATH , loadPath}) => {


    let options = [];

    for(let i in PATH.options) {
      let option = PATH.options[i];
      options.push(<div className="row"><a className="btn-small white" style={{color:"black"}} onClick={() => {loadPath(option.pathID)}}>{option.text}</a></div>)
    }


  return(
    <>
    <h1>{PATH.text}</h1><br />
    <div className="container" >{options}</div>
    </>
  );
}
export default TextItem;
