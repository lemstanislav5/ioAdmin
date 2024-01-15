import React, {useRef, useState, useEffect} from 'react';
import {io} from 'socket.io-client';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {ColorsSection} from './sections/ColorsSection';
import {SocketSection} from './sections/SocketSection';
import {ConsenSection} from './sections/ConsentSetings';
import {QuestionsSection} from './sections/QuestionsSection';
import {ContactsSetings} from './sections/ContactsSetings';
import {BsSave} from "react-icons/bs";

export const Setings = () => {
  const [socket, setSocket] = useState(null);
  const [colorsSetings, setColorsSetings] = useState(null);
  const [socketSetings, setSocketSetings] = useState(null);
  const [consentSetings, setConsentSetings] = useState(null);
  const [questionsSetings, setQuestionsSetings] = useState(null);
  const [contactsSetings, setContactsSetings] = useState(null);

  const colorsSetingsRef = useRef(null);
  const socketSetingsRef = useRef(null);
  const consentSetingsRef = useRef(null);
  const questionsSetingsRef = useRef(null);
  const contactsSetingsRef = useRef(null);

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
        const {consentLink, policyLink} = data.consent[0];
        setConsentSetings({consentLink, policyLink});
        setQuestionsSetings(data.questions);
        setContactsSetings(data.contacts)

        colorsSetingsRef.current = {conteiner, top, messeges, fromId, text, notification, toId};
        socketSetingsRef.current = {url, ws, port};
        consentSetingsRef.current = {consentLink, policyLink};
        questionsSetingsRef.current = data.questions;
        contactsSetingsRef.current = data.contacts;
      });
    }
  }, [socket]);

  // colorsSetings, setColorsSetings] = useState(null);
  // const [socketSetings, setSocketSetings] = useState(null);
  // const [consentSetings, setConsentSetings] = useState(null);
  // const [questionsSetings, setQuestionsSetings] = useState(null);
  // const [contactsSetings


  const handlerSend = () => {
    const colorsVal = (JSON.stringify(colorsSetingsRef.current) === JSON.stringify(colorsSetings))? false: colorsSetings;
    const socketVal = (JSON.stringify(socketSetingsRef.current) === JSON.stringify(socketSetings))? false: socketSetings;
    const consentVal = (JSON.stringify(consentSetingsRef.current) === JSON.stringify(consentSetings))? false: consentSetings;
    const questionsVal = (JSON.stringify(questionsSetingsRef.current) === JSON.stringify(questionsSetings))? false: questionsSetings;
    const contactsVal = (JSON.stringify(contactsSetingsRef.current) === JSON.stringify(contactsSetings))? false: contactsSetings;
    const data = {colors: colorsVal, socket: socketVal, consent: consentVal, questions: questionsVal, contacts: contactsVal};
    // socket.emit('setSetings', {data}, answer => {
    //   console.log(answer);
    // })
    console.log(data);
    // console.log(data);
  }

  return (
    <>
      <Row>
        <Col xs={4}>
          <Button onClick={handlerSend} variant="primary" className='mb-3'><BsSave /> Сохранить</Button>
        </Col>
      </Row>
      <Row className="justify-content-md-center" >
        {socketSetings &&  <SocketSection socketSetings={socketSetings} setSocketSetings={setSocketSetings}/>}
        {consentSetings &&  <ConsenSection consentSetings={consentSetings} setConsentSetings={setConsentSetings}/>}
        {colorsSetings && <ColorsSection colors={colorsSetings} setColors={setColorsSetings}/>}
        {questionsSetings && <QuestionsSection questionsSetings={questionsSetings} setQuestionsSetings={setQuestionsSetings}/>}
        {contactsSetings && <ContactsSetings contactsSetings={contactsSetings} setContactsSetings={setContactsSetings}/>}
      </Row>
    </>
  );
}
