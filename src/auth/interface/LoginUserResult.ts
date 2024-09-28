export interface LoginUserResult {
  ok: boolean;
  token: string;
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
  errorCode: string | null;
  errorMessage: string | null;
}
