import { Component, OnInit } from '@angular/core';
import { HandicapService } from 'src/app/services/handicap.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-handicap',
  templateUrl: './add-handicap.component.html',
  styleUrls: ['./add-handicap.component.scss'],
})
export class AddHandicapComponent implements OnInit {
  add_handicap_Form: FormGroup;

  constructor(
    private router: Router,
    private handicapService: HandicapService
  ) {}

  ngOnInit(): void {
    this.add_handicap_Form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      discription: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      historique: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  onSubmitAddHandicap() {
    if (this.add_handicap_Form.invalid) {
      return;
    }
    this.handicapService
      .create(this.add_handicap_Form.value)
      .pipe(map((token) => this.router.navigate([''])))
      .subscribe();
  }
}
