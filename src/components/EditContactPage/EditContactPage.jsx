import style from './EditContactPage.module.css';
import {connect} from 'react-redux';
import {getContactNameAC, getContactPhoneAC, addContactAC, clearFieldsAC} from './../../redux/reducers/contactsReducer';
import React from 'react';

function EditContactPage(props) {

  let nameRef = React.createRef();
  let phoneRef = React.createRef();

  let getContactName = () => {
    let currentContactNameVar = nameRef.current.value;
    return props.getContactNameAC(currentContactNameVar);
  }

  let getContactPhone = () => {
    let currentContactPhone = phoneRef.current.value;
    return props.getContactPhoneAC(currentContactPhone);
  }

  let addContact = () => {
    if(!nameRef.current.value) {
      alert('Пожалуйста, введите имя контакта.');
      return
    }
    if(!phoneRef.current.value) {
      alert('Пожалуйста, введите телефон контакта.');
      return
    }

    let contacts = JSON.parse(localStorage.getItem('contacts'));
    let key = localStorage.getItem('id');

    let newContact = {
      name: props.currentContactName,
      phone: props.currentContactPhone,
      avatar: contacts[key].avatar
    }

    contacts[key] = newContact;
    
    contacts.sort(function(a, b){
        if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
        if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
        return 0;
    })

    localStorage.setItem('contacts', JSON.stringify(contacts));
    
    props.clearFieldsAC();
    return props.setModalEditContactActive(false);
  }

  return (
    <div className={props.modalEditContactActive ? `${style.modal} ${style.active}` : style.modal} onClick={() => props.setModalEditContactActive(false)}>
        <div className={props.modalEditContactActive ? `${style.modal__content} ${style.active}` : style.modal__content} onClick={e => e.stopPropagation()}>
            <div className={style.label}>Edit contact</div>
            <div className={style.content_center}><input className={style.input} ref={nameRef} value={props.currentContactName} onChange={getContactName} placeholder='Contact Name' type='text' /></div>
            <div className={style.content_center}><input type='number' className={style.input} ref={phoneRef} value={props.currentContactPhone} onChange={getContactPhone} placeholder='Contact Phone'/></div>
            <div className={style.content_center}><button className={style.save_button} onClick={addContact}>Save</button></div>
            <div className={style.content_center}><button className={style.close_button} onClick={() => props.setModalEditContactActive(false)}>Close</button></div>
        </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentContactName: state.contactsData.currentContactName,
    currentContactPhone: state.contactsData.currentContactPhone
  }
}

let EditContactPageContainer = connect(mapStateToProps, {getContactNameAC, getContactPhoneAC, addContactAC, clearFieldsAC})(EditContactPage);

export default EditContactPageContainer;