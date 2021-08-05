 ## Citi HackOverflow 2021 - QR Code Application
 
 `npm install` to install dependencies
 
 
 `npm start` to launch the application on your `https://localhost:3000`
 
 
 ### Users and Use Cases, Features
 - Customers
    - can create and log in to their own account
    - can view their purchased, non-expired vouchers
    - can purchase new vouchers using loyalty points
    - can generate QR code for cashier to scan
 - Cashiers
    - voucher validation: can scan QR code to check if QR code is a valid voucher
    - can apply voucher to current transaction
    - can redeem and mark voucher as "redeemed"

## Note
- `https` is required due to the camera feature used to scan the QR code


## Libraries used
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) used to hash passwords
- [uuid](https://www.npmjs.com/package/uuid) used to generate unique customer IDs
- [react-qr-reader](https://www.npmjs.com/package/react-qr-reader) and [qrcode.react](https://www.npmjs.com/package/qrcode.react) used for QR code scanning and generation
- [Material-UI](https://material-ui.com/) for some components (e.g. side navigation bar)
- [react-lottie](https://www.npmjs.com/package/react-lottie) for transaction animation
- [react-bootstrap](https://react-bootstrap.github.io/) used for styling
