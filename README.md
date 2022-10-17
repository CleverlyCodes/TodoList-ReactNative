# HOMEMAKER - GROCERY LIST

## About The Project
Implemented this project as a simple grocery list from a job application exam that I took. Whenever I write code I always try to apply it in my real world situation and as much as possible become the first user. For this project I thought it would be fun to start creating my own grocery list for the HomeMaker project (A series of tools I'm creating to automate tasks in our home)

Here's why:
* Grocery items can make up the basic building block of a home economics system
* We can use grocery item data to come up with recipes and a standing inventory of supplies
* Easier to walk through the grocery with a mobile application to keep track of items

This project was just started so there's still a long way to go but I plan to implement the priority items soon such as connecting to a firebase store and connecting to my homemaker system.


### Requirements
* A secured todo list using a bare React Native project and Expo local-authentication module
* The application MUST ask for user authentication before the user can perform CRUD functions
* Clean and Robust state management
* Implement basic unit tests
* Well documented code using comments, etc..

### Decisions Made
* Skipping the use of Redux as there will be no complicated state tracking for now
* Different screens were made for authentication and the  main task list to switch between the two based on authentication state
* Use Animated flatlist to make the experience more fun for users
* Implemented basic unit tests that focus on the list capabilities (adding, deleting, etc...)

### Installation

To start running the project locally

1. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run the application using Expo
   ```sh
   npm start
   ```

<!-- ROADMAP -->
## Roadmap

- [x] Create Grocery List
    - [x] Adding items
    - [x] Deleting items
    - [x] Update items to done
    - [ ] Editing items
- [x] Local Authentication
    - [x] Implement basic authentication
    - [ ] Add maximum tries
    - [ ] Connect to HomeMaker web app
- [ ] Persistence
    - [ ] Add firebase persistence
    - [ ] Add local storage capabilities
- [ ] User Experience
    - [ ] Swiping action to mark as done
- [x] Development/Tooling
    - [x] Add tests with Jest
    - [x] Add linter with eslint
    - [x] Add tests to CI
    - [x] Add linter to CI