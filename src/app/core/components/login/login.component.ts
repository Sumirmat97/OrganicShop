import { UserService } from 'shared/services/user.service';
import { AuthService } from 'shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.auth.getRedirectResult()
      .then( res => {
        if (res.user) {
          this.userService.save(res.user);
          const redirectUrl = localStorage.getItem('returnUrl');
          this.router.navigateByUrl(redirectUrl);
        }
      });
  }

  login() {
    this.auth.login();
  }
}
