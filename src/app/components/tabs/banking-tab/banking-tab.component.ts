import { Component, EventEmitter, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { FormPaymentEnum } from 'src/app/enums/form-payment.enum';
import { MovementTypeEnum } from 'src/app/enums/movement-type.enum';
import { Pending } from 'src/app/models/pending';

@Component({
    selector: 'app-banking-tab',
    templateUrl: './banking-tab.component.html',
    styleUrls: ['./banking-tab.component.scss']
})
export class BankingTabComponent {
    item: Pending;

    @Output()
    SaveClick = new EventEmitter<Pending>();

    form: UntypedFormGroup;
    tipos: MovementTypeEnum[] = [MovementTypeEnum.Pay, MovementTypeEnum.Receive];

    constructor(private formBuilder: UntypedFormBuilder,) {
        this.reload();      

        this.form = this.formBuilder.group({
            Tipo: [this.item.Tipo],
            Valor: [this.item.Valor, [Validators.required]],
            Texto: [this.item.Texto, [Validators.required]],
        });
    }

    reload(){
        this.item = new Pending();
        this.item.Tipo = MovementTypeEnum.Pay;
        this.item.Forma = FormPaymentEnum.Banking;  
    }

    saveClick(){
        this.SaveClick.emit(this.item);
        this.reload();
    }
}