# foRAg'r

<img src='https://user-images.githubusercontent.com/94110588/177002458-e6edbb95-16f0-4cef-9322-14e2bf2ffb47.png' width='100' alt='logo'/>

foRAg'r is a mobile app that helps users keep track of food items in their fridge. Features include parsing receipt, searching food by keywords and sending notifications when food is near expiry.

The app is best viewed on iPhone or Android devices.

> **Note: This is the frontend repo. The backend repo can be viewed [here](https://github.com/liztanyl/foRAgr-backend).**

## Walkthrough

### 1. User login

Informative login page with a preview of features available

<p float="left">
  <img src="./assets/forReadme/login_screen.gif?raw=true" alt='login screen gif' width="250" />
  <img src="./assets/forReadme/login_oauth.gif?raw=true" alt='login with OAuth gif' width="250" />
</p>

### 2. Home page

<p> An overview of food items present in user's fridge </p>
<img src='https://user-images.githubusercontent.com/94110588/177002812-e2f43a74-ba40-405e-b1eb-f54c7f95c49d.PNG' alt='home page' width='250'/>

### 3. Camera Mode

<p> User can choose to take photo of receipt/upload photo of receipt to automatically add food items to fridge  </p>
<p float="left">
  <img src="./assets/forReadme/ocr_camera.gif?raw=true" alt='OCR with camera gif' width="250" />
  <img src="./assets/forReadme/ocr_existing_photo.gif?raw=true" alt='OCR with existing image gif' width="250" />
</p>

### 4. Manual entry Mode

<p> Users can search food items by keywords  </p>
<img src='https://user-images.githubusercontent.com/94110588/177002942-5c12dd86-1e49-4dcc-a52a-b90cc7d6d5a9.jpeg' alt='manual entry image' width='250'/>

### 5. Review mode

<p> Users can search food items by keywords  </p>
<img src="./assets/forReadme/review_items.gif?raw=true" alt='review items gif' width="250" />

### 6. Notifcation

<p> When food is near expiry, native notifications will appear even when phone screen is locked </p>
<img src='https://user-images.githubusercontent.com/94110588/177003132-4b2f7b85-6bc6-4c9c-9cd5-2993eb88e7ee.PNG' alt='notification image' width='250'/>

## Built with

|                   | Tech                                                                 | Purpose                |
| ----------------- | -------------------------------------------------------------------- | ---------------------- |
| **Frontend**      | [React Native](https://github.com/facebook/react-native)             | User interface         |
|                   | [Expo](https://github.com/expo/expo)                                 | React Native framework |
|                   | [NativeBase](https://github.com/GeekyAnts/nativebase)                | Component library      |
|                   | [Lottie](https://github.com/lottie-react-native/lottie-react-native) | Animated loaders       |
| **Backend**       | [Node.js](https://github.com/nodejs/node)                            | Server                 |
|                   | [Express](https://github.com/expressjs/express)                      | Server                 |
|                   | [PostgreSQL](https://www.postgresql.org/)                            | Database               |
|                   | [Sequelize](https://sequelize.org/)                                  | Database               |
| **Functionality** | [JWT](https://jwt.io/)                                               | Authentication         |

## ERD

<img src='https://user-images.githubusercontent.com/94110588/177003298-c0c751c9-f7f7-4b34-a993-4d2f32c7f509.png' alt='library' width='500'/>

## Installation

> The backend is already hosted on Heroku and no setup is necessary. However, there are frontend environment variables that are not tracked in this repo. **Please contact the developers if you would like to run this project locally on your machine.** We will also require an email address that's tied to your Google Account in order to set up the OAuth Login for you.

**Requirements**

1. **npm:** `npm install npm@latest -g`
2. **Expo Go:** Install Expo Go on your mobile device from the App Store ('Expo') or Play Store ('Expo Go').

**To run the app**

1. Clone this repo
2. Install dependencies: `npm i`
3. The devs will share a secret file with you; save this to the main folder
4. Run the app: `expo start`
5. Scan the generated QR code with your phone to view the app on your mobile device

## Contributors

**Cheena Eng** | [GitHub](https://github.com/cheenaeng) • [LinkedIn](https://www.linkedin.com/in/cheena-eng-001/) • [Email](mailto:cheena94sing@gmail.com)

**Elizabeth Tan** | [GitHub](https://github.com/liztanyl/) • [LinkedIn](https://www.linkedin.com/in/elizabethtanyulin/) • [Email](mailto:elizabeth.tanyulin@gmail.com)

**Gerald Khor** | [GitHub](https://github.com/gcskhor/) • [LinkedIn](https://www.linkedin.com/in/gerald-khor/) • [Email](mailto:gcskhor@yahoo.com.sg)

**Tabithan Ho** | [GitHub](https://github.com/tabbiho) • [LinkedIn](https://www.linkedin.com/in/tabithan-ho-45a196226/) • [Email](mailto:tabbiho@gmail.com)
