import style from './LoginPage.module.css';
import {connect} from 'react-redux';
import {changeCurrentInputTextAC, changeLoginStatusAC, setUserName} from './../../redux/reducers/loginReducer'
import React from 'react';
import {withRouter} from 'react-router-dom';

function LoginPage(props) {
    
    let ref = React.createRef();

    let changeCurrentInputText = () => {
        let currentInputText = ref.current.value;

        return props.changeCurrentInputTextAC(currentInputText);
    }

    let loginAction = () => {
        if(!ref.current.value) 
            alert('Пожалуйста, введите имя пользователя для начала.') 
        else {
            props.changeLoginStatusAC(true);
            props.setUserName(props.currentInputText);
            props.history.push('/');
        }
    }

    return (
        <div>
            <div className={style.label}>SignIn</div>
            <div className={style.content_center}><input className={style.input} type='text' placeholder="What's your name?" ref={ref} onChange={changeCurrentInputText} value={props.currentInputText} /></div>
            <div className={style.content_center}><button className={style.button} onClick={loginAction}>Submit</button></div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        currentInputText: state.loginData.currentInputText
    }
}

let LoginPageContainer = connect(mapStateToProps, {changeCurrentInputTextAC, changeLoginStatusAC, setUserName})(LoginPage);

export default withRouter(LoginPageContainer);
