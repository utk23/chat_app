## Customer Support Web Application

This is a web application that allows users to receive customer support in the form of real time conversations. The backend service created using Node.js and Express, and the frontend is created using React.js. The backend service is connected to a MongoDB database hosted on MongoDB Atlas. The frontend is connected to the backend service using Axios library for making HTTP requests.

## Pre-requisites

- Node.js
- NPM
- Git
- MongoDB Atlas account

## Installation

1. Clone the repository
2. Open the root directory in your terminal and run `npm install`.
3. Navigate to the `frontend` directory and run `npm install`.

## env configuration

NODE_ENV='environment'
JWT_SECRET='your_secret'
PORT=5000
MONGO_URI=your_mongo_uri

## Usage

> npm start

## Tasks completed

- Multiple agents can log in and repond to a single complaint.
- Authentication added in order to segregate the agents and customers(wasn't possible otherwise).
- Send and receive messages using an API endpoint.
- Older messages can be accessed by the agent associated with the complaint.
- Application can be hosted on platforms like Heroku, AWS, Render, etc.

## Additional features added

- Real time chat using Socket.io
- Search users on the basis of id, name and email.
- Most recent messages will appear on top of the list.
- Session based authentication using JWT.
- Notifications for new messages.
- Responsive UI.

Screenshots [here](/assets).
