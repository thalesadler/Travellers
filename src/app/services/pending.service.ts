import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { StringsConstants } from '../infrastructure/StringsConstants';
import { Pending } from '../models/pending';

@Injectable({
    providedIn: 'root'
})
export class PendingService {
    constructor(private http: HttpClient) { }

    listPending(proc): Observable<Pending[]> {
        const header = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('@thalesmoney/token')
        };
        const options = {
            method: 'GET',
            headers: header,
            params: {
                processado: proc,
            }
        };

        return this.http.get(StringsConstants.API_URL + 'pendente', options).pipe(map(
            res => {
                return (res as any).Dados.map(
                    item => {
                        return new Pending(item);
                    }
                )
            },
            catchError(err => {
                console.log(err.status + ' (' + err.statusText + ') : ' + err.error.Error);
                return of(undefined);
            })));
    }

    listPendingPay(): Observable<Pending[]> {
        const header = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('@thalesmoney/token')
        };
        const options = {
            method: 'GET',
            headers: header,
            params: {
                tipo: "pagar",
            }
        };

        return this.http.get(StringsConstants.API_URL + 'pendente', options).pipe(map(
            res => {
                return (res as any).Dados.map(
                    item => {
                        return new Pending(item);
                    }
                )
            },
            catchError(err => {
                console.log(err.status + ' (' + err.statusText + ') : ' + err.error.Error);
                return of(undefined);
            })));
    }

    listPendingReceive(): Observable<Pending[]> {
        const header = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('@thalesmoney/token')
        };
        const options = {
            method: 'GET',
            headers: header,
            params: {
                tipo: "receber",
            }
        };

        return this.http.get(StringsConstants.API_URL + 'pendente', options).pipe(map(
            res => {
                return (res as any).Dados.map(
                    item => {
                        return new Pending(item);
                    }
                )
            },
            catchError(err => {
                console.log(err.status + ' (' + err.statusText + ') : ' + err.error.Error);
                return of(undefined);
            })));
    }

    getPending(pending: Pending): Observable<Pending>;
    getPending(id: number): Observable<Pending>;
    getPending(item: any): Observable<Pending> {
        if (typeof item === 'object') {
            return this.getPending(item.Id);
        }

        const header = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('@thalesmoney/token')
        };
        const options = {
            method: 'GET',
            headers: header
        };

        return this.http.get(StringsConstants.API_URL + 'pendente/' + item, options).pipe(map(
            res => {
                return new Pending((res as any).Dados)
            },
            catchError(err => {
                console.log(err.status + ' (' + err.statusText + ') : ' + err.error.Error);
                return of(undefined);
            })));
    }

    postPending(pending: Pending): Observable<any> {
        const header = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('@thalesmoney/token')
        };
        const options = {
            method: 'POST',
            headers: header
        };

        pending.Texto = pending.Texto.trim();

        return this.http.post(StringsConstants.API_URL + 'pendente', pending, options).pipe(map(
            res => {
                return new Pending((res as any).Dados)
            }),
            catchError(err => {
                if (err.status == 0){
                    return of ("sem internet");
                } else {
                    return of(err.status + ' (' + err.statusText + ') : ' + err.error.Error);
                }
            })
        );
    }

    putPending(pending: Pending): Observable<any> {
        const header = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('@thalesmoney/token')
        };
        const options = {
            method: 'PUT',
            headers: header
        };

        pending.Texto = pending.Texto.trim();

        return this.http.put(StringsConstants.API_URL + 'pendente', pending, options).pipe(map(
            res => {
                return new Pending((res as any).Dados)
            }),
            catchError(err => {
                return of(err.status + ' (' + err.statusText + ') : ' + err.error.Error);
            })
        );
    }

    deletePending(pending: Pending)
    deletePending(id: number)
    deletePending(item: any) {
        if (typeof item === 'object') {
            return this.deletePending(item.Id);
        } else {
            const header = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('@thalesmoney/token')
            };
            const options = {
                method: 'DELETE',
                headers: header
            };

            return this.http.delete(StringsConstants.API_URL + 'pendente/' + item, options).pipe(map(
                res => {
                    return "Excluído com sucesso!!"
                }),
                catchError(err => {
                    return of(err.status + ' (' + err.statusText + ') : ' + err.error.Error);
                })
            );
        }
    }
}