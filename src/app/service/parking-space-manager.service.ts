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
    private getUrl = 'https://rkuv9bh1wj.execute-api.eu-west-2.amazonaws.com/prod/manager/spaces/{id}';
    private createUrl = 'https://rkuv9bh1wj.execute-api.eu-west-2.amazonaws.com/prod/manager/space/create';
    private updateUrl = 'https://rkuv9bh1wj.execute-api.eu-west-2.amazonaws.com/prod/manager/spaces/{id}';

    constructor(private http: Http, private errorService: ErrorService) { }

    list(identityKey: String): Promise<ParkingSpace[]> {
            return this.http
               .get(this.listUrl, { headers: this.getHeaders(identityKey) } )
               .toPromise()
               .then(this.extractData)
               .catch(this.errorService.handleError);
    }

    get(identityKey: String, parkingSpaceid: String): Promise<ParkingSpace> {
        return this.http
            .get(this.getUrl, this.getHeaders(identityKey))
            .toPromise()
            .then(this.extractData)
            .catch(this.errorService.handleError);  
    }

    create(identityKey: String, parkingSpace: ParkingSpace): Promise<ParkingSpace> {
        return this.http
            .post(this.createUrl, {
                data: parkingSpace, 
                headers: this.getHeaders(identityKey)
            })
            .toPromise()
            .then(this.extractData)
            .catch(this.errorService.handleError);  
    }

    update(identityKey: String, parkingSpace: ParkingSpace) {

        var requestOptions = this.getRequestOptions(identityKey);
        requestOptions.method = "PUT";

        return this.http
            .put(this.createUrl, parkingSpace, requestOptions)
            .toPromise()
            .then(this.extractData)
            .catch(this.errorService.handleError);  
    }

    private getRequestOptions(identityKey: String) {

        let headers = new Headers(
            { 
                'Content-Type': 'application/json',
                'Authorization': identityKey
            });
        let options = new RequestOptions({ headers: headers });
        
        return options;                    
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }
}