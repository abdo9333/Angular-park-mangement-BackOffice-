import { Component, Input, OnInit } from '@angular/core';
import { HandicapService } from 'src/app/services/handicap.service';
import { Handicap } from 'src/app/models/handicap/handicap.model';

@Component({
  selector: 'app-handicap-details',
  templateUrl: './handicap-details.component.html',
  styleUrls: ['./handicap-details.component.scss'],
})
export class HandicapDetailsComponent implements OnInit {
  handicap?: Handicap[];
  currentHandicap: Handicap = {};
  currentIndex = -1;
  name = '';

  constructor(private handicapService: HandicapService) {}

  ngOnInit(): void {
    this.getAllHandicap();
  }

  getAllHandicap() {
    this.handicapService.getAll().subscribe({
      next: (data) => {
        this.handicap = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }
  refreshList(): void {
    this.getAllHandicap();
    this.currentHandicap = {};
    this.currentIndex = -1;
  }
  setActiveHandicap(handicap: Handicap, index: number): void {
    this.currentHandicap = handicap;
    this.currentIndex = index;
  }
}
