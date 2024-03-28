import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  login(): void {
    // Implement login functionality here
    console.log('Login with Username:', this.username, 'and Password:', this.password);
  }
}
