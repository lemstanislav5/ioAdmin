import Row from 'react-bootstrap/Row';
import { useEffect, useState } from 'react';

import { ConnectionState } from './ConnectionState';
import { MessageForm } from './MessageForm/MessageForm';
import { Events } from './Events';

import { socketСreator } from '../../../connectors';
import { setings} from '../../../setings';
const token = localStorage.getItem("token");
let socket = socketСreator(setings.HOST, setings.WS, setings.SOCKET_PORT, token);

export const  Messages = (props) => {
  console.log(props);
  //isConnected состояние соединения
  const [isConnected, setConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    //connect() соединяемся с сервером, закрытие соединения socket.disconnect();
    // messengesController.connect(setConnected);
    console.log(socket)
    socket.connect();

    function onConnect() {
      setConnected(true);
    }

    function onDisconnect() {
      setConnected(false);
    }

    function addMessage(value) {
      setMessages(messages => [...messages, value]);
    }

    socket.on('connect', setConnected);
    socket.on('disconnect', onDisconnect);
    socket.on('message', addMessage);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('message', addMessage);
    };

  }, []);

  useEffect(() => {
    if (isConnected) {
      console.log(isConnected)
    }
  }, [isConnected]);

  if(isConnected === false ) return <></>;
  return (
    <>
      <Row>
        <Events events={ messages } />
        <ConnectionState isConnected={ isConnected } />
      </Row>
      <Row>
        {/* <MessageForm socket={socket}/> */}
      </Row>
    </>


    // <Row>
    //   <Col xs={3}>
    //     <div>
    //       <div>Тест</div>
    //       <div>Онлайн</div>
    //     </div>
    //   </Col>
      
    //   <Col xs={9}>
    //     <div>Тестовое сообщение</div>
    //     <Form>
    //       <br/>
    //       <Form.Group className="mb-3" controlId="exampleForm.Messages">
    //         <Form.Control as="textarea" placeholder="Введите Ваше сообщение" />
    //       </Form.Group>
    //       <Button variant="primary">Отправить</Button>{' '}
    //     </Form>
    //   </Col>
    // </Row>
  );
}