/**
 * Regular expression pattern to match a Bearer token in an Authorization header.
 * Matches the format "Bearer <JWT-token>" where JWT-token is a properly formatted JWT.
 *
 * Explanation:
 * - `^`: Asserts the start of the string.
 * - `Bearer`: Matches the literal string 'Bearer', ensuring that the token starts with 'Bearer '.
 * - `\s+`: Matches one or more whitespace characters, ensuring that there is at least one space after 'Bearer'.
 * - `[A-Za-z0-9-_]+`: Matches one or more alphanumeric characters, hyphens, or underscores. This part of the regex matches the first part of the JWT token (the header), which consists of base64url-encoded characters.
 * - `\.`: Matches a literal dot, separating the different parts of the JWT token.
 * - `[A-Za-z0-9-_]+`: Matches another set of one or more alphanumeric characters, hyphens, or underscores. This part of the regex matches the second part of the JWT token (the payload), which also consists of base64url-encoded characters.
 * - `\.`: Matches another literal dot, separating the second part of the JWT token from the third part.
 * - `[A-Za-z0-9-_.+/=]+`: Matches the third part of the JWT token (the signature), which is base64url-encoded and may contain alphanumeric characters, hyphens, underscores, dots, slashes, or equal signs. This part of the regex ensures that the signature is properly formatted.
 * - `$`: Asserts the end of the string.
 *
 * @type {RegExp}
 */

export const JWT_HEADER_BEARER_REGEX =
  /^Bearer\s+[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]+$/;

/**
 * Regular expression to validate the format of a password string.
 *
 * This regular expression ensures that the password:
 * - Contains at least one digit or special character.
 * - Does not contain periods or newline characters.
 * - Contains at least one uppercase letter.
 * - Contains at least one lowercase letter.
 *
 * @type {RegExp}
 */
export const PASSWORD_REGEX =
  /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
