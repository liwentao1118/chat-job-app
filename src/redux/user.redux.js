import axios from 'axios'
import {getRedirectPath} from "../util";

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'

const initState = {
    isAuth: false,
    msg: '',
    user: '',
    type: '',
    redirectTo: ''
}

export function user(state = initState, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {...state, msg: '', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload}
        case LOGIN_SUCCESS:
            return {...state, msg: '', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload}
        case 'LOAD_DATA':
            return {...state, ...action.payload}
        case ERROR_MSG:
            return {...state, isAuth: false, msg: action.msg}
        default:
            return state
    }
}

export function loaddata(userinfo) {
    return {type: LOAD_DATA, payload: userinfo}
}

function errorMsg(msg) {
    return {msg, type: ERROR_MSG}

}

function loginSuccess(data) {
    return {type: LOGIN_SUCCESS, payload: data}
}

function registerSuccess(data) {
    return {type: REGISTER_SUCCESS, payload: data}
}

export function login({user, pwd}) {
    if (!user || !pwd) {
        return errorMsg('用户名密码必须输入')
    }
    return dispatch => {
        axios.post('/user/login', {user, pwd}).then(res => {
            if (res.status == 200 && res.data.code == 0) {
                dispatch(loginSuccess(res.data.data))
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}

export function register({user, pwd, repeatpwd, type}) {
    if (!user || !pwd || !type) {
        return errorMsg('用户名密码必须输入')
    }
    if (pwd != repeatpwd) {
        return errorMsg('两次输入的密码不一致')
    }
    return dispatch => {
        axios.post('/user/register', {user, pwd, type}).then(res => {
            if (res.status == 200 && res.data.code == 0) {
                console.log(res.data)
                dispatch(registerSuccess({user, pwd, type}))
            } else {
                console.log(res.data)
                dispatch(errorMsg(res.data.msg))
            }
        })

    }

}