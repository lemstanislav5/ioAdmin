import { useRef } from 'react';
import style from './Attachment.module.css';
import { SvgImages } from '../../../../images/SvgImages';

export const Attachment = ({color, handlerFileСheck}) => {
  const inputRef = useRef(null)
  const handleFileChange = event => {
    handlerFileСheck(event.target.files[0]);
    inputRef.current.value = null;
  }

  return(
    <>
      <div className={style.attachment} onClick={() => {
          inputRef.current.click()
        }}>
        <SvgImages svg={'attachment'} fill={color} />
      </div>
      <input ref={inputRef} className={style.inputFile} type="file" onChange={event => handleFileChange(event)}/>
    </>
  )
}
