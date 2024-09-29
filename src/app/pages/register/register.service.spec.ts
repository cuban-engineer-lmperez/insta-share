import { TestBed } from '@angular/core/testing';
import { RegisterService } from './register.service';
import { of } from 'rxjs';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  getIdTokenResult,
  user, User, UserCredential
} from '@angular/fire/auth';

jest.mock('@angular/fire/auth', () => {
  return {
    Auth: jest.fn(), // Mock the Auth class
    getIdTokenResult: jest.fn(), // Mock the getIdTokenResult function
    sendPasswordResetEmail: jest.fn(), // Mock the sendPasswordResetEmail function
    signInWithEmailAndPassword: jest.fn(), // Mock the signInWithEmailAndPassword function
    signOut: jest.fn(), // Mock the signOut function
    user: jest.fn(() => of(null)), // Mock the user observable, returning a null user by default
  };
});

describe('RegisterService', () => {
  let service: RegisterService;
  let authMock: jest.Mocked<Auth>;
  beforeEach(() => {
    // Mock implementations for the AngularFire functions
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({} as UserCredential); // Mock the return value
    (signOut as jest.Mock).mockResolvedValue(undefined);
    (sendPasswordResetEmail as jest.Mock).mockResolvedValue(undefined);
    (getIdTokenResult as jest.Mock).mockResolvedValue({
      claims: {
        role: 'user',
      },
    });
    (user as jest.Mock).mockReturnValue(of(null)); // Mock the user observable to return null

    TestBed.configureTestingModule({
      providers: [
        RegisterService,
        { provide: Auth, useValue: {} }, // Provide an empty object as a mock Auth instance
      ],
    });
    service = TestBed.inject(RegisterService);
    authMock = TestBed.inject(Auth) as jest.Mocked<Auth>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should successful register an user with email and password', async () => {
    const credentials  = { email: 'luismanuelp1992@gmail.com', password: 'Abcd1234*' };
    await service.createAccount(credentials);
   // expect(firebase.auth().createUserWithEmailAndPassword).toBeCalledWith(email, password);
   // service.createAccount(mockUser).subscribe((data) => {
   //   expect(data.email).toEqual(mockUser.email);
   // });
   expect(signInWithEmailAndPassword).toHaveBeenCalledWith(authMock, credentials.email, credentials.password);

  });

});
