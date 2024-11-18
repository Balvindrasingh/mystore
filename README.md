Clothing Store Project Tracker
Overview
This application gives users an avenue to manage their projects in a clothing store, track the items they are selling, and manage their accounts both locally and with GitHub authentication.

Features
User Authentication: User can create an account, sign in and sign out using his credential or via GitHub OAuth.
Project Management: A user should be able to create, view, and delete clothing items from his store.
Authorization: There is an authorization for the CRUD operations; no one can alter details of a project if he is not an authenticated user.
GitHub Authentication: Users can log in via GitHub. This will make their login easier and seamless.
Installation
Prerequisites
Node.js (>=v14)
MongoDB - either local or MongoDB Atlas
GitHub Developer Account - Only for implementing GitHub OAuth
Clone Repository
bash
Copy code
git clone https://github.com/balvindra/clothing-store.git
cd clothing-store
Install Packages
Install all the required npm packages:

mode:

bash
Copy code
npm start
The application will be available at http://localhost:3000.

Project Structure
Routes
Routes/Project.js: It handles all the CRUD-related operations in regards to the clothing items within the store. It first checks whether the user is logged in before it allows any modification actions.
Routes/Courses.js: This would be renamed to something like "Routes/ClothingItems.js", to reflect the context of a clothing store. This protects the access to CRUD actions on the clothing items - making sure users can only add or edit clothing items if they are authenticated.
Routes/Index.js: This handles the users logging in and out, and routes the authentication via GitHub.
Views
Views/Login.hbs: The login page for local and GitHub authentication.
Views/Projects/Index.hbs: The list of clothing items, with buttons hidden based on user authentication status.
Views/Courses/Index.hbs: Lists the available courses; for a clothing store, this would be categories of clothing. It should display CRUD options only if a user is authenticated.
Views/Shared/Layout.hbs: This is the global layout template. Here, the navigation bar would change dynamically depending on whether a user is authenticated.
Models
Models/User.js: For storing information about the users, including OAuth credentials 
Models/Project.js: Clothing item or store project to be persisted. This will hold details like name, status, and created timestamp.
Middleware
app/custom middleware : Check if user is authenticated before allowing them to access routes to create or edit items. Middleware/Authentication.js: Reusable middleware for checking authentication of users; applied to routes which require login. GitHub OAuth The application allows the ability to log in with GitHub and OAuth. After creating a GitHub OAuth application, the users are able to log into their accounts using their GitHub account. The involved endpoints are listed below:

/github - Redirects users on GitHub to authenticate.
/github/callback - Callback from GitHub after user has logged in.
How the Application Works
Login/Sign-up: Upon entering into an app, users can log in using credentials or register by using their GitHub account. The application will be able to log in using Passport.js local and GitHub OAuth.

Project Management: An authenticated user is allowed to manage his clothing items: creating new ones, updating the details, or deleting items from his store.

Authorization: A user not logged in cannot make certain actions like create or edit any item of clothing. The system will be making use of a middleware that allows only an authenticated user to have access routes for adding new items in clothing.

GitHub Authentication: Another authentication method integrated into the app is GitHub OAuth login. The user can log in through GitHub, where credentials would be saved in the database for fast login procedures.

Testing of the Application
1. Login Page:
The application's /login path can be used to test the login feature. When a user is logged in through GitHub, the "Login with GitHub" button is visible on the login page.
2. CRUD Operations:
Ensure that users can only perform CRUD when authenticated. Test the Hide/Show of buttons and links - for example, "Add Item" - depending on a user's logged-in state.
3. GitHub Authentication:
Confirm that logging in via GitHub works by clicking "Login with GitHub" on the login page.
4. Logout:
Confirm working logout by visiting the /logout route.
Future Improvements
Error Handling: Provide better error handling in case a GitHub login fails or there is an attempt to access an unauthorized resource.
User Profiles: It provides user profiles for users to review and change their information.
 Styling: Implement some custom CSS to enhance UI design and also provide better UX.
