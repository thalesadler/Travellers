import { Component, Inject } from "@angular/core";
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from "@angular/material/snack-bar";

@Component({
    selector: 'app-error-snack-bar',
    templateUrl: 'error-snack-bar.component.html',
    styleUrls: ['./error-snack-bar.component.scss']
  })
export class ErrorSnackBarComponent {

    message: string = "";

    constructor(
        private sbRef: MatSnackBarRef<ErrorSnackBarComponent>,
        @Inject(MAT_SNACK_BAR_DATA) public data: any
      ) {
          this.message = data;
      }
}