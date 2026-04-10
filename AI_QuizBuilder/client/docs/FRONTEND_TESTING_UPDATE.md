# Frontend Jest / React Testing Library Update

## Step 10 - Added explicit frontend services
To match the requested architecture more closely and make frontend testing cleaner, I introduced:
- `src/services/authService.js`
- `src/services/quizService.js`

These isolate HTTP calls from UI components.

## Step 11 - Refactored components to use services
Updated components:
- `src/components/Login.js`
- `src/components/Signup.js`
- `src/components/QuizTaker.jsx`

This makes the components easier to unit/integration test and matches a cleaner adapter/service flow.

## Step 12 - Added frontend unit tests for services
Created:
- `src/tests/unit/authService.test.js`
- `src/tests/unit/quizService.test.js`

These validate endpoint paths, payloads, defaults, and error handling.

## Step 13 - Added frontend integration tests for key user flows
Created:
- `src/tests/integration/Login.test.js`
- `src/tests/integration/Signup.test.js`
- `src/tests/integration/QuizTaker.test.js`

These verify form interaction, alerts, navigation behavior, localStorage, and quiz submission flow.

## Step 14 - Fixed the default CRA test
Updated `src/App.test.js` so it matches the actual app behavior instead of the default Learn React placeholder.

## Step 15 - Added client test scripts
Updated `client/package.json` scripts:
- `npm test`
- `npm run test:unit`
- `npm run test:integration`

## Step 16 - Final verification
- Frontend tests were added in correct locations.
- Service extraction reduced component coupling.
- The project is ready for local execution of the client test suite.
