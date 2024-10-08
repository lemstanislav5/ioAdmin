
import React from 'react';
import style from './ContactsServise.module.css';

export const ContactsServise = ({ SvgImages, contacts, color }) => {
  const { Telegram, VKontakte, WhatsApp } = contacts;

  return (
      <div className={style.wrapper}>
        {
          Telegram !== null
          ? <a href={'https://t.me/' + Telegram} target='_blank' rel='nofollow noopener noreferrer'>
              <SvgImages svg='Telegram'/>
              <div style={{color: color}}>Telegram</div>
            </a>
          : null
        }
        {
          VKontakte !== null
          ? <a href={'https://vk.com/im?sel=-' + VKontakte} target='_blank' rel='nofollow noopener noreferrer'>
              <SvgImages svg='VKontakte'/>
              <div style={{color: color}}>VKontakte</div>
            </a>
          : null
        }
        {
          WhatsApp !== null
          ? <a className={style.lastLinck} href={'https://wa.me/' + WhatsApp} target='_blank' rel='nofollow noopener noreferrer'>
              <SvgImages svg='WhatsApp'/>
              <div style={{color: color}}>WhatsApp</div>
            </a>
          : null
        }
      </div>
  )
}
