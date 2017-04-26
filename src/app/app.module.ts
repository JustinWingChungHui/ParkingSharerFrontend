import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";

import {routing} from "./app.routes";

import {UserRegistrationService, UserLoginService, UserParametersService, CognitoUtil} from "./service/cognito.service";
import {AwsUtil} from "./service/aws.service";
import {ParkingSearchService} from "./service/parking-search.service";
import {ErrorService} from "./service/error.service";
import {ParkingSpaceManagerService} from "./service/parking-space-manager.service"

import {HomeComponent, AboutComponent, HomeLandingComponent} from "./public/home.component";
import {MyProfileComponent} from "./secure/profile/myprofile.component";
import {SecureHomeComponent} from "./secure/landing/securehome.component";
import {JwtComponent} from "./secure/jwttokens/jwt.component";
import {LoginComponent} from "./public/auth/login/login.component";
import {RegisterComponent} from "./public/auth/register/registration.component";
import {ForgotPasswordStep1Component, ForgotPassword2Component} from "./public/auth/forgot/forgotPassword.component";
import {LogoutComponent, RegistrationConfirmationComponent} from "./public/auth/confirm/confirmRegistration.component";
import {ResendCodeComponent} from "./public/auth/resend/resendCode.component";
import {ParkingSpaceListComponent} from "./secure/parking-space-manager/parking-space-list.component";
import {ParkingSpaceEditComponent} from "./secure/parking-space-manager/parking-space-edit.component";
import {ParkingSearchComponent} from "./public/parking-search/parking-search.component";
import {LoadingComponent} from "./shared/loading.component";


@NgModule({
    declarations: [
        LoginComponent,
        LogoutComponent,
        RegistrationConfirmationComponent,
        ResendCodeComponent,
        ForgotPasswordStep1Component,
        ForgotPassword2Component,
        RegisterComponent,
        AboutComponent,
        HomeLandingComponent,
        HomeComponent,
        MyProfileComponent,
        SecureHomeComponent,
        JwtComponent,
        AppComponent,
        ParkingSpaceListComponent,
        ParkingSpaceEditComponent,
        ParkingSearchComponent,
        LoadingComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    providers: [
        CognitoUtil,
        AwsUtil,
        UserRegistrationService,
        UserLoginService,
        UserParametersService,
        ParkingSearchService,
        ParkingSpaceManagerService,
        ErrorService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
