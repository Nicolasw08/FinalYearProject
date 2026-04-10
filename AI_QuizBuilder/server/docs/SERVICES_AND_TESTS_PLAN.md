# Services Needed and Test Plan

## 1. RegisterUser use case
Purpose: validate input, prevent duplicate usernames, hash password, persist user.

### Sufficient tests
- should register a new user successfully
- should default role to `user`
- should reject duplicate usernames
- should reject missing username/password

## 2. LoginUser use case
Purpose: validate input, find user, compare password, return signed token.

### Sufficient tests
- should return token for valid credentials
- should reject missing user
- should reject invalid password
- should reject missing credentials

## 3. PasswordHasher service
Purpose: isolate hashing behavior.

### Recommended tests
- should hash a plain password
- should compare matching passwords correctly
- should reject non-matching passwords

## 4. TokenService
Purpose: sign and verify JWT payloads.

### Recommended tests
- should sign a token
- should verify a valid token
- should throw on invalid token

## 5. MongoUserRepository adapter
Purpose: isolate database access behind a repository interface.

### Recommended tests
- should find user by username
- should create a user
- should return null when user does not exist

## 6. AuthController
Purpose: convert use-case results/errors into HTTP responses.

### Sufficient tests
- register returns 201 on success
- login returns 200 on success
- application errors map to proper status codes
- unknown errors return 500

## 7. authMiddleware
Purpose: protect routes by validating bearer token.

### Sufficient tests
- valid bearer token calls next and attaches user
- missing token returns 401
- invalid token returns 401

## 8. Route integration tests
Purpose: verify wiring across router -> controller -> use case -> test dependencies.

### Sufficient tests
- register success
- register duplicate failure
- login success
- login invalid password failure
