import TextControlsExample from './components/pages/authorization/Authorization'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




function App() {
  return (
    <Container fluid>
      <Row>
      <Col xs={3}>1 of 3</Col>
        <Col xs={9}><TextControlsExample/></Col>
      </Row>
    </Container>  
  );
}

export default App;
