# Seafarer Medical Form Automation

This MERN application addresses the redundant task of filling multiple medical forms for seafarers by identifying and populating common fields across different forms, thus saving time and effort. Authentication is handled through Firebase.

## Features

- **Form Selection**: Users can select which forms they need to fill based on their route.
- **Field Identification**: The application finds common and specific fields across the selected forms.
- **Automated Filling**: Prompts the user to fill the fields once, and then populates the information across all selected forms.
- **Downloadable Forms**: Users can download all the completed forms together.
- **Authentication**: Secure login and registration using Firebase.

## Getting Started

### Prerequisites

- React.ks
- Node.js
- MongoDB
- Express.js
- Firebase account

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/seafarer-medical-form-automation.git
   cd seafarer-medical-form-automation
   ```

2. Install server-side dependencies:

   ```bash
   cd server
   npm install
   ```

3. Install client-side dependencies:

   ```bash
   cd ../client
   npm install
   ```

4. Set up environment variables:

   Create a `.env` file in the `server` directory and add your MongoDB connection string and Firebase configuration.

   ```env
   MONGO_URI=your_mongodb_connection_string
   FIREBASE_API_KEY=your_firebase_api_key
   FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   FIREBASE_PROJECT_ID=your_firebase_project_id
   FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   FIREBASE_APP_ID=your_firebase_app_id
   ```

5. Start the application:

   ```bash
   cd ../server
   npm start
   ```

   In another terminal window, start the client:

   ```bash
   cd ../client
   npm start
   ```

6. Open your browser and go to `http://localhost:3000` to interact with the application.

## Usage

1. **Register/Login**: Users must create an account or log in using their credentials.
2. **Select Forms**: Choose the forms that need to be filled.
3. **Fill Fields**: Enter the required information once; the application will populate it across all selected forms.
4. **Download Forms**: Download the completed forms as a single package.

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Thanks to the open-source community for providing the tools and libraries that made this project possible.
- Special thanks to the seafarers and medical professionals who inspired this solution.

---

Feel free to adjust the content to better fit your project specifics.
