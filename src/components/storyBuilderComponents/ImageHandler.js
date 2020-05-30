import React, { useState, useEffect, useRef } from 'react'
import M from "materialize-css";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
function validURL(str) { /// from https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

const ImageHandler = ({ pathID }) => {
  const PATHS = useSelector((state) => {return(state)});
  const dispatch = useDispatch();
  function fileHandler(e){
    console.log((e.target.files[0]))
    let formData = new FormData();
    formData.append("key","ba1ef7bbdafd46e85dc0afdeff474c96")
    formData.append("image",e.target.files[0])
    const reader = new FileReader();
     axios({
       url: "https://api.imgbb.com/1/upload",
       method:"POST",
       data: formData
     }
    ).then((response)=>{
      console.log(response.data.data.url)
      dispatch({type:"edit-image",pathID: pathID, url: response.data.data.url})
    });
  }
  return(
    <>
    <input type="file" id="file-upload" style={{display:"none"}} onChange={(e)=>{fileHandler(e)}} />
    <label for="file-upload" class="custom-file-upload">
     <a className="tooltipped btn-small teal darken-4" data-tooltip="Add an image to this story item."><i className="material-icons right">collections</i>Picture</a>
     </label>
     </>
  );
}
export default ImageHandler;
