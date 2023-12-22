import ListGroup from 'react-bootstrap/ListGroup';
import style from './Users.module.css'
// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  console.log('User')
  const {messages, usersList, currentUser, setCurrentUser} = props;
  if (usersList === undefined && messages === undefined) return null;

  return (
    <ListGroup>
      {
        usersList.map((item, i) => {
          const {id, name, online, socketId, chatId} = item;
          const count = messages.reduce((acc, el) => {
            if (el.chatId === chatId && el.read === 0) return acc + 1;
            return acc;
          }, 0);
          let currentName = name === null ? 'гость' : name;
          let status = (online === 0 || online === null)? 'offline' : 'online';
          let active = currentUser !== chatId ? style.inactive : style.active;
          return (
            <ListGroup.Item className={active} key={i +'_'+socketId} onClick={() => setCurrentUser(chatId)}>
            <span>{'id' + id +': ' + currentName}</span>
            <span className={style[status]}>{status}</span>
            <span className={style.count}>{count}</span>
            </ListGroup.Item>
          )
        })
      }
    </ListGroup>
  )
}
