## OnePay Wallet

 OnePay Wallet is a full-stack MERN (MongoDB, Express, React, Node.js) application designed for seamless money transfers between users. This application ensures secure transactions with JWT-based authentication and emphasizes important properties such as atomicity and consistency.

## Features
* User Authentication: Secure login and registration using JSON Web Tokens (JWT).
* Money Transfers: Users can send money to friends with ease.
* Transaction Management: Ensures atomicity and consistency in all transactions.
* User Dashboard: View account balance and transaction history.

## Installation
* Clone the repository:

```bash
git clone https://github.com/mauryavinay1407/OnePay-wallet.git
cd OnePay-wallet
```

* Install server dependencies:
```bash
cd server
npm install
```

* Install client dependencies:
```bash
cd ..
cd client
npm install
```

* Configure environment variables:

Create a .env file in the root directory and define the variables:

* Start the server:

```bash
cd server
npm start
```

* Start the client:

```bash
cd ..
cd client
npm run dev
```