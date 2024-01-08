import React, { useState, useEffect } from 'react';
import {io} from 'socket.io-client';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import {ColorsSection} from './colors/ColorsSection';
import {SocketSection} from './socket/SocketSection';

export const Setings = () => {
  const [socket, setSocket] = useState(null);
  const [colorsSetings, setColorsSetings] = useState(null);
  const [socketSetings, setSocketSetings] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const socketInstance = io('http://localhost:4000', {
      query: {token},
    });
    setSocket(socketInstance);
  }, []);

  useEffect(() => {
    if (socket !== null) {
      socket.emit('getSetings', data => {
        const {conteiner, top, messeges, fromId, text, notification, toId} = data.colors[0];
        setColorsSetings({conteiner, top, messeges, fromId, text, notification, toId})
        const {url, ws, port} = data.socket[0];
        setSocketSetings({url, ws, port});
      });
    }
  }, [socket]);

  return (
    <Row className="justify-content-md-center" >
      <Button variant="primary" >Отправить</Button>
      <br />
      {socketSetings &&  <SocketSection socketSetings={socketSetings} setSocketSetings={setSocketSetings}/>}
      {colorsSetings && <ColorsSection colors={colorsSetings} setColors={setColorsSetings}/>
        // stings.map((item, i) => {
        //   return (
        //     <Col xs={6}>
        //       <h5>{item[0]}</h5>
        //       {
        //         item[1].map((el, i) => {
        //           return ( 
        //             <InputGroup key={'setings_' + i} className="mb-3">
        //               <InputGroup.Text id="basic-addon1">{el[0]}</InputGroup.Text>
        //               <Form.Control
        //                 value={el[1]}
        //                 aria-label={el[1]}
        //                 aria-describedby="basic-addon1"
        //               />
        //             </InputGroup>
        //           ) 
        //         })
        //       }
        //     </Col>
        //   )
        // })
      }
    </Row>
  );
}
