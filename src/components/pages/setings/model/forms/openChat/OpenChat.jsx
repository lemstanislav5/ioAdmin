import { memo, useState }  from 'react';
import style from './OpenChat.module.css';
import {SvgImages} from '../../images/SvgImages';

export const OpenChat = memo(() => {
  const [color, setColor] = useState('#FFC107');

  return(
    <div className={style.icon} onMouseEnter={() => setColor('#333')} onMouseLeave={() => setColor('#FFC107')}>
      <SvgImages svg={'openChat'} fill={color}/>
    </div>
  )
});
