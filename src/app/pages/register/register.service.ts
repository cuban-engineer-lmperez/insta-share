import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, UserCredential } from "@angular/fire/auth";
import { IFirebaseError } from './interfaces/firebase-error.interface';
import { IUserAuthData } from './interfaces/user-auth-data.interface';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  private firestore = inject(Firestore);
  constructor(private auth: Auth) { }

  /**
   * SingUp a the users with email and password credentials against Firebase
   * @param userAuthData { email, password}
   * @returns UserCredential 
   */
  async singUp(userAuthData: IUserAuthData) {
    try {
      const singUpResponse: UserCredential = await createUserWithEmailAndPassword(this.auth, userAuthData.email, userAuthData.password);
      if (!singUpResponse) return;
      const { displayName, email, phoneNumber, providerId, photoURL, uid  } = singUpResponse.user;
      const userDoc = {
        displayName, email, phoneNumber, providerId, photoURL, uid
      }
      const usersCollection = collection(this.firestore, environment.collections.users);
      await addDoc(usersCollection, userDoc);
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
