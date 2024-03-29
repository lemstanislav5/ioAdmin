import {SketchPicker} from 'react-color';
import {useState} from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export const ColorsSection = ({colors, setColors}) => {
  const [currentColor, setCurrentColor] = useState('conteiner');
  const handlerChangeComplete = (color) => setColors({...colors, [currentColor]: color.hex});

  return (
    <>
      <h5 className="border-bottom">Цветовая настройка клиента</h5>
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
        <SketchPicker color={colors[currentColor]} onChangeComplete={handlerChangeComplete}/>
      </Col>
      </Row>
    </>
  )
}
