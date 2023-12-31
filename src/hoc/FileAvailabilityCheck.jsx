import React, { useState, useEffect } from "react";

const FileAvailabilityCheck = ({ url, SvgImages, Component }) => {
  const [fileAvailability, setFileAvailability] = useState(null);
  useEffect(() => {
    fetch(url)
      .then(res => {
        if (res.status === 200) return setFileAvailability(true);
        return setFileAvailability(false);
      })
      .catch(err => console.log(err));
  }, [url]);
  
  if (fileAvailability === null){
    return <></>
  } else if (fileAvailability === false) {
    return <SvgImages svg='playError'/>
  } else if (fileAvailability === true) {
    return <Component url={url} SvgImages={SvgImages} />
  }
};

export default FileAvailabilityCheck;
