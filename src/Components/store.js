import {BehaviorSubject} from "rxjs";

export const token$ = new BehaviorSubject(window.localStorage.getItem("token"));

export function updateToken(newToken){
    
    if(newToken === null){
        window.localStorage.removeItem("token");
    }else{
        token$.next(newToken);
    }
}