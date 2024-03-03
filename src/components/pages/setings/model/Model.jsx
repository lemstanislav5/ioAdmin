import {ContactsServise, OpenChat, IntroduceForm, Textarea, PhoneForm, FirstQuestions, Top, MessegesBox} from './forms/Forms';
import {SvgImages} from './images/SvgImages';
import Row from 'react-bootstrap/Row';
import style from './Index.module.css';


export const Model = ({colors, contacts, questionsSetings}) => {
  const messeges = [{fromId: "nqyMtBt1my",toId: "admin", text: "Вы не скажете, сколько сейчас градусов ниже нуля?", time: 1709490687924, type:"text", read: 0},
                    {fromId: "admin",toId: "nqyMtBt1my", text: "Ближе к вечеру и направо!", time: 1709494712504, type: "text", read:0},
                    {fromId: "admin",toId: "nqyMtBt1my", text: "Возьмите зонт, ожидается завтрак...", time: 1709494712504, type: "text", read:0}],
        chatId = "nqyMtBt1my";

  if (colors !== null &&  contacts !== null)
  return(
    <>
      <Row className='mb-3'>
        <OpenChat colorStart={colors.text} colorEnd={colors.top}/>
      </Row>
      <Row className='mb-3'>
        <ContactsServise SvgImages={SvgImages} contacts={contacts}/>
      </Row>
      <Row className='mb-3'>
        <div className={style.conteiner}>
          <Top style={style} colors={colors} SvgImages={SvgImages}/>
            <div style={{'backgroundColor': colors.messeges}}>
              <div className={style.box_messeges}>
                <IntroduceForm SvgImages={SvgImages}/>
              </div>
            </div>
            <Textarea placeholder="Введите сообщение" backgroundColor={colors.conteiner}/>
            <div className={style.tools}>
              {/* <Attachment color={colors.top} handlerFileСheck={handlerFileСheck}/>
              <Record color={colors.top} handlerFileСheck={handlerFileСheck}/> */}
            </div>
            <div className={style.send} style={{'color': colors.top, 'borderColor': colors.top}}>
              <SvgImages svg={'send'}/>
            </div>
            <div className={style.close} style={{'color': colors.top}}>
              <SvgImages svg={'close'}/>
            </div> 
          </div>
      </Row>
      <Row className='mb-3'>
        <div className={style.conteiner}>
          <Top style={style} colors={colors} SvgImages={SvgImages}/>
            <div style={{'backgroundColor': colors.messeges}}>
              <div className={style.box_messeges}>
                <PhoneForm/>
                <FirstQuestions questionsSetings={questionsSetings}/>
              </div>
            </div>
            <Textarea placeholder="Введите сообщение" backgroundColor={colors.conteiner}/>
            <div className={style.tools}>
              {/* <Attachment color={colors.top} handlerFileСheck={handlerFileСheck}/>
              <Record color={colors.top} handlerFileСheck={handlerFileСheck}/> */}
            </div>
            <div className={style.send} style={{'color': colors.top, 'borderColor': colors.top}}>
              <SvgImages svg={'send'}/>
            </div>
            <div className={style.close} style={{'color': colors.top}}>
              <SvgImages svg={'close'}/>
            </div> 
          </div>
      </Row>
      <Row className='mb-3'>
        <div className={style.conteiner}>
          <Top style={style} colors={colors} SvgImages={SvgImages}/>
            <div style={{'backgroundColor': colors.messeges}}>
              <div className={style.box_messeges}>
                <FirstQuestions questionsSetings={questionsSetings}/>
                <MessegesBox chatId={chatId} messeges={messeges} colors={colors} SvgImages={SvgImages} />
              </div>
            </div>
            <Textarea placeholder="Введите сообщение" backgroundColor={colors.conteiner}/>
            <div className={style.tools}>
              {/* <Attachment color={colors.top} handlerFileСheck={handlerFileСheck}/>
              <Record color={colors.top} handlerFileСheck={handlerFileСheck}/> */}
            </div>
            <div className={style.send} style={{'color': colors.top, 'borderColor': colors.top}}>
              <SvgImages svg={'send'}/>
            </div>
            <div className={style.close} style={{'color': colors.top}}>
              <SvgImages svg={'close'}/>
            </div> 
          </div>
      </Row>
    </>
  )
}