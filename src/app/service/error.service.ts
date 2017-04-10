import { Injectable } from '@angular/core';
import { Response }          from '@angular/http';

@Injectable()
export class ErrorService {
    
    handleError (error: Response | any) {

        // TODO remote logging

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
