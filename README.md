# Sprint 3.1: Front-end Mockup

### Project Details
- Team: msteiu & saji
- Repo Link: https://github.com/cs0320-f24/mock-saji-msteiu.git
- Reflection for Sprint 3.1 is attached in a separate PDF file.

# Design Choices
- The application is divided into multiple components such as Select, `SelectHistory`, and `SelectInput`. Each component has a specific responsibility, such as displaying a dropdown menu to choose the table(`SelectInput`), handling table display (`SelectHistory`), and managing the overall interface (`Select`).

- React's `useState` is used to manage the application's state. For instance, the history state in Select.tsx tracks the current dataset or output to be displayed. The state is passed down as props to child components (`SelectInput`, `SelectHistory`) for rendering specific parts of the interface based on user input. This allows the components to react dynamically to user actions without breaking the overall structure. 

- Accessibility has been integrated into the design through ARIA labels (`aria-label`) for key components like the dropdown and header. This improves usability for users relying on screen readers.

- User Authentication Management: The LoginButton component uses React's useState hook to manage the password input and authentication state. The isLoggedIn state is managed through the props (loginProps), where isLoggedIn determines whether the user is logged in or not, and setIsLoggedIn updates this state.
Password Check:
- - The login function checks the user input (password) against a predefined string "cs32". If the password matches, it toggles the isLoggedIn state to true, allowing the user to log in.
- - If the password is incorrect, it resets the input and updates the placeholder to indicate that the password was incorrect. This provides feedback to the user when the authentication fails.

- Conditional Rendering: The component conditionally renders different elements based on the login state. If the user is logged in (isLoggedIn is true), a "Sign Out" button is shown. If the user is not logged in, a password input field and "Login" button are displayed. This allows the interface to adapt to the user’s current authentication state without requiring a page reload or complex logic.

- User Feedback: When the login attempt fails, the placeholder text of the password input changes to "Incorrect Password !!", providing immediate feedback. This small touch enhances the user experience by letting them know why their login attempt failed.

# Errors/Bugs
- None so far.

# Tests
_These are the tests for interactvity_
`Initial Page Load`: Input Box Not Visible
This test verifies that on page load, the "Sign Out" button and the "dropdown" menu are not visible initially. This ensures the page is correctly hiding these elements until a successful login.
`Initial Page Load`: Login Button and Password Box Visible
This test checks that on page load, the "Login" button and the password input box are visible, allowing the user to attempt to log in.
`Login with Wrong Password`: No Authorization
In this test, when a user enters an incorrect password ("wrong"), the page does not authorize them, keeping the login button and password box visible. The "Sign Out" button and "dropdown" menu should remain hidden, indicating unsuccessful login.
`Login with Correct Password`: Login Button and Password Box Disappear
This test ensures that when the correct password ("cs32") is entered, the login button and password input box are no longer visible after login, indicating a successful login.
`Login with Correct Password`: Additional UI Elements Become Visible
After entering the correct password and successfully logging in, this test checks that the "Sign Out" button, the "retrieve table" button, and the "dropdown" menu become visible, confirming the login process.
`Retrieve Table Button`: Selected Table Data Displays
Once logged in, this test verifies that after selecting a table from the dropdown menu and clicking the "retrieve" button, the corresponding data for the selected table is displayed in the output area. It also tests different scenarios, such as selecting non-existent tables and resetting the dropdown to default values.
`Dataset Selection`: Last Selected Dataset is Displayed
This test ensures that if multiple datasets are selected in sequence, the one selected just before pressing the "retrieve" button is displayed, confirming that the latest selection is used to retrieve data.
_for unit testing:_
There's only one method that tests `getTable()` on its ability to get the correct datasets when asked.

# How to
- RUN web page: cd to mock then type "npm start" in your terminal. Afterwards, proceed to the link generated and open it in oyur preferred browser.
- RUN testing: run the command "npm test" in your terminal.

# Collaboration
- OpenAI. (2024). ChatGPT (May 24 version) [Large language model]
- Note:
    - Brainstorm additional niche tests.
    - Understand parts of the live code and gear up that were not clear for us.
    - Learn how to do some frontend functionalities.
- Tim's live code & Gear up code -> Used to structure our project and Testing.
