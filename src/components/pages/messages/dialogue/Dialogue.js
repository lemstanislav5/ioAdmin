import { useEffect, useRef } from 'react';
import {dateMessage} from '../../../../utilities/dataMeseges';
import style from './Dialogue.module.css'
// import style from './Dialogue.module.css'

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const messegesBox = useRef(null);
  const { messages, currentUser } = props;
  useEffect(() => {
    setTimeout(() => messegesBox.current?.scrollTo(0, 999000), 1)
    console.log(messegesBox)
  })
  if (messages.length === 0) return <h3>Сообщений пока нет!</h3>
  if (currentUser === null) {
    return (
      <div className={style.massagesBox} ref={messegesBox} >
        <div className='alert alert-warning text-center'>
          <h4>Выберете пользователя!</h4>
          <p>Для отображения сообщений.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={style.massagesBox} ref={messegesBox} >
      {
        messages.map((item, i)=> {
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
    </div>
  )
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
