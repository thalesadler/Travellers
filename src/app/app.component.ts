import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorSnackBarComponent } from './components/snack-bars/error-snack-bar/error-snack-bar.component';
import { SnackBarService } from './services/snack.bar.service';
//declare var device: { platform: any; };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Travellers';

  constructor(
    private notificationService: SnackBarService,
    private snackBar: MatSnackBar
  ) {
    this.notificationService.notification$.subscribe(message => {
      this.snackBar.openFromComponent(ErrorSnackBarComponent, {
        data: message,
        duration: 5000,
        panelClass: ['snack-error']
      });
    });
  }

  ngOnInit(): void {
    //document.addEventListener("deviceready", () =>  alert(device.platform))
  }  
}
