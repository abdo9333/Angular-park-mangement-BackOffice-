import { Component, OnInit } from '@angular/core';
import { BirdsService } from 'src/app/services/birds.service';
import { Bird } from 'src/app/models/bird/bird.model';

@Component({
  selector: 'app-bird-details',
  templateUrl: './bird-details.component.html',
  styleUrls: ['./bird-details.component.scss']
})
export class BirdDetailsComponent implements OnInit {

    bird ?: Bird[];
    currentbird: Bird = {};
    currentIndex = -1;
    name = '';

  constructor( private birdService : BirdsService) { }

  ngOnInit(): void {
    this.getAllBirds();
  }

  getAllBirds(){
    this.birdService.getAll()
      .subscribe({
        next: (data) => {
          this.bird = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  refreshList(): void {
    this.getAllBirds();
    this.currentbird = {};
    this.currentIndex = -1;
  }
  setActiveBird(bird: Bird, index: number): void {
    this.currentbird = bird;
    this.currentIndex = index;
  }

}
