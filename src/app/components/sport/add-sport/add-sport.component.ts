import { Component, OnInit } from '@angular/core';
import { SportService } from 'src/app/services/sport.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-sport',
  templateUrl: './add-sport.component.html',
  styleUrls: ['./add-sport.component.scss'],
})
export class AddSportComponent implements OnInit {
  add_sport_Form: FormGroup;

  constructor(private router: Router, private sportService: SportService) {}

  ngOnInit(): void {
    this.add_sport_Form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      discription: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      categorie: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  onSubmitAddSport() {
    if (this.add_sport_Form.invalid) {
      return;
    }
    this.sportService
      .create(this.add_sport_Form.value)
      .pipe(map((token) => this.router.navigate([''])))
      .subscribe();
  }
}
