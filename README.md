# Easy Pay - Mobile Financial Services (MFS)

Easy Pay is a mobile financial services platform that allows users, agents, and admins to manage money transfers, account management, and transactions. This application is built to facilitate various financial transactions in a simple and secure manner.

## Roles and Permissions

There are three main roles in the system:

### 1. Admin
- Add money to users' accounts.
- Approve or reject agent accounts.
- Approve requests from agents for money transfer.
- Block users or agents from accessing the platform.

### 2. Agent
- Cash-in money to users' accounts.
- Request money from the admin.

### 3. User
- Send money to another user.
- Cash-out money to agents.

## Live Demo

You can check out the live version of the project by visiting the following link:

[Live Demo](https://easy-pay-mfs.vercel.app/)

## GitHub Repositories

- **Client-side Repository**: [EasyPay Client](http://github.com/Sadiqur057/EasyPay)
- **Server-side Repository**: [EasyPay Server](https://github.com/Sadiqur057/Easy-pay-server)

## Credentials

Use the following credentials to test the platform:

- **Admin**:
  - Phone Number: `01760521688`
  - Password: `12345`

- **Agent**:
  - Phone Number: `01821491140`
  - Password: `12345`

- **User**:
  - Phone Number: `01560067312`
  - Password: `12345`

## Features

### Admin Features
- Add money to user accounts.
- Approve or block agents.
- Manage requests from agents for money transfers.

### Agent Features
- Cash-in money to users' accounts.
- Request money from the admin.

### User Features
- Send money to other users.
- Cash-out to an agent.

## Skills Used

This project uses the following technologies and tools:

- **React.js** - Frontend framework to build the user interface.
- **Express.js** - Backend framework to handle HTTP requests and serve the API.
- **Mongoose** - ODM (Object Data Modeling) library for MongoDB to manage database operations.
- **MongoDB** - NoSQL database used to store and manage data.
- **Tailwind CSS** - Utility-first CSS framework for styling the frontend.
- **Axios** - HTTP client for making API requests.
- **JWT (JSON Web Tokens)** - For secure user authentication.

## Installation

To run the project locally, follow the steps below:

### Prerequisites
- Node.js
- MongoDB
- NPM or Yarn

### Client-side Setup
1. Clone the client-side repository:
    ```bash
    git clone http://github.com/Sadiqur057/EasyPay
    ```
2. Navigate to the project directory:
    ```bash
    cd EasyPay
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the development server:
    ```bash
    npm run dev
    ```
5. Open your browser and go to [http://localhost:3000](http://localhost:3000).

### Server-side Setup
1. Clone the server-side repository:
    ```bash
    git clone http://github.com/Sadiqur057/EasyPay-server
    ```
2. Navigate to the project directory:
    ```bash
    cd EasyPay-server
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Configure environment variables (e.g., database connection string, API keys).
5. Start the server:
    ```bash
    npm start
    ```

## Contributing

We welcome contributions to the Easy Pay project! To contribute:

1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them.
4. Open a pull request.


