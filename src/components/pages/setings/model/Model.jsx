import {ContactsServise, OpenChat, IntroduceForm, Textarea, PhoneForm, FirstQuestions} from './forms/Forms';
import {SvgImages} from './images/SvgImages';
import Row from 'react-bootstrap/Row';
import style from './Index.module.css';


export const Model = ({colors, contacts, questionsSetings}) => {
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
            <div className={style.box_top} style={{'backgroundColor': colors.top}}>
              <span style={{'color': colors.text}}>
                Напишите ваше сообщение
              </span>
              <div className={style.move}></div>
              <div style={{'color': colors.text}} className={style.backСall}><SvgImages svg={'backСall'}/></div>
              <div className={style.open} style={{'color': colors.text}}>
                <SvgImages svg={'open'}/>
              </div>
            </div>
            <div style={{'backgroundColor': colors.messeges}}>
              <div className={style.box_messeges}>
                <IntroduceForm SvgImages={SvgImages}/>
                {/* <FirstQuestions handlerSend={handlerSend} initialFirstQuestions={initialFirstQuestions}/> */}
                {/* <MessegesBox chatId={chatId} messeges={messeges} colors={colors} SvgImages={SvgImages} /> */}
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
            <div className={style.box_top} style={{'backgroundColor': colors.top}}>
              <span style={{'color': colors.text}}>
                Напишите ваше сообщение
              </span>
              <div className={style.move}></div>
              <div style={{'color': colors.text}} className={style.backСall}><SvgImages svg={'backСall'}/></div>
              <div className={style.open} style={{'color': colors.text}}>
                <SvgImages svg={'open'}/>
              </div>
            </div>
            <div style={{'backgroundColor': colors.messeges}}>
              <div className={style.box_messeges}>
                <PhoneForm/>
                <FirstQuestions questionsSetings={questionsSetings}/>
                {/* <MessegesBox chatId={chatId} messeges={messeges} colors={colors} SvgImages={SvgImages} /> */}
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
            <div className={style.box_top} style={{'backgroundColor': colors.top}}>
              <span style={{'color': colors.text}}>
                Напишите ваше сообщение
              </span>
              <div className={style.move}></div>
              <div style={{'color': colors.text}} className={style.backСall}><SvgImages svg={'backСall'}/></div>
              <div className={style.open} style={{'color': colors.text}}>
                <SvgImages svg={'open'}/>
              </div>
            </div>
            <div style={{'backgroundColor': colors.messeges}}>
              <div className={style.box_messeges}>
                <FirstQuestions questionsSetings={questionsSetings}/>
                {/* <MessegesBox chatId={chatId} messeges={messeges} colors={colors} SvgImages={SvgImages} /> */}
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