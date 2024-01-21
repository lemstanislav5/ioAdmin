import {OpenChat} from './forms/openChat/OpenChat';
import {ContactsServise} from './forms/Forms';
import {SvgImages} from './images/SvgImages';
import Row from 'react-bootstrap/Row';

export const Model = ({colors, contacts}) => {
  if (colors !== null &&  contacts !== null)
  return(
    <>
      <Row>
        <OpenChat colorStart={colors.text} colorEnd={colors.top}/>
      </Row>
      <Row>
        <ContactsServise SvgImages={SvgImages} contacts={contacts}/>
      </Row>
    </>
  )
}