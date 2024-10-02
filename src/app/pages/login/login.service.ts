import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { IUserAuthData } from '../register/interfaces/user-auth-data.interface';
import { IFirebaseError } from '../register/interfaces/firebase-error.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private auth: Auth) { }

  /**
     * SingIn the users with email and password credentials against Firebase
     * @param userAuthData { email, password }
     * @returns UserCredential 
     */
  async singIn(userAuthData: IUserAuthData) {
    try {
      const singUpResponse: UserCredential = await signInWithEmailAndPassword(this.auth, userAuthData.email, userAuthData.password);
      return singUpResponse;
    } catch (error) {
      const wrapError = error as IFirebaseError;
      const firebaseError: IFirebaseError = { ...wrapError };
      console.error(firebaseError); // Replace for Crashlythics log
      const fakeCrashlythicsSupportId = 589735646871354;
      let errorCode = 500;
      let errorMessage = 'The user can\'t be login. Please contact to the admin. ID support: ' + fakeCrashlythicsSupportId;
      switch (firebaseError.code) {
        case 'auth/invalid-credential':
          errorCode = 400;
          errorMessage = 'Incorrect credentials.'
          break;
      }
      throw Error(errorMessage, { cause: `Error ${errorCode}` });
    };
  }

}
