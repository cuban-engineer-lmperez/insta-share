import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  getIdTokenResult,
  user, UserCredential,
  createUserWithEmailAndPassword
} from '@angular/fire/auth';
import { of } from 'rxjs';

jest.mock('@angular/fire/auth', () => {
  return {
    Auth: jest.fn(), // Mock the Auth class
    getIdTokenResult: jest.fn(), // Mock the getIdTokenResult function
    sendPasswordResetEmail: jest.fn(), // Mock the sendPasswordResetEmail function
    createUserWithEmailAndPassword: jest.fn(), // Mock the signInWithEmailAndPassword function
    signInWithEmailAndPassword: jest.fn(), // Mock the signInWithEmailAndPassword function
    signOut: jest.fn(), // Mock the signOut function
    user: jest.fn(() => of(null)), // Mock the user observable, returning a null user by default
  };
});

describe('LoginService', () => {
  let service: LoginService;
  let authMock: jest.Mocked<Auth>;
  beforeEach(() => {
    // Mock implementations for the AngularFire functions
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({ operationType: 'signIn', user: { email: 'luismanuelp1992@gmail.com' } } as UserCredential); // Mock the return value
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({} as UserCredential); // Mock the return value
    (signOut as jest.Mock).mockResolvedValue(undefined);
    (sendPasswordResetEmail as jest.Mock).mockResolvedValue(undefined);
    (getIdTokenResult as jest.Mock).mockResolvedValue({
      claims: {
        role: 'user',
      },
    });
    (user as jest.Mock).mockReturnValue(of(null)); // Mock the user observable to return null

    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should successful login an user with email and password', async () => {
    const credentials = { email: 'luismanuelp1992@gmail.com', password: 'Abcd1234*' };
    const response = await service.singIn(credentials);
    expect(JSON.stringify(response)).toEqual(JSON.stringify({ operationType: 'signIn', user: { email: credentials.email } }));
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(authMock, credentials.email, credentials.password);
  });

  it('should fail user login with email and password', async () => {
    const credentials = { email: 'luismanuelp1992@gmail.com', password: 'Abcd1234' };
    const response = await service.singIn(credentials);
    expect(JSON.stringify(response)).toContain('Error');
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(authMock, credentials.email, credentials.password);
  });
});
