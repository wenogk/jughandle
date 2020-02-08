import React, { useState, useEffect, useRef } from 'react'
import {useSelector} from 'react-redux';

const Preview = () => {
  const PATHS = useSelector((state) => {return(state)});
  return (
    <h1>YO G.</h1>
  );
};

export default Preview;
