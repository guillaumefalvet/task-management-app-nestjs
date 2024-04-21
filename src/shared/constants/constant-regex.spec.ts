import { JWT_HEADER_BEARER_REGEX } from './constant-regex';

describe('Constant Regex', () => {
  describe('JWT_HEADER_BEARER_REGEX', () => {
    it('should match valid JWT header with Bearer token', () => {
      const validToken =
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      expect(JWT_HEADER_BEARER_REGEX.test(validToken)).toBe(true);
    });

    it('should not match invalid JWT header without Bearer token', () => {
      const invalidToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      expect(JWT_HEADER_BEARER_REGEX.test(invalidToken)).toBe(false);
    });

    it('should not match invalid JWT header with incorrect format', () => {
      const invalidToken =
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ';
      expect(JWT_HEADER_BEARER_REGEX.test(invalidToken)).toBe(false);
    });
  });
});
