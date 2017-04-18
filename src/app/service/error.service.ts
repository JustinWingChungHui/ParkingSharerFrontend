import { Injectable } from '@angular/core';
import { Http, Headers, Response }    from '@angular/http';

@Injectable()
export class ErrorService {
    
    constructor(private http: Http) { }

    handleError (error: Response | any) {

        // TODO remote logging with http

        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Promise.reject(errMsg);
    }
}
