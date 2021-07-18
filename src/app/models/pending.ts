import { FormPaymentEnum } from "../enums/form-payment.enum";
import { MovementTypeEnum } from "../enums/movement-type.enum";
import { TicketTypeEnum } from "../enums/ticket-type.enum";
import { Coin } from "./coin";

export class Pending{
    Id: number = 0;
    Texto: string = "";
    Valor: number = 0;
    LancMoeda: Coin;
    Forma: FormPaymentEnum;
    Tipo: MovementTypeEnum;
    TipoVale: TicketTypeEnum;
    Processado: boolean;

    constructor(item?: any) {
        if (item){
            this.Id = item.Id;  
            this.Texto = item.Texto;
            this.Valor = item.Valor;
            this.LancMoeda = item.LancMoeda;
            this.Forma = item.Forma;  
            this.Tipo = item.Tipo;    
            this.TipoVale = item.TipoVale;
            this.Processado = item.Processado;
        } else {
            this.LancMoeda = new Coin();
            this.Forma = FormPaymentEnum.Banking;
            this.Tipo = MovementTypeEnum.Pay;
            this.Processado = false;
        }
    }
}