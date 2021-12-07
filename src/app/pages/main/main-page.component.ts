import { Component, ViewEncapsulation } from '@angular/core';
import { Pending } from 'src/app/models/pending';
import { LoginService } from 'src/app/services/login.service';
import { PendingService } from 'src/app/services/pending.service';
import { SnackBarService } from 'src/app/services/snack.bar.service';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MainPageComponent {

    title: string = "Travellers";
    loading = false;
    loading1 = false;
    loading2 = false;
    localPends: Pending[] = [];
    pendingsNotProc: Pending[] = [];
    pendingsProc: Pending[] = [];

    constructor(public service: PendingService,
        public loginService: LoginService,
        private snackBarService: SnackBarService,) {
        this.loginService.login('thalesadler', 'tyutyu123').subscribe(res => {
            this.getLocalStorage();
            this.refreshPendings();
        });
    }

    openSnackBar(message) {
        this.snackBarService.notification$.next(message);
    }

    afterSave(res, pending) {
        this.loading = false;
        if (typeof res === "string") {
            this.openSnackBar(res);
            return false;
        } else {
            localStorage.removeItem("TH-".concat(pending.Id.toString()));
            return true;
        }
    }

    saveClick(pending) {
        this.loading = true;
        pending.Id = this.getRandomInt(1, 999999);
        this.addLocalStorage(pending);
        this.service.postPending(pending).subscribe(res => {
            this.afterSave(res, pending)
        });
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    addLocalStorage(pending) {
        localStorage.setItem('TH-'.concat(pending.Id.toString()), JSON.stringify(pending));
    }

    refreshLocalClick() {
        this.getLocalStorage();
    }

    refreshHistoryClick() {
        this.refreshPendings();
    }

    processLocalClick(){
        this.trySaveLocalStorage();
    }

    afterLoad(res) {
        if (!this.loading1 && !this.loading2) {
            this.loading = false;
        }
        if (typeof res === "string") {
            this.openSnackBar(res);
            return false;
        } else {
            return true;
        }
    }

    refreshPendings() {
        this.loading = true;
        this.loading1 = true;
        this.loading2 = true;
        this.service.listPending('N').subscribe(res => {
            this.loading1 = false;
            if (this.afterLoad(res)) {
                this.pendingsNotProc = res;
            }
        });
        this.service.listPending('S').subscribe(res => {
            this.loading2 = false;
            if (this.afterLoad(res)) {
                this.pendingsProc = res;
            }
        });
    }

    trySaveLocalStorage() {
        this.getLocalStorage();
        this.localPends.map(pend => {
                this.service.postPending(pend).subscribe(res => {
                    if (this.afterSavePend(res)) {
                        localStorage.removeItem("TH-".concat(pend.Id.toString()));
                    }
                });
        });
    }

    getLocalStorage() {
        this.localPends = [];
        const keys = Object.keys(localStorage);
        let i = keys.length;

        while (i--) {
            if (keys[i].substring(0, 3) == 'TH-') {
                const pend = JSON.parse(localStorage.getItem(keys[i]));
                this.localPends.push(pend);
            }
        }
    }

    afterSavePend(res) {
        if (typeof res === "string") {
            this.openSnackBar(res);
            return false;
        } else {
            return true;
        }
    }


    swipeCoord;
    swipeTime;
    selectedTab = 0;

    swipe(e: TouchEvent, when: string): void {
        const coord: [number, number] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
        const time = new Date().getTime();
        if (when === 'start') {
            this.swipeCoord = coord;
            this.swipeTime = time;
        } else if (when === 'end') {
            const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
            const duration = time - this.swipeTime;
            if (duration < 1000 //
                && Math.abs(direction[0]) > 30 // Long enough
                && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) { // Horizontal enough
                const swipe = direction[0] < 0 ? 'next' : 'previous';
                if (swipe === 'next') {
                    const isFirst = this.selectedTab === 0;
                    if (this.selectedTab <= 4) {
                        this.selectedTab = isFirst ? 1 : this.selectedTab + 1;
                    }
                } else if (swipe === 'previous') {
                    const isLast = this.selectedTab === 5;
                    if (this.selectedTab >= 1) {
                        this.selectedTab = this.selectedTab - 1;
                    }
                }
            }
        }
    }
}