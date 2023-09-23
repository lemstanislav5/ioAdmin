import {dateMessage} from '../../../../utilities/dataMeseges';
import style from './Dialogue.module.css'
// import style from './Dialogue.module.css'

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const { messages, currentUser } = props;
  if (messages.length === 0) return <h3>Сообщений пока нет!</h3>
  if (currentUser === null) return <h3>Выберете пользователя!</h3>
  return messages.map((item, i)=> {
    const {chatId, messageId, type, text, time, socketId, read} = item;
    if (currentUser === chatId) {
      return (
        <div chatid={chatId} socketid={socketId} key={messageId} className={style[type]}>
          <div>{text}</div>
          <div>{dateMessage(time)}</div>
          <div>{read}</div>
        </div>
      )
    }
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
