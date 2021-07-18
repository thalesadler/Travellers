import { CoinTypeEnum } from "../enums/coin-type.enum";

export class Coin{
    Id: number;
    Notas200: number;
    Notas100: number;
    Notas50: number;
    Notas20: number;
    Notas10: number;
    Notas5: number;
    Notas2: number;
    Moedas1: number;
    Moedas50: number;
    Moedas25: number;
    Moedas10: number;
    Moedas5: number;
    TotalInicial: number;
    Tipo: CoinTypeEnum;

    constructor(item?: any) {
        this.Id = 0;
        this.Tipo = CoinTypeEnum.Entry; 
        if (item){
            this.Id = item.Id;   
            this.Notas200 = item.Notas200; 
            this.Notas100 = item.Notas100; 
            this.Notas50 = item.Notas50; 
            this.Notas20 = item.Notas20; 
            this.Notas10 = item.Notas10; 
            this.Notas5 = item.Notas5; 
            this.Notas2 = item.Notas2;
            this.Moedas1 = item.Moedas1;
            this.Moedas50 = item.Moedas50;
            this.Moedas25 = item.Moedas25;
            this.Moedas10 = item.Moedas10;
            this.Moedas5 = item.Moedas5;
            this.TotalInicial = this.Total();
        }else{
            this.Notas200 = 0; 
            this.Notas100 = 0; 
            this.Notas50 = 0; 
            this.Notas20 = 0; 
            this.Notas10 = 0; 
            this.Notas5 = 0; 
            this.Notas2 = 0;
            this.Moedas1 = 0;
            this.Moedas50 = 0;
            this.Moedas25 = 0;
            this.Moedas10 = 0;
            this.Moedas5 = 0;
            this.TotalInicial = 0;
        }
    }

    Total(){
        return (this.Notas200 * 200) +
        (this.Notas100 * 100) +
        (this.Notas50 * 50) +
        (this.Notas20 * 20) +
        (this.Notas10 * 10) +
        (this.Notas5 * 5) +
        (this.Notas2 * 2) +
        (this.Moedas1) +
        (this.Moedas50 * 0.5) +
        (this.Moedas25 * 0.25) +
        (this.Moedas10 * 0.1) +
        (this.Moedas5 * 0.05);
    }

    Diferenca(){
        return this.Total() - this.TotalInicial;
    }
}