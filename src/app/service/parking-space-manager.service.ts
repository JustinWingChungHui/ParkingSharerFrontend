/**
 * Service to communicate with serverless endpoints for parking space management
 */

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response }    from '@angular/http';
import { ErrorService } from "./error.service"
import { ParkingSpace } from './../models/parking-space';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ParkingSpaceManagerService {

    private listUrl = 'https://rkuv9bh1wj.execute-api.eu-west-2.amazonaws.com/prod/manager/spaces';
    private getUrl = 'https://rkuv9bh1wj.execute-api.eu-west-2.amazonaws.com/prod/manager/spaces/id';
    private createUrl = 'https://rkuv9bh1wj.execute-api.eu-west-2.amazonaws.com/prod/manager/space/create';
    private updateUrl = 'https://rkuv9bh1wj.execute-api.eu-west-2.amazonaws.com/prod/manager/spaces/id';

    constructor(private http: Http, private errorService: ErrorService) { }

    list(identityKey: string): Promise<ParkingSpace[]> {

        console.log("in ParkingSpaceManagerService.list");

        var requestOptions = this.getRequestOptions(identityKey);
        requestOptions.method = "GET";   
        
        return this.http
            .get(this.listUrl, requestOptions )
            .toPromise()
            .then(this.extractData)
            .catch(this.errorService.handleError);
    }

    get(identityKey: string, parkingSpaceid: string): Promise<ParkingSpace> {

        var requestOptions = this.getRequestOptions(identityKey);
        requestOptions.method = "GET";       

        var re = /id/gi; 
        var url = this.getUrl.replace(re, parkingSpaceid);

        return this.http
            .get(url, requestOptions)
            .toPromise()
            .then(this.extractData)
            .catch(this.errorService.handleError);  
    }

    create(identityKey: string, parkingSpace: ParkingSpace): Promise<ParkingSpace> {

        console.log("in ParkingSpaceManagerService.create");

        var requestOptions = this.getRequestOptions(identityKey);
        requestOptions.method = "POST";

        return this.http
            .post(this.createUrl, parkingSpace, requestOptions)
            .toPromise()
            .then(this.extractData)
            .catch(this.errorService.handleError);  
    }

    update(identityKey: string, parkingSpace: ParkingSpace) {

        var re = /id/gi; 
        var url = this.getUrl.replace(re, parkingSpace.id);

        var requestOptions = this.getRequestOptions(identityKey);
        requestOptions.method = "PUT";

        return this.http
            .put(url, parkingSpace, requestOptions)
            .toPromise()
            .then(this.extractData)
            .catch(this.errorService.handleError);  
    }

    private getRequestOptions(identityKey: string) {

        var headers = new Headers(
            { 
                'Content-Type': 'application/json',
                'Authorization': identityKey
            });
        var options = new RequestOptions({ headers: headers });
        
        return options;                    
    }

    private extractData(res: Response) {

        console.log("Response:");
        console.log(res);
        
        let body = res.json();
        return body.data || { };
    }
}