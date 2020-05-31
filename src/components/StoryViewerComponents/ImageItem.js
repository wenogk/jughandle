import React, { useState, useEffect, useLayoutEffect } from 'react'
const ImageItem = ({ PATH, loadPath}) => {

  let options = [];

  for(let i in PATH.options) {
    let option = PATH.options[i];
    options.push(<div className="row"><a className="btn-small white" style={{color:"black"}} onClick={() => {loadPath(option.pathID)}}>{option.text}</a></div>)
  }
  //  options.push(<div className="row"><a className="btn-small white" style={{color:"black"}} onClick={() => {loadPath(previousPathID)}}>Previous Path</a></div>);
  //  options.push(<div className="row"><a className="btn-small white" style={{color:"black"}} onClick={() => {loadPath("root")}}>Start Over</a></div>);


  return(

    <>
    <img className="responsive-img" src={PATH.image} /><br />
    <div className="container" >{options}</div>

    </>
  );
}
export default ImageItem;
