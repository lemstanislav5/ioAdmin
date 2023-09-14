import ListGroup from 'react-bootstrap/ListGroup';
import style from './Users.module.css'

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  console.log(props)
  const { users } = props;
  console.log(props)
  return (
    <ListGroup>
      {
        users.map(item=>{
          let name = item.name === null? 'гость' : item.name;
          let status = (item.online === 0 || item.online === null)? 'offline' : 'online';
          return <ListGroup.Item key={item.socketId}> 
            {'id' + item.id +': ' + name}  <span className={style[status]}>{status}</span>
            </ListGroup.Item>
        })
      }
    </ListGroup>
  )
}