import Row from 'react-bootstrap/Row';
import { useEffect, useState } from 'react';

import { ConnectionState } from './ConnectionState';
import { MessageForm } from './MessageForm/MessageForm';
import { Events } from './Events';
import { messengesController } from '../../../controllers/messengesController'


export const  Messages = (props) => {
  console.log(props);
  //isConnected состояние соединения
  const [isConnected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    //connect() соединяемся с сервером, закрытие соединения socket.disconnect();
    messengesController.connect(setConnected);
    // socket.connect();

    // function onMessages(value) {
    //   setMessages(messages => [...messages, value]);
    // }


    // socket.on('messages', onMessages);
    // socket.on('getChats', onMessages);

    // return () => {
    //   socket.off('messages', onMessages);
    //   socket.off('getChats', onMessages);
    // };

  }, []);

  useEffect(() => {
    if (isConnected) {
      console.log(isConnected)
    }
  }, [isConnected]);

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