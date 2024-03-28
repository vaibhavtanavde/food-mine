import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  newUsername: string = '';
  newPassword: string = '';

  register(): void {
    // Implement register functionality here
    console.log('Register with Username:', this.newUsername, 'and Password:', this.newPassword);
  }
}
