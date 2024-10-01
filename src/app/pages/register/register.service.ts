import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, UserCredential } from "@angular/fire/auth";
import { IFirebaseError } from './interfaces/firebase-error.interface';
import { IUserAuthData } from './interfaces/user-auth-data.interface';

@Injectable({ providedIn: 'root' })
export class RegisterService {

  constructor(private auth: Auth) { }

  /**
   * SingUp a the users with email and password credentials against Firebase
   * @param userAuthData { email, password}
   * @returns UserCredential 
   */
  async singUp(userAuthData: IUserAuthData) {
    try {
      const singUpResponse: UserCredential = await createUserWithEmailAndPassword(this.auth, userAuthData.email, userAuthData.password);
      return singUpResponse;
    } catch (error) {
      const wrapError = error as IFirebaseError;
      const firebaseError: IFirebaseError = { ...wrapError };
      console.error(firebaseError); // Replace for Crashlythics log
      const fakeCrashlythicsSupportId = 589735646871354;
      let errorCode = 500;
      let errorMessage = 'The user can\'t be created. Please contact to the admin. ID support: ' + fakeCrashlythicsSupportId;
      switch (firebaseError.code) {
        case 'auth/email-already-in-use':
          errorCode = 400;
          errorMessage = 'Email already exists.'
          break;
      }
      throw Error(errorMessage, { cause: `Error ${errorCode}` });
    };
  }
}
