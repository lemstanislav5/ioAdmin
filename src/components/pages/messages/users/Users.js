import ListGroup from 'react-bootstrap/ListGroup';
import style from './Users.module.css';
import {SvgImages} from '../../../images/SvgImages'; 
// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const {messages, usersList, currentUser, setCurrentUser} = props;
  if (usersList === undefined && messages === undefined) return null;
  // .offline{
  //   color:rad;
  // }
  // .online{
  //   color: green;
  // }
  return (
    <ListGroup>
      {
        usersList.map((item, i) => {
          const {id, name, online, socketId, chatId} = item;
          console.log(online)
          const count = messages.reduce((acc, el) => {
            if (el.fromId !== currentUser && el.fromId === chatId && el.read === 0) return acc + 1;
            return acc;
          }, 0);
          let currentName = name === null ? 'гость ' : name + ' ';
          let status = (online === 0 || online === null)? '#607d8b8c' : 'green';
          let active = currentUser !== chatId ? style.inactive : style.active;
          return (
            <ListGroup.Item className={active} key={i +'_'+socketId} onClick={() => setCurrentUser(chatId)}>
            <span className={style.id}>{'id' + id}</span>
            <span className={style.icon}><SvgImages svg='user' fill={status}/></span>
            <span style={{color: status}} className={style.name}>{currentName}</span>
            <span style={{color: status}} className={style.count}>{count}</span>
            </ListGroup.Item>
          )
        })
      }
    </ListGroup>
  )
}
