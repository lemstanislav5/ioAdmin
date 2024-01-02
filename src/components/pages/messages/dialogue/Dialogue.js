import {useEffect, useRef, useState} from 'react';
import {getDateTime} from '../../../../services/getDateTime';
import style from './Dialogue.module.css'
// import style from './Dialogue.module.css'

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ messages, currentUser }) => {
  const messegesBox = useRef(null);
  useEffect(() => {
    setTimeout(() => messegesBox.current?.scrollTo(0, 999000), 1);
  });

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
        messages
          .filter(item => currentUser !== item.fromId || currentUser !== item.toId)
          .map(({fromId, toId, text, time, type, read}, i) => {
            const direction = (currentUser !== fromId)? 'to': 'from', [mDate, mTime] = getDateTime(time);
            return (
              <div className={style.msgbox} key={'msg' + i}>
                <div className={style[direction]} key={i}>
                  {type === 'text' && <div className={style.message}>{text}</div>}
                </div>
              </div>
            ) 
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
