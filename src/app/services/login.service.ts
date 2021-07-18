import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { StringsConstants } from '../infrastructure/StringsConstants';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(private http: HttpClient) { }

    isLogged() : Observable<boolean> {
        let logado = sessionStorage.getItem('@thalesmoney/logado');
        if (logado){
            return new Observable<boolean>(observer => {observer.next(true)});
        }else{
            return this.tryLogin()
        }        
    }

    tryLogin() {
        let username = localStorage.getItem('@thalesmoney/user'); 
        let password = localStorage.getItem('@thalesmoney/password'); 
        if(username && password){
            return this.login(username, password);
        }else{
            return new Observable<boolean>(observer => {observer.next(false)});
        }
    }

    login(username: string, password: string) {
        return this.http
        .post(StringsConstants.LOGIN_API_URL + '/login', 
              { username, password },
              { observe: 'response' } )
        .pipe(tap(res => {
            localStorage.setItem('@thalesmoney/user', username);
            localStorage.setItem('@thalesmoney/password', password);
            localStorage.setItem('@thalesmoney/token', (res.body as any).access_token);
            sessionStorage.setItem('@thalesmoney/logado', 'true');
        }),
        map(res => { return true }),
        catchError(err => {
            this.logout();
            return of(false);
        })
        );
    }

    logout(){
        localStorage.removeItem('@thalesmoney/user');
        localStorage.removeItem('@thalesmoney/password');
        localStorage.removeItem('@thalesmoney/token');
        sessionStorage.removeItem('@thalesmoney/logado');
    }
}