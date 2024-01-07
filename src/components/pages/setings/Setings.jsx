import React, { useState, useEffect } from 'react';
import {io} from 'socket.io-client';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useDispatch, useSelector} from 'react-redux';

export const Setings = () => {
  const [socket, setSocket] = useState(null);
  const [stings, setStings] = useState([]);
  const dispatch = useDispatch();
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
        const arr = [];
        for (var key in data[0]) {
          if (data[0].hasOwnProperty(key) && key !== 'id') arr.push([key, data[0][key]]);
        }
        setStings(arr)
      });
    }
  }, [socket]);

  return (
    <Row className="justify-content-md-center" >
      <Button variant="primary" >Отправить</Button>
      <br />
      <Col xs={6}>
        <h5>Настройки сокета пользователя</h5>
       {
          stings.map((item, i) => {
            return (
              <InputGroup key={'setings_' + i} className="mb-3">
                <InputGroup.Text id="basic-addon1">{item[0]}</InputGroup.Text>
                <Form.Control
                  placeholder={item[1]}
                  aria-label={item[1]}
                  aria-describedby="basic-addon1"
                />
              </InputGroup>             
            )
          })
       }
      </Col>
      <Col xs={6}>
       {
          stings.map((item, i) => {
            return (
              <InputGroup key={'setings_' + i} className="mb-3">
                <InputGroup.Text id="basic-addon1">{item[0]}</InputGroup.Text>
                <Form.Control
                  placeholder={item[1]}
                  aria-label={item[1]}
                  aria-describedby="basic-addon1"
                />
              </InputGroup>             
            )
          })
       }
      </Col>
    </Row>
  );
}
