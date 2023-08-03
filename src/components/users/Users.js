import ListGroup from 'react-bootstrap/ListGroup';

export default (props) => {
  console.log(props)
  const { users } = props;
  const { chatId, socketId, id, name, online, phone } = users;
  console.log(props, socketId)
  return (
    <ListGroup>
      {
        users.map(item=>{
          return <ListGroup.Item key={item.socketId}> {'id: ' + item.id} <br/> {'name: ' + item.name} <br/> {'online: ' + item.online} </ListGroup.Item>
        })
      }
    </ListGroup>
  )
}