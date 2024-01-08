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
        setStings(data)
        console.log(data)
      });
    }
  }, [socket]);

  return (
    <Row className="justify-content-md-center" >
      <Button variant="primary" >Отправить</Button>
      <br />
      {
        stings.map((item, i) => {
          return (
            <Col xs={6}>
              <h5>{item[0]}</h5>
              {
                item[1].map((el, i) => {
                  return ( 
                    <InputGroup key={'setings_' + i} className="mb-3">
                      <InputGroup.Text id="basic-addon1">{el[0]}</InputGroup.Text>
                      <Form.Control
                        value={el[1]}
                        aria-label={el[1]}
                        aria-describedby="basic-addon1"
                      />
                    </InputGroup>
                  ) 
                })
              }
            </Col>
          )
        })
      }
    </Row>
  );
}
