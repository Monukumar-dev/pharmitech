import { empty, notUndefinedAndNull } from "../utils/Validation";

export function getSession() {

  var session = null;
  session = sessionStorage.userObj;
  if(!empty(session)){ 
    return JSON.parse(session);
  }else{
    return null;
  }
}

export function createSession(data) {
  if (notUndefinedAndNull(data)) {
    sessionStorage.userObj = JSON.stringify(data);
  } 
}

//return token
export function getToken(){

  let session = getSession();
    if (!empty(session)) {
        return session.token;
    }
}


export function clearSession() {
  sessionStorage.removeItem("userObj");
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key !== "authorization") {
      localStorage.removeItem(key);
      i--;
    }
  }
  sessionStorage.clear();
}


//create and get deviceUd from Session
export function createDeviceId(id) {
  sessionStorage.deviceId =id;
}

export function getDeviceId() {
  if (!empty(sessionStorage)) {
      return sessionStorage.deviceId;
  }
}


//setting and getting authorization token

export function setAuthorizationToken(token){
  localStorage.setItem('authorization',token);
}


export function getAuthorizationToken() {
  let authorise= localStorage.getItem('authorization')
  if(!empty(authorise) && notUndefinedAndNull(authorise) && authorise!=="null" && authorise !==null ){
    return authorise
  }
  return null;
}

export function deleteAuthorizationToken() {
  localStorage.removeItem('authorization');
}


//create and get deviceUd from Session
export function saveMenuPermission(data) {
  let temp=[]
  if(data){
    temp=data
  }
  sessionStorage.menuPermission =JSON.stringify(temp);
}

export function getSaveMenuPermission() {
  if (!empty(sessionStorage) && notUndefinedAndNull(sessionStorage.menuPermission)) {
      return JSON.parse(sessionStorage.menuPermission);
  }
}


//create and get deviceUd from Session
export function createNotification(data) {
  sessionStorage.notificationList =JSON.stringify(data);
}

export function getNotificationList() {
  if (!empty(sessionStorage)) {
      return sessionStorage.notificationList?JSON.parse(sessionStorage.notificationList):[];
  }
}

export function clearNotificationList() {
  sessionStorage.removeItem("notificationList")
}