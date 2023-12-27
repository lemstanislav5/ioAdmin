import {useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {io} from 'socket.io-client';
import Dialogue from './dialogue/Dialogue';
import Users from './users/Users';
import {dateMessage} from '../../../services/dataMeseges';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {nanoid} from 'nanoid';
import {usersActionCreator, massagesActionCreator, currentUserCreator, addMessageCreator, addUserOnline, addUserOffline, readMessages} from '../../../redux/actions'

export const Messages = () => {
  const dispatch = useDispatch()
  const {messages} = useSelector(store => store);
  const {usersList, currentUser} = useSelector(store => store.users);
  const [socket, setSocket] = useState(null);
  const [textMessage, setTextMessage] = useState('');
  const [isSend, setIsSend] = useState(false);
  const setCurrentUser = chatId => dispatch(currentUserCreator(chatId));

  useEffect(() => {
    const token = localStorage.getItem("token");
    const socketInstance = io('http://localhost:4000', {
      query: {token},
    });

    setSocket(socketInstance);

    socketInstance.on('connect', () => {});//! ЗАПОЛНИТЬ ФУНКЦИЮ
    socketInstance.on('disconnect', () => {});//! ЗАПОЛНИТЬ ФУНКЦИЮ
    socketInstance.on('newMessage', (message) => {
      //! id: 32, chatId: 'GPZgbscoEc', socketId: 'OjM9YiZBCtApF_bYAAAL', messageId: 'rCsN54k4EO', text: 'qweqwe', time: 1703670181996 type: "from"
      console.log(message)
      dispatch(addMessageCreator(message))
    });
    socketInstance.on('online', (chatId) => {
      dispatch(addUserOnline(chatId));
      console.log('online: ', chatId);
    });
    socketInstance.on('offline', (chatId) => {
      dispatch(addUserOffline(chatId));
      console.log('offline: ', chatId);
    });
    socketInstance.on('upload', ({type, pathFile}) => {
      console.log('upload: ', type, pathFile);
    });

    return () => {
      socketInstance.off('connect', () => {});//! ЗАПОЛНИТЬ ФУНКЦИЮ
      socketInstance.off('disconnect', () => {});//! ЗАПОЛНИТЬ ФУНКЦИЮ
      socketInstance.off('newMessage', message => dispatch(addMessageCreator(message)));
      socketInstance.off('online', (chatId) => {});
      socketInstance.off('offline', (chatId) => {});
      socketInstance.off('upload', () => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (currentUser !== null) {
      socket.emit('read', { currentUser }, () => dispatch(readMessages(currentUser)));
    }
  }, [currentUser, socket, dispatch])

  useEffect(() => {
    if (socket !== null) {
      socket.emit('getUsers', users => dispatch(usersActionCreator(users)));
      socket.emit('getMesseges', messages => dispatch(massagesActionCreator(messages)));
      //!ОСТАНОВИЛСЯ ЗДЕСЬ
    }
  }, [socket, dispatch])

  const sendText = () => {
    setIsSend(true);
    setTextMessage('');
    const messageId = nanoid(10);
    //'Извините сервис временно недоступен!'
    socket.emit('newMessage', {messageId, textMessage, currentUser, type: 'to'}, () => {
      const message = {messageId, chatId: currentUser, type: 'to', text: textMessage, time: dateMessage(), get: true, send: true, read: true};
      setIsSend(false);
      dispatch(addMessageCreator(message));
    });
  }

  return (
    <Row>
      <Col xs={4}>
        <div className='text-center'>Пользователи</div>
        <Users messages={messages} usersList={usersList} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
      </Col>

      <Col xs={8}>
        <div className='text-center'>Диалог</div>
        <Dialogue messages={messages} currentUser={currentUser} />
        <Form>
          <br />
          <Form.Group className="mb-3" controlId="exampleForm.Messages">
            <Form.Control as="textarea" disabled={(currentUser === null)? true: false} placeholder="Введите Ваше сообщение" value={textMessage} onChange={e => {setTextMessage(e.target.value)}}/>
          </Form.Group>
          <Button variant="primary" onClick={sendText} disabled={(currentUser === null || isSend)? true: false}>Отправить</Button>{' '}
        </Form>
      </Col>
    </Row>
  );
}
