import style from './Contact.module.css';
import React from 'react';
import edit from './../../assets/edit.png';

function Contact(props) {
  return (
    <div className={style.contact_block}>
      <div onClick={props.setModalEditContactActive(true)}><img onClick={() => localStorage.setItem('id', props.id)} className={style.edit_button} src={edit} alt='edit' /></div>
      <div className={style.content_center}><img className={style.user_photo} src={props.avatar} alt='test' /></div>
      <div className={style.name}>{props.name}</div>
      <a className={style.link} href={'tel:' + props.phone}><button className={style.call_button}>Call</button></a>
    </div>
  );
}

export default Contact;