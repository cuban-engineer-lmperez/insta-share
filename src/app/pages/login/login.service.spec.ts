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
    createUserWithEmailAndPassword: jest.fn(), // Mock the createUserWithEmailAndPassword function
    signInWithEmailAndPassword: jest.fn(), // Mock the signInWithEmailAndPassword function
    signOut: jest.fn(), // Mock the signOut function
    user: jest.fn(() => of(null)), // Mock the user observable, returning a null user by default
  };
});

describe('LoginService', () => {
  let service: LoginService;
  // let auth: jest.Mocked<Auth>;
  beforeEach(() => {
    // jest.resetModules();
    // Mock implementations for the AngularFire functions
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({} as UserCredential); // Mock the return value
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({ operationType: 'signIn', user: { email: 'test@test.com' } } as UserCredential);
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
        LoginService,
        { provide: Auth, useValue: {} }, // Provide an empty object as a mock Auth instance
      ],
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should successful login an user with email and password', async () => {
    const credentials = { email: 'test@test.com', password: 'Abcd1234*' };
    const response = await service.singIn(credentials);
    expect(response).toEqual({ operationType: 'signIn', user: { email: credentials.email } });
    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith({}, credentials.email, credentials.password);
    (signInWithEmailAndPassword as jest.Mock).mockClear(); // Clear the mock so the next test starts with fresh data
  });

  it('should fail user login with email and password', async () => {
    const credentials = { email: 'test@test.com', password: 'Abcd1234' };
    const mockError = new Error('Incorrect credentials.', { cause: `Error 400` });
    jest.mocked(signInWithEmailAndPassword).mockRejectedValue({ code: 'auth/invalid-credential' });
    try {
      await service.singIn(credentials)
    } catch (e) {
      expect(e).toEqual(mockError);
    }
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith({}, credentials.email, credentials.password);
    (signInWithEmailAndPassword as jest.Mock).mockClear();
  });
});
