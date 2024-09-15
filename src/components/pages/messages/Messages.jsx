import {useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {io} from 'socket.io-client';
import MessegesBox from './messegesBox/MessegesBox';
import Users from './users/Users';
import {useDispatch, useSelector} from 'react-redux';
import {usersActionCreator, massagesActionCreator, currentUserCreator, addMessageCreator, addUserOnline, addUserOffline, readMessages} from '../../../redux/actions';
import style from './Messages.module.css';
import {Attachment} from './toolsForm/attachment/Attachment';
import {Record} from './toolsForm/record/Record';

export const Messages = () => {
  const e = new Date();
  const dispatch = useDispatch();
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
    socketInstance.on('getUsers', (users) => dispatch(usersActionCreator(users)));
    socketInstance.on('newMessage', (message) => dispatch(addMessageCreator(message)));
    socketInstance.on('online', (chatId) => dispatch(addUserOnline(chatId)));
    socketInstance.on('offline', (chatId) => dispatch(addUserOffline(chatId)));

    return () => {
      socketInstance.off('connect', () => {});//! ЗАПОЛНИТЬ ФУНКЦИЮ
      socketInstance.off('disconnect', () => {});//! ЗАПОЛНИТЬ ФУНКЦИЮ
      socketInstance.on('getUsers', (users) => dispatch(usersActionCreator(users)));
      socketInstance.off('newMessage', message => dispatch(addMessageCreator(message)));
      socketInstance.off('online', (chatId) => dispatch(addUserOnline(chatId)));
      socketInstance.off('offline', (chatId) => dispatch(addUserOffline(chatId)));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (currentUser !== null) {
      socket.emit('read', { currentUser }, () => dispatch(readMessages(currentUser)));
    }
  }, [currentUser, socket, dispatch, messages])

  useEffect(() => {
    if (socket !== null) {
      socket.emit('getUsers', users => dispatch(usersActionCreator(users)));
      socket.emit('getMesseges', messages => dispatch(massagesActionCreator(messages)));
    }
  }, [socket, dispatch])

  const sendText = () => {
    setIsSend(true);
    setTextMessage('');
    socket.emit('newMessage', {toId: currentUser, text: textMessage, time:e.getTime(), type: 'text'}, message => {
      if (!message) return dispatch(addMessageCreator({fromId: 'admin', type: 'notification', text: 'Ошибка отправки!', date: e.getTime()}));
      setIsSend(false);
      dispatch(addMessageCreator(message));
    });
  }
  const keyDown = (e) => (e.key === "Enter") && sendText();

  const handlerUpload = (file, type) => {
    socket.emit("upload", file, {toId: currentUser, time: e.getTime(), type}, message => {
      if (!message) return dispatch(addMessageCreator({fromId: 'admin', type: 'notification', text: 'Ошибка отправки!', date: e.getTime()}));
      dispatch(addMessageCreator(message));
    });
  };
  const handlerFileСheck = (file) => {
    let mb = 1048576;
    let type = file.type.replace('image/', '').replace('application/', '').replace('audio/', '').replace('video/', '');
    type = (type === 'mpeg') ? 'mp3' : type;
    if (file.size > mb * 10) {
      dispatch(addMessageCreator({fromId: 'admin', type: 'notification', text: 'Лимит файла 10 МБ превышен', date: e.getTime()}));
    } else if (['jpeg', 'jpg', 'png', 'pdf', 'doc', 'docx', 'txt', 'mp3', 'mp4'].indexOf(type) === -1) {
      dispatch(addMessageCreator({fromId: 'admin', type: 'notification', text: 'Допустимы орматы: jpeg, jpg, png, pdf, doc, docx, txt, mp3, mp4', date: e.getTime()}));
    } else {
      handlerUpload(file, type);
    }
  }
  return (
    <Row>
      <Col xs={3}>
        <div className='text-center'>Пользователи</div>
        <Users messages={messages} usersList={usersList} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
      </Col>

      <Col xs={9}>
        <div className='text-center'>Диалог</div>
        <MessegesBox messages={messages} currentUser={currentUser} />
        <Form>
          <br />
          <Form.Group className="mb-3" controlId="exampleForm.Messages">
            <Form.Control as="textarea"
            disabled={(currentUser === null)? true: false} onKeyDown={keyDown} placeholder="Введите Ваше сообщение" value={textMessage} onChange={e => {setTextMessage(e.target.value)}}/>
          </Form.Group>
          <Button variant="primary" onClick={sendText} disabled={(currentUser === null || isSend)? true: false}>Отправить</Button>{' '}
          <div className={style.tools}>
              <Attachment color={'#000'} handlerFileСheck={handlerFileСheck}/>
              <Record handlerFileСheck={handlerFileСheck}/>
          </div>
        </Form>
      </Col>
    </Row>
  );
}
