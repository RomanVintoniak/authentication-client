export interface User {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  isEmailConfirmed: boolean,
  twoFactorAuthSecret: string,
  passwordResetToken: string,
  passwordResetTokenExpires: Date
}