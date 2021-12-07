import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pending } from 'src/app/models/pending';

@Component({
    selector: 'app-local-tab',
    templateUrl: './local-tab.component.html',
    styleUrls: ['./local-tab.component.scss']
})
export class LocalTabComponent {

    @Input()
    localPends: Pending[] = [];

    @Output()
    RefreshClick = new EventEmitter<Pending>();

    @Output()
    ProcessClick = new EventEmitter<Pending>();

    constructor() {     
    }   

    refreshClick(){
        this.RefreshClick.emit();
    }

    processClick(){
        this.ProcessClick.emit();
    }
}