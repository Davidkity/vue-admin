import cookie from "cookie_js";

const adminToKen = "admin_toKen";
const usernameKey = "username";

export function getToKen(){
    return cookie.get(adminToKen);
}

export function setToKen(toKen){
    return cookie.set(adminToKen,toKen);
}

export function removeToKen(){
    return cookie.remove(adminToKen);
}

export function setUserName(value){
    return cookie.set(usernameKey, value)
}

export function getUsername(){
    return cookie.get(usernameKey);
}

export function removeUsername(){
    return cookie.remove(usernameKey);
}