import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { ParkingSearch } from './parking-search';
import { ParkingSearchService } from './../../service/parking-search.service'

@Component({
  selector: 'parking-search',
  templateUrl: './parking-search.html'
})
export class ParkingSearchComponent implements OnInit {

  constructor(private parkingSearchService: ParkingSearchService) { }
  
  parkingSearch: ParkingSearch;
  errorMessage: string;

  ngOnInit(): void {
    this.parkingSearch = new ParkingSearch();
    this.errorMessage = null;
  }

  onSearch() {
    
  }
}
