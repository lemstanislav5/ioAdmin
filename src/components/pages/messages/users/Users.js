import ListGroup from 'react-bootstrap/ListGroup';
import style from './Users.module.css'
// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const { usersList, currentUser, setCurrentUser } = props;
  
  return (
    <ListGroup>
      {
        usersList.map((item, i) => {
          const { id, name, online, socketId, chatId } = item;
          let currentName = name === null ? 'гость' : name;
          let status = (online === 0 || online === null)? 'offline' : 'online';
          let active = currentUser !== chatId ? style.inactive : style.active;
          return <ListGroup.Item className={active} key={i +'_'+socketId} onClick={() => setCurrentUser(chatId)}> 
            {'id' + id +': ' + currentName}  <span className={style[status]}>{status}</span>
            </ListGroup.Item>
        })
      }
    </ListGroup>
  )
}