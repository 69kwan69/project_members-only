# Project: Members Only

This project is an assignment by TheOdinProject. For more information, please refer to [their curriculum](https://www.theodinproject.com/lessons/node-path-nodejs-members-only).

A small private room to chat! Join us, and you will get to meet new friends and possibly e-girl, too. This project is made with Express.js with Passport for authentication mechanism.

[Chat now]()

![](/screenshot.png)
_I've been postponed this project for too long_ - me.

## Installation

You'll find it out.

## ~~Rants~~ Features

This project includes a lots of middlewares that I've learned so far, to name a few:

- **Authentication:** I use [passport](https://www.npmjs.com/package/passport) as well with [express-session](https://www.npmjs.com/package/express-session) to work with authentication and validation mechanism. I've learned how session and cookie works which related to how the whole user authentication operates.

- **File upload:** It's really a headache to deal with this without 3rd party packages. Therefore I chose [multer](https://www.npmjs.com/package/multer) for handling multipart type of form data with [cloudinary](https://www.npmjs.com/package/cloudinary) for file upload storage.

- **Validation:** This is the real problem since I don't have experience with handling error like a professional. The validation part is mostly handled by [express-validator](https://www.npmjs.com/package/express-validator) but no, my main concern is how to display validation error user-friendly as well as how to deal with other unexpected error. Spoiler: I logged them all, with a few expected validation error (e.g. Wrong password) being handing by [connect-flash](https://www.npmjs.com/package/connect-flash). But then again, I need to learn how to handle error.

- **Database:** MongoDB, best choice for it's simplicity along with it's ORM [mongoose](https://www.npmjs.com/package/mongoose).
