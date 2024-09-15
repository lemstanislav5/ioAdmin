import {useEffect, useRef} from 'react';
import {getDateTime} from '../../../../services/getDateTime';
import FileAvailabilityCheck from '../../../../hoc/FileAvailabilityCheck';
import AudioPlayer from './audio/AudioPlayer';
import VideoPlayer from './video/VideoPlayer';
import MyImage from './image/MyImage';
import style from './MessegesBox.module.css'
import { SvgImages } from '../../../images/SvgImages';
import newDocument from './newDocument/NewDocument'

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ messages, currentUser }) => {
  const messegesBox = useRef(null);
  useEffect(() => {
    setTimeout(() => messegesBox.current?.scrollTo(0, messegesBox.current.scrollHeight), 300);
  }, [messages]);
  let date = useRef(null);

  const dateChangeCheck = (mDate) => {
    if (date.current === null) {
      date.current = mDate;
      return true;
    } else {
      if (date.current !== mDate) {
        date.current = mDate;
        return true;
      }
    }
  }

  if (messages.length === 0) return <h3>Сообщений пока нет!</h3>
  return (
    <div className={style.massagesBox} ref={messegesBox} >
      {
        messages
          .filter(item => (currentUser === item.fromId || currentUser === item.toId))
          .map(({fromId, toId, text, time, type, read}, i) => {
            const direction = (currentUser !== fromId)? 'to': 'from', [mDate, mTime] = getDateTime(time);
            return (
              <div className={style.msgbox} key={'msg' + i}>
                {dateChangeCheck(mDate) &&  <div className={style.newDate}>{mDate}</div>}
                <div className={style[direction]} key={i}>
                  {type === 'text' && <div className={style.message}>{text}</div>}
                  {type === 'notification' && <div className={style.notificationText}>{text}</div>}
                  {(type === 'jpeg' || type === 'jpg' || type === 'png') && <FileAvailabilityCheck className={style.image} url={text} SvgImages={SvgImages} Component={MyImage}/>}
                  {(type === 'pdf' || type === 'doc' || type === 'docx' || type === 'txt') && <FileAvailabilityCheck url={text} SvgImages={SvgImages} Component={newDocument}/>}
                  {type === 'mp3' && <FileAvailabilityCheck url={text} SvgImages={SvgImages} Component={AudioPlayer}/>}
                  {type === 'mp4' && <FileAvailabilityCheck url={text} SvgImages={SvgImages} Component={VideoPlayer}/>}
                  <div className={type === 'notification'? style.bottomNotification : style.bottomMessage}>
                    {
                      (direction === 'to') &&
                        <>
                          <div className={style.send}>
                            <SvgImages svg='daw' fill={'#0cec0c'}/>
                          </div>
                          <div className={style.read}>
                            <SvgImages svg='line' fill={read ? '#0cec0c' : ' #e82554'}/>
                          </div>
                        </>
                    }
                    <div className={style.time}>{mTime}</div>
                  </div>
                </div>
              </div>
            )
          })
      }
    </div>
  )
}
