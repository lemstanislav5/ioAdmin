import style from './Textarea.module.css';

export const Textarea = ({placeholder, backgroundColor}) => {
  return(
    <textarea 
      className={style.textarea}
      placeholder={placeholder}  
      style={{'backgroundColor': backgroundColor}}
    />
  )
}
