import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private alertService: AlertifyService, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    console.log(this.signupForm)
  }

  signup(): void {
    if (this.signupForm.valid) {
      let userData = {
        name: this.signupForm.get("name")?.value,
        lastname: this.signupForm.get("lastname")?.value,
        email: this.signupForm.get("email")?.value,
        password: this.signupForm.get("password")?.value
      }
      this.userService.signup(userData);
      this.signupForm.reset();
      this.alertService.success("Welcome to world! Let's login!");
      this.router.navigate(["/login"]);
    }
  }


}
