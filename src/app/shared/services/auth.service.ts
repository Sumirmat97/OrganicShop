import { UserService } from 'shared/services/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private userService: UserService) {
    this.user$ = afAuth.authState;
  }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/' ;
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithRedirect(new auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.signOut();
  }

  getRedirectResult() {
    return this.afAuth.getRedirectResult();
  }

  get appUser$() {
    return this.user$
      .pipe(switchMap(user => {
          if (user) {
            return this.userService.get(user.uid).valueChanges();
          }
          return of(null);
        }));
  }
}
