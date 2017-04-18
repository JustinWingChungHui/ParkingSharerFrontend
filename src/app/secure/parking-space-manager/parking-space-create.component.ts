import {Component} from "@angular/core";
import {LoggedInCallback, UserLoginService, CognitoUtil, Callback} from "../../service/cognito.service";
import {Router} from "@angular/router";
import {ParkingSpace} from "../../models/parking-space"
import {ParkingSpaceManagerService} from "../../service/parking-space-manager.service"

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './parking-space-create.html',
    styleUrls: ['../../shared/ng-form.css']
})
export class ParkingSpaceCreateComponent implements LoggedInCallback {

    public idToken;

    public parkingSpace: ParkingSpace;

    constructor(public router: Router, 
                public userService: UserLoginService, 
                public cognitoUtil: CognitoUtil,
                public parkingSpaceManagerService: ParkingSpaceManagerService) {
        this.userService.isAuthenticated(this);
        console.log("in ParkingSpaceCreateComponent");

        this.newParkingSpace();
    }

    isLoggedIn(message: string, isLoggedIn: boolean) {
        if (!isLoggedIn) {
            this.router.navigate(['/home/login']);
        } else {
            this.cognitoUtil.getIdToken(new IdTokenCallback(this));
        }
    }

    newParkingSpace() {
        this.parkingSpace = new ParkingSpace();
    }

    onSubmit() { 
        this.parkingSpaceManagerService.create(this.idToken, this.parkingSpace);
        this.router.navigate(['/securehome/parkingspacelist']);
    }


}

export class IdTokenCallback implements Callback {
    constructor(private parkingSpaceListComponent: ParkingSpaceCreateComponent) { }

    callback() { }

    callbackWithParam(result) {
        this.parkingSpaceListComponent.idToken = result;
    }
}