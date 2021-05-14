import style from './App.module.css';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import AddContactPage from './components/AddContactPage/AddContactPage';
import EditContactPage from './components/EditContactPage/EditContactPage';
import { useState } from 'react';
import Contact from './components/Contact/Contact';

function App(props) {

  let logout = () => {
    localStorage.removeItem('isAuth');
    localStorage.removeItem('userName');
    localStorage.removeItem('contacts')
    window.location.reload();
  }

  const [modalAddContactActive, setModalAddContactActive] = useState(false);
  const [modalEditContactActive, setModalEditContactActive] = useState(false);

  let contacts = JSON.parse(localStorage.getItem('contacts'))

  const download = function(data) {
    const blob = new Blob([data], {type: 'text/csv'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'download.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  let csvData;
  let contactsItem;
  if(contacts) {
    let objectToCsv = function(contacts) {
      const csvRows = [];
      const headers = Object.keys(contacts[0]);
      csvRows.push(headers.join(','));
  
      for(const row of contacts) {
        const values = headers.map(header => {
          const escaped = (''+row[header]).replace(/"/g, '\\"');
          return `"${escaped}"`;
        });
        csvRows.push(values.join(','));
      }
      return csvRows.join('\n');
    }
  
    csvData = objectToCsv(contacts);

    let id = -1;
    contactsItem = contacts.map(c => <Contact id={id+=1} setModalEditContactActive={() => setModalEditContactActive} name={c.name} phone={c.phone} key={c} avatar={c.avatar} />)
  }

  return (
    <div className={style.main_content}>
      {props.isLoggined && localStorage.setItem('isAuth', true)} 
      {props.isLoggined && localStorage.setItem('userName', props.state.loginData.userName)}

      {!localStorage.getItem('isAuth') && <Redirect to='/login'/>}
      <div className={style.user_name}>Hello, {localStorage.getItem('userName')}</div>
      <button className={style.logout_button} onClick={logout}>Logout</button>
      <button className={style.new_contact_button} onClick={() => setModalAddContactActive(true)} >New Contact</button>
      <button className={style.csv_contact_button} onClick={() => download(csvData)} >Download CSV</button>
      <AddContactPage modalAddContactActive={modalAddContactActive} setModalAddContactActive={setModalAddContactActive} />
      <EditContactPage modalEditContactActive={modalEditContactActive} setModalEditContactActive={setModalEditContactActive} />
      <div className={style.contacts}>
        {contactsItem}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggined: state.loginData.isLoggined
  }
}

let AppContainer = connect(mapStateToProps, null)(App);

export default AppContainer;