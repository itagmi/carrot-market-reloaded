export const PASSWORD_MIN_LENGTH = 4;
// 최소 8자, 대문자, 소문자, 숫자, 특수 문자 포함
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
);
export const PASSWORD_REGEX_ERROR =
  "A password must have lowercase, UPPERCASE, a number and secial cahracters.";
