export class Regexp {
  static readonly Lowercase = '(?=.*[a-z])';  // At least one lowercase letter
  static readonly Uppercase = '(?=.*[A-Z])';  // At least one uppercase letter
  static readonly Digit = '(?=.*\\d)';        // At least one digit
  static readonly SpecialChar = '(?=.*[@$!%?&])';  // At least one special character
  static readonly MinLength = '[A-Za-z\\d@$!%?&]{8,}';  // Minimum length of 8 characters

  static readonly PasswordStrength = new RegExp(
    Regexp.Lowercase +
    Regexp.Uppercase +
    Regexp.Digit +
    Regexp.SpecialChar +
    Regexp.MinLength
  );
}