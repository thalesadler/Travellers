import { Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MovementTypeEnum } from 'src/app/enums/movement-type.enum';
import { Pending } from 'src/app/models/pending';

@Component({
    selector: 'app-pending-grid',
    templateUrl: './pending-grid.component.html',
    styleUrls: ['./pending-grid.component.scss']
})
export class PendingGridComponent implements OnChanges {

    @Input()
    itens: Pending[];

    @Output()
    ChangeItem = new EventEmitter<string>(); 

    @Output()
    DoubleClick = new EventEmitter<any>(); 

    displayedColumns: string[] = ['Texto', 'Valor', 'Forma'];
    dataSource: MatTableDataSource<Pending>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    formasDesc: string[] = ['', 'Banking', 'Vale', 'Dinheiro'];
    tiposValeDesc: string[] = ['', 'Alimentação', 'Refeição', 'Transporte'];

    ngOnChanges() {
        this.refreshGrid();
    } 

    refreshGrid() {
        if (this.itens) {
            this.dataSource = new MatTableDataSource(this.itens);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }
    }

    highlight(element) {
        this.dataSource.data.map(row => {
            (row as any).highlighted = false;
        })
        element.highlighted = true;
        this.ChangeItem.emit(element);
    } 

    doubleClick(row) {
        this.DoubleClick.emit(row);
    }

    Color(value) {
        if (value > 0) {
            return 'green';
        } else {
            return 'black';
        }
    }

    totalColor(row) {
        let value = 0;
        if (row.Tipo == MovementTypeEnum.Pay) {
            value = row.Valor * -1
        } else {
            value = row.Valor;
        }
        return this.Color(value);
    } 
}