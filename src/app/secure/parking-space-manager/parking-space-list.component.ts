import {Component} from "@angular/core";
import {LoggedInCallback, UserLoginService, CognitoUtil, Callback} from "../../service/cognito.service";
import {Router} from "@angular/router";
import {ParkingSpace} from "../../models/parking-space"
import {ParkingSpaceManagerService} from "../../service/parking-space-manager.service"

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './parking-space-list.html',
    styleUrls:['./../../shared/loading.css']
})
export class ParkingSpaceListComponent implements LoggedInCallback {

    public idToken;

    public parkingSpaces: ParkingSpace[];

    public loading: boolean;

    constructor(public router: Router, 
                public userService: UserLoginService, 
                public cognitoUtil: CognitoUtil,
                public parkingSpaceManagerService: ParkingSpaceManagerService) {
        this.userService.isAuthenticated(this);
        console.log("in ParkingSpaceListComponent");
        this.loading = true;
    }

    isLoggedIn(message: string, isLoggedIn: boolean) {
        if (!isLoggedIn) {
            this.router.navigate(['/home/login']);
        } else {
            this.cognitoUtil.getIdToken(new IdTokenCallback(this));
        }
    }
}

export class IdTokenCallback implements Callback {
    constructor(private parkingSpaceListComponent: ParkingSpaceListComponent) { }

    callback() { }

    callbackWithParam(result) {
        this.parkingSpaceListComponent.idToken = result;
        this.parkingSpaceListComponent.parkingSpaceManagerService
            .list(result)
            .then(r => 
                {
                    this.parkingSpaceListComponent.parkingSpaces = r;
                    this.parkingSpaceListComponent.loading = false;
                });
    }
}
