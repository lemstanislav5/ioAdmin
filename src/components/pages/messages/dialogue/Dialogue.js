import {dateMessage} from '../../../../utilities/dataMeseges';
import style from './Dialogue.module.css'
// import style from './Dialogue.module.css'

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const { messages } = props;
  console.log(messages)
  return messages.map((item, i)=> {
    const {chatId, messageId, type, text, time, socketId, read} = item;
    let date = new Date(time),
    hours = date.getHours(),
    min = date.getMinutes(),
    month = date.getMonth() + 1,
    year = date.getFullYear();
    return (
      <div chatId={chatId} socketId={socketId} key={messageId} className={style[type]}>
        <div>{text}</div>
        <div>{dateMessage(time)}</div>
        <div>{read}</div>
      </div>
    )
  })
}

// chatId
// : 
// "518gH6rfRX"
// id
// : 
// 13
// messageId
// : 
// "IREpK3PMFK"
// read
// : 
// 0
// socketId
// : 
// "XZ_CIf7BjVhrN_VuAAAB"
// text
// : 
// "1"
// time
// : 
// 1694894246699
// type
// : 
// "from"
