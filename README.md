# JWT Signature Tampering Demo

A lightweight Node.js script demonstrating how JSON Web Tokens (JWT) use digital signatures to guarantee data integrity and prevent client-side privilege escalation. 

This educational simulation generates a valid token, verifies it, and then intentionally tampers with the payload (changing a user role from `user` to `admin`) to show how the server instantly detects the forgery.

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.

## Installation

1. Clone this repository or download the source code.
2. Open your terminal in the project directory.
3. Install the required `jsonwebtoken` dependency:

```bash
npm install jsonwebtoken