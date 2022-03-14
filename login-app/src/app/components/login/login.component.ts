import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isLoggedIn!: boolean;
  form!: any;

  constructor(private router: Router, private fb: FormBuilder, private alertService: AlertifyService, private userService: UserService) {
  }


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ["", Validators.required]
    })
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.form = { email: this.loginForm.get("email")?.value, password: this.loginForm.get("password")?.value }
      this.isLoggedIn = this.userService.login(this.form);
      if (this.isLoggedIn) {
        this.alertService.success("Login successfull!");
        this.router.navigate(["/dashboard"]);
      } else {
        this.alertService.error("Check your Email and Password!")
        this.loginForm.reset();
      }
    }
  }

}
