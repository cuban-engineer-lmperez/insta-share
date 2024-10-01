import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, UserCredential } from "@angular/fire/auth";

declare type UserAuthData = {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class RegisterService {

  constructor(private auth: Auth) { }

  /**
   * 
   * @param userAuthData 
   * @returns 
   */
  async singUp(userAuthData: UserAuthData) {
    let singUpResponse: UserCredential;
    try {
      return singUpResponse = await createUserWithEmailAndPassword(this.auth, userAuthData.email, userAuthData.password);
    } catch (error) {
      console.error(error); // Replace for Crashlythics log
      const fakeCrashlythicsSupportId = 589735646871354;
      const errorCode = 500;
      const errorMessage = 'The user can\'t be created. Please contact to the admin. ID support: ' + fakeCrashlythicsSupportId;
      throw Error(errorMessage, { cause: `Error ${errorCode}` });
    };
  }
}
