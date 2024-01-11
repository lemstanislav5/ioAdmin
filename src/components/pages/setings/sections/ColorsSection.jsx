import { SketchPicker } from 'react-color';
import {useState} from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export const ColorsSection = ({colors, setColors}) => {
  const [currentColor, setCurrentColor] = useState('conteiner');
  const handleChangeComplete = (color) => setColors({...colors, [currentColor]: color.hex});

  return (
    <Col xs={4} lg={6} sm={12}><h5>Цветовая настройка клиента</h5>
      <Row className="justify-content-md-center" >
      <Col xs={6}>
        {
          Object.keys(colors).map(name => (
            <InputGroup key={name} className="mb-3">
              <InputGroup.Text
                onClick={() => {setCurrentColor(name)}}
                style={{background:colors[name], cursor:'pointer'}}>{name}</InputGroup.Text>
              <InputGroup.Text>{colors[name]}</InputGroup.Text>
            </InputGroup>
          ))
        }
      </Col>
      <Col xs={6}>
        <SketchPicker color={colors[currentColor]} onChangeComplete={handleChangeComplete}/>
      </Col>
      </Row>
    </Col>
  )
}
