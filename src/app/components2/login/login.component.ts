import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    
    loginForm : FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(6)]),
        password:  new FormControl(null, [Validators.required, Validators.minLength(3)])
      });

  }

  onSubmitLogin() {
    if(this.loginForm.invalid) {
        return;
      }
      this.authService.login(this.loginForm.value).pipe(
        map(token => this.router.navigate(['admin']))
      ).subscribe()
  }

  
/*
  login(){
      this.authservice.login('abdulsattar.alhmidi@gmail.com', 'Sad4117754').subscribe(data => console.log('success'));
  }*/


}