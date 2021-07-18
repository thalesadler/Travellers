import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, } from '@angular/core';

@Component({
    selector: 'app-coin-select',
    templateUrl: './coin-select.component.html',
    styleUrls: ['./coin-select.component.scss']
})
export class CoinSelectComponent implements OnChanges {

    @Input()
    coinValue = 0;

    qtde = 0;
    valor = 0;

    @Output()
    Click = new EventEmitter<any>();

    @Input()
    Clear = true;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.Clear){
            this.qtde = 0;
            this.valor = 0;
        }
    }

    Color(value) {
        if (value > 0) {
            return 'blue';
        } else if (value < 0) {
            return 'red';
        } else {
            return 'black';
        }
    }

    totalColor() {
        return this.Color(this.valor);
    } 
    
    click(dif){
        this.qtde = this.qtde + dif;
        this.valor = this.qtde * this.coinValue;
        this.Click.emit({ valor: this.coinValue * dif, qtde: this.qtde});
    }
}