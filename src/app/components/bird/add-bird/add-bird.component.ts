import { Component, OnInit } from '@angular/core';
import { BirdsService } from 'src/app/services/birds.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import {  FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-bird',
  templateUrl: './add-bird.component.html',
  styleUrls: ['./add-bird.component.scss']
})
export class AddBirdComponent implements OnInit {

    add_bird_Form : FormGroup;


  constructor(
    private router: Router,
    private birdService : BirdsService
  ) { }

  ngOnInit(): void {
    this.add_bird_Form = new FormGroup({
        name: new FormControl(null, [Validators.required, Validators.minLength(6)]),
        discription:  new FormControl(null, [Validators.required, Validators.minLength(3)]),
        species:  new FormControl(null, [Validators.required, Validators.minLength(3)])
      });
  }

  onSubmitAddBird() {
    if(this.add_bird_Form.invalid) {
        return;
      }
      this.birdService.create(this.add_bird_Form.value).pipe(
        map(token => this.router.navigate(['']))
      ).subscribe()
    
  }

}
