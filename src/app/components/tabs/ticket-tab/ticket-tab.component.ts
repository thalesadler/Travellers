import { Component, EventEmitter, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { FormPaymentEnum } from 'src/app/enums/form-payment.enum';
import { MovementTypeEnum } from 'src/app/enums/movement-type.enum';
import { TicketTypeEnum } from 'src/app/enums/ticket-type.enum';
import { Pending } from 'src/app/models/pending';

@Component({
    selector: 'app-ticket-tab',
    templateUrl: './ticket-tab.component.html',
    styleUrls: ['./ticket-tab.component.scss']
})
export class TicketTabComponent {
    item: Pending;

    @Output()
    SaveClick = new EventEmitter<Pending>();

    form: UntypedFormGroup;
    tipos: TicketTypeEnum[] = [TicketTypeEnum.Food, TicketTypeEnum.Meal, TicketTypeEnum.Transport];

    constructor(private formBuilder: UntypedFormBuilder,) {
        this.reload();

        this.form = this.formBuilder.group({
            TipoVale: [this.item.TipoVale],
            Valor: [this.item.Valor, [Validators.required]],
            Texto: [this.item.Texto, [Validators.required]],
        });
    }

    reload(){
        this.item = new Pending();
        this.item.Tipo = MovementTypeEnum.Pay;
        this.item.Forma = FormPaymentEnum.Ticket;  
        this.item.TipoVale = TicketTypeEnum.Food; 
    }

    saveClick(){
        this.SaveClick.emit(this.item);
        this.reload();
    }
}