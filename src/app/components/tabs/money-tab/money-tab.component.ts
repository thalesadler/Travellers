import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormPaymentEnum } from 'src/app/enums/form-payment.enum';
import { MovementTypeEnum } from 'src/app/enums/movement-type.enum';
import { Coin } from 'src/app/models/coin';
import { Pending } from 'src/app/models/pending';

@Component({
    selector: 'app-money-tab',
    templateUrl: './money-tab.component.html',
    styleUrls: ['./money-tab.component.scss']
})
export class MoneyTabComponent {
    item: Pending;

    @Output()
    SaveClick = new EventEmitter<Pending>();

    form: FormGroup;
    tipos: MovementTypeEnum[] = [MovementTypeEnum.Pay, MovementTypeEnum.Receive];
    coins = [100, 50, 20, 10, 5, 2, 1, 0.5, 0.25, 0.10, 0.05]; 
    lancMoeda: Coin;
    clear = true;

    constructor(private formBuilder: FormBuilder,) {
        this.reload();      

        this.form = this.formBuilder.group({
            Tipo: [this.item.Tipo],
            Valor: [this.item.Valor, [Validators.required]],
            Texto: [this.item.Texto, [Validators.required]],
        });
    }

    reload(){
        this.lancMoeda = new Coin();
        this.item = new Pending();
        this.item.Forma = FormPaymentEnum.Money;  
        this.item.LancMoeda = this.lancMoeda;
        this.clear = !this.clear;
    }

    saveClick(){
        if (this.item.Valor > 0){
            this.item.Tipo = MovementTypeEnum.Receive;
        } else {
            this.item.Tipo = MovementTypeEnum.Pay;
            this.item.Valor = this.item.Valor * -1;
        }
        this.SaveClick.emit(this.item);
        this.reload();
    }

    coinClick(event){
        this.item.Valor = this.item.Valor + event.valor;
        let fieldname = '';
        const coinValue = Math.abs(event.valor);
        if (coinValue > 1){
            fieldname = "Notas".concat(coinValue.toString())
        } else {
            fieldname = "Moedas".concat(coinValue.toString())
        }
        this.item.LancMoeda[fieldname] = event.qtde;
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
        return this.Color(this.item.Valor);
    }
}