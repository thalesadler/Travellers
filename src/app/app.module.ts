import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MainPageComponent } from './pages/main/main-page.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { MatTreeModule } from '@angular/material/tree';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { MatTabsModule } from '@angular/material/tabs';
import { BankingTabComponent } from './components/tabs/banking-tab/banking-tab.component';
import { MoneyTabComponent } from './components/tabs/money-tab/money-tab.component';
import { CoinSelectComponent } from './components/coin-select/coin-select.component';
import { TicketTabComponent } from './components/tabs/ticket-tab/ticket-tab.component';
import { PendingGridComponent } from './components/grids/pending-grid/pending-grid.component';
import { HistoryTabComponent } from './components/tabs/history-tab/history-tab.component';
import { LocalTabComponent } from './components/tabs/local-tab/local-tab.component';

registerLocaleData(localePt, 'pt');

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: false,
  decimal: ",",
  precision: 2,
  prefix: "",
  suffix: "",
  thousands: "."
};

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    BankingTabComponent,
    MoneyTabComponent,
    CoinSelectComponent,
    TicketTabComponent,
    PendingGridComponent,
    HistoryTabComponent,
    LocalTabComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule, 
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatTreeModule,
    MatDialogModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    CurrencyMaskModule,
    MatNativeDateModule,
    MatRadioModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatTabsModule,    
  ],
  providers: [
    MatDatepickerModule,
    {
      provide: LOCALE_ID,
      useValue: 'pt'
  },
  { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
