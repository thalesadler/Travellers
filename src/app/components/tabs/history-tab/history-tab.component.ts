import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pending } from 'src/app/models/pending';

@Component({
    selector: 'app-history-tab',
    templateUrl: './history-tab.component.html',
    styleUrls: ['./history-tab.component.scss']
})
export class HistoryTabComponent {

    @Input()
    localPends: Pending[] = [];

    @Input()
    pendingsNotProc: Pending[] = [];

    @Input()
    pendingsProc: Pending[] = [];

    @Output()
    RefreshClick = new EventEmitter<Pending>();

    constructor() {     
    }   

    refreshClick(){
        this.RefreshClick.emit();
    }
}