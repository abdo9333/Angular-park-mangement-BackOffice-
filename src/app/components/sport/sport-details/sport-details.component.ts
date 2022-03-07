import { Component, Input, OnInit } from '@angular/core';
import { SportService } from 'src/app/services/sport.service';
import { Sport } from 'src/app/models/sport/sport.model';

@Component({
  selector: 'app-sport-details',
  templateUrl: './sport-details.component.html',
  styleUrls: ['./sport-details.component.scss'],
})
export class SportDetailsComponent implements OnInit {
  sport?: Sport[];
  currentSport: Sport = {};
  currentIndex = -1;
  name = '';

  constructor(private sportService: SportService) {}

  ngOnInit(): void {
    this.getAllSport();
  }

  getAllSport() {
    this.sportService.getAll().subscribe({
      next: (data) => {
        this.sport = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }
  refreshList(): void {
    this.getAllSport();
    this.currentSport = {};
    this.currentIndex = -1;
  }
  setActiveSport(sport: Sport, index: number): void {
    this.currentSport = sport;
    this.currentIndex = index;
  }
}
