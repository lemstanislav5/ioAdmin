import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ConnectionState } from './ConnectionState';
import { MessageForm } from './MessageForm/MessageForm';
import { Events } from './Events';
import { io } from 'socket.io-client';
import handlers from '../../../handlers';
import Users from '../../users/Users';

//! https://www.oneclickitsolution.com/blog/socket-io-in-reactjs/
export const  Messages = ({token}) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(null);
  const [messages, setMessages] = useState(null);
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log(token);
    const socketInstance = io('http://localhost:4000',{
      query: {token},
    });
    
    setSocket(socketInstance);

    socketInstance.on('connect', (setIsConnected) => handlers.onConnect);
    socketInstance.on('disconnect', (setIsConnected) => handlers.onDisconnect);
    socketInstance.on('newMessage', (setMessages) =>  handlers.onMessage);
    socketInstance.on('getAllUsers', handlers.getAllUsers);

    return () => {
      socketInstance.off('connect', handlers.onConnect);
      socketInstance.off('disconnect', handlers.onDisconnect);
      socketInstance.off('newMessage', handlers.onMessage);
      socketInstance.off('getAllUsers', handlers.getAllUsers);
    };
  }, []);

  useEffect(() => {
    if (socket !== null) {
      socket.emit("getAllUsers", (res) => {
        console.log(res);
      });
    }

  }, [socket])

  const sendText = () => {
    console.log('sendText')
    socket.emit("newMessage", {message}, () => {});
    // socket.emit("newMessage", { id, text, chatId }, (error, notification) => {
    //   if(error) {
    //     console.log(error, notification);
    //     return onMessage([...messeges, { id, chatId, type: 'from', text: 'Извините сервис временно недоступен!', date: dateMessage()}]);
    //   }
    //   onMessage([...messeges, { id, chatId, type: 'to', text: text, date: dateMessage(), serverAccepted: notification.add, botAccepted: notification.send }]);
    // });
  }

  return (
    <Row>
      <Col xs={3}>
        <Users users={users}/>
      </Col>
      
      <Col xs={9}>
        <div>Тестовое сообщение</div>
        <Form>
          <br/>
          <Form.Group className="mb-3" controlId="exampleForm.Messages">
            <Form.Control as="textarea" placeholder="Введите Ваше сообщение" value={message} onChange={(e) => {setMessage(e.target.value)}}/>
          </Form.Group>
          <Button variant="primary" onClick={sendText}>Отправить</Button>{' '}
        </Form>
      </Col>
    </Row>
  );
}