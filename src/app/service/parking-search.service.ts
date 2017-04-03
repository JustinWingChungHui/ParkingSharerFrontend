import { Injectable } from '@angular/core';

import { ParkingSearch } from './../public/parking-search/parking-search';
import { ParkingSearchResult } from './../public/parking-search-results/parking-search-result'

import { RESULTS } from './mock-parking-search-results'

@Injectable()
export class ParkingSearchService {
    
    getSearchResults(searchParams: ParkingSearch): Promise<ParkingSearchResult[]> {
        return Promise.resolve(RESULTS);
    }
}

