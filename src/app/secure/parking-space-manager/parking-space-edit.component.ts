import 'rxjs/add/operator/switchMap';
import {Component, OnInit, OnDestroy} from "@angular/core";
import {LoggedInCallback, UserLoginService, CognitoUtil, Callback} from "../../service/cognito.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {ParkingSpace} from "../../models/parking-space"
import {ParkingSpaceManagerService} from "../../service/parking-space-manager.service"

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './parking-space-edit.html',
    styleUrls: ['../../shared/ng-form.css']
})
export class ParkingSpaceEditComponent implements LoggedInCallback, OnInit  {

    public idToken: string;

    public parkingSpace: ParkingSpace;

    public newSpace: boolean;

    public errorMessage: string;

    public loading: boolean;

    constructor(public router: Router, 
                private route: ActivatedRoute,
                public userService: UserLoginService, 
                public cognitoUtil: CognitoUtil,
                public parkingSpaceManagerService: ParkingSpaceManagerService) {
        this.userService.isAuthenticated(this);
        this.parkingSpace = new ParkingSpace();
    }

    ngOnInit(): void {

        console.debug("ParkingSpaceEditComponent.ngOnInit()");

        var id;
        this.route.params
            .subscribe(p => {
                console.debug("id:" + p['id']);
                
                if (p['id']) {
                    this.newSpace = false;
                    this.loading = true;
                    this.parkingSpaceManagerService.get(this.idToken, p['id'])
                    .then(p => {
                        this.parkingSpace = p;
                        this.loading = false;
                    });
                } else {
                    this.newSpace = true;
                    this.parkingSpace = new ParkingSpace();
                    this.loading = false;
                }
            });
    }

    isLoggedIn(message: string, isLoggedIn: boolean) {
        if (!isLoggedIn) {
            this.router.navigate(['/home/login']);
        } else {
            this.cognitoUtil.getIdToken(new IdTokenCallback(this));
        }
    }

    onSubmit() { 

        // if id exists update, otherwise update
        if (this.parkingSpace.id) {
            this.parkingSpaceManagerService.update(this.idToken, this.parkingSpace)
                .then(x => this.router.navigate(['/securehome/parkingspacelist']))
                .catch(e => this.errorMessage = e);
        } else {
            this.parkingSpaceManagerService.create(this.idToken, this.parkingSpace)
                .then(x => this.router.navigate(['/securehome/parkingspacelist']))
                .catch(e => this.errorMessage = e);
        }
    }
}

export class IdTokenCallback implements Callback {
    constructor(private parkingSpaceListComponent: ParkingSpaceEditComponent) { }

    callback() { }

    callbackWithParam(result) {
        this.parkingSpaceListComponent.idToken = result;
    }
}