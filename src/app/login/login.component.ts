import { Component }        from '@angular/core';
import { Router,
         NavigationExtras } from '@angular/router';
import { AuthService }      from '../services/auth.service';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
  message: string;
  username: string;
  password: string;
  errorMessage: string = '';

  constructor(public authService: AuthService, public router: Router) {
    this.setMessage();
  }

  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  isValidFields(): boolean {
      this.errorMessage = '';
      if (this.username != null && this.username.length > 0 && this.password != null && this.password.length > 0) {
          return true;
      }
      this.errorMessage = "Enter valid username and password."
      return false;
  }

  login() {
      if (!this.isValidFields()) {
          return;
      }
    this.message = 'Trying to log in ...';

    this.authService.getSession(this.username, this.password).subscribe(val => {
      this.setMessage();
      console.log(val); // print out the response.
      console.log("in the login component");

      let accessToken = val.token;
      localStorage.setItem('access_token', accessToken);
      console.log(localStorage.getItem('access_token'));



      if (this.authService.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin';

        // Set our navigation extras object
        // that passes on our global query params and fragment
        let navigationExtras: NavigationExtras = {
          queryParamsHandling: 'preserve',
          preserveFragment: true
        };

        // Redirect the user
        this.router.navigate([redirect], navigationExtras);
      }
    },

    err => {
        console.log("error in login ");
    }
    );
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }
}
