import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {
    constructor() { }

    public notification$: Subject<string> = new Subject();
}