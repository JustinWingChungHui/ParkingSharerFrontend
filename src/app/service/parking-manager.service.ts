import { Injectable } from '@angular/core';
import { Http, Headers, Response }    from '@angular/http';
import { ParkingSpace } from './../secure/parking-space-manager/parking-space';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ParkingSpaceManagerService {

    private listUrl = 'https://rkuv9bh1wj.execute-api.eu-west-2.amazonaws.com/prod/manager/spaces';
    private getUrl = 'https://rkuv9bh1wj.execute-api.eu-west-2.amazonaws.com/prod/manager/spaces/{id}';
    private createUrl = 'https://rkuv9bh1wj.execute-api.eu-west-2.amazonaws.com/prod/manager/space/create';
    private updateUrl = 'https://rkuv9bh1wj.execute-api.eu-west-2.amazonaws.com/prod/manager/spaces/{id}';

    constructor(private http: Http) { }

    list(identityKey: String): Promise<ParkingSpace[]> {
            return this.http
               .get(this.listUrl)
               .toPromise()
               .then(this.extractData);
    }


    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }
}