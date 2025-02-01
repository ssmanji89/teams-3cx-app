# Teams 3CX Production Integration Solution

This repository contains a production-ready Microsoft Teams integration solution that connects Microsoft Teams to an existing 3CX PBX Phone System. Teams users can make and receive calls using configured phone lines, SIP trunks, and call-routing rules in 3CX. The solution synchronizes Microsoft 365 user information with 3CX so that user extensions are automatically created or updated.

This repository is designed for Microsoft 365 Administrators and IT professionals to fork, customize, build, and deploy the application to Microsoft Teams in production environments.

---

## Table of Contents

- [Features](#features)
- [Architecture & Components](#architecture--components)
- [Setup & Configuration](#setup--configuration)
- [Development & Build Instructions](#development--build-instructions)
- [Deploying & Packaging for Microsoft Teams](#deploying--packaging-for-microsoft-teams)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Features

- **User Sign-In**: Microsoft 365 (OAuth) authentication (currently simulated) for Teams users.
- **Telephony Integration**: Initiate, receive, and control calls (hold, transfer, voicemail) via the 3CX system.
- **Dashboard & Call Logging**: View call logs and dashboard information.
- **Configurable 3CX Connection**: Easily update 3CX server address, port, and credentials via a configuration file.
- **Modular & Production-Grade Code**: Clear separation between backend (Node.js/Express) and frontend (React) components.
- **Unit Testing**: Automated tests using Jest and Supertest ensure core functionalities work as expected.
- **Help & Troubleshooting Guidance**: In-app native language troubleshooting tips integrated into the user interface.

---

## Architecture & Components

- **Backend**: A Node.js/Express server that simulates 3CX API endpoints including user extension lookup, call initiation, status retrieval, and call control actions.
- **Frontend**: A React-based Microsoft Teams application providing sign-in, extension display, and call initiation capabilities.
- **Configuration**: A JSON configuration file (`config/config.json`) that holds the 3CX connection parameters.
- **Unit Tests**: Located in the `test/` directory to ensure API endpoints function correctly.

---

## Setup & Configuration

1. **Fork the Repository**:  
   Fork this repository into your organization's GitHub account for customization and deployment.

2. **Clone the Forked Repository**:

   ```bash
   git clone https://github.com/your-org/teams-3cx-app.git
   cd teams-3cx-app
   ```

3. **Install Dependencies**:  
   Install both production and development dependencies using Node Package Manager.

   ```bash
   npm install
   ```

4. **Configure 3CX Settings**:  
   Update the `config/config.json` file with your 3CX server details. For example:
   ```json
   {
     "serverAddress": "http://your-3cx-server-address",
     "port": 3001,
     "credentials": {
       "username": "admin",
       "password": "your-secure-password"
     }
   }
   ```

---

## Development & Build Instructions

### Backend

- **Start Backend Server (Development)**:

  ```bash
  npm run start-backend
  ```

  This will start the Express server on the port specified in `config/config.json` (default port 3001).

- **Build for Production**:  
  Although the backend is written in plain Node.js, it is recommended to use a process manager like PM2 for production deployments:
  ```bash
  npm install -g pm2
  pm2 start backend/index.js --name "teams-3cx-backend"
  ```

### Frontend

- **Start Frontend Server (Development)**:  
  Navigate to the `frontend` directory and start the development server.

  ```bash
  cd frontend && npm install && npm start
  ```

  This will launch the React development server.

- **Compile for Production**:  
  Use a bundler or the built-in build script (if using Create React App) to generate a production build:
  ```bash
  cd frontend
  npm run build
  ```
  The optimized production-ready assets will be generated in the `frontend/build` folder.

---

## Deploying & Packaging for Microsoft Teams

Microsoft Teams does not host your application; instead, Teams uses an app package that contains a manifest and icons to configure your app. The app’s logic is hosted externally (e.g., via your backend server on Azure or another HTTPS-enabled host).

### App Packaging

Your Teams app package must include:

- **App Manifest** (`manifest.json`):  
  A JSON file that describes your app's configuration, capabilities, required resources, and metadata. The manifest should reference your hosted URLs (for both frontend and backend), define valid domains, and list any tabs, bots, or messaging extensions your app uses.
- **App Icons**:
  - **Color Icon**: A 192x192 pixels PNG file used in most Teams scenarios.
  - **Outline Icon**: A 32x32 pixels PNG file (white with transparent background or vice versa) used in pinned app scenarios.

#### Creating the App Package

1. **Prepare the Manifest and Icons**:  
   Create a folder (e.g., `teams-app-package`) and place the following files in it:

   - `manifest.json` (customize based on your requirements; refer to [Teams App Manifest documentation](https://docs.microsoft.com/en-us/microsoftteams/platform/resources/schema/manifest-schema))
   - Your color icon (e.g., `color.png`, 192x192)
   - Your outline icon (e.g., `outline.png`, 32x32)

2. **Zip the Package**:  
   Zip the contents of the folder (do not include the folder itself) so that the ZIP file contains `manifest.json`, `color.png`, and `outline.png` at its root.

### Uploading Your App to Teams

1. **Open Microsoft Teams Client**:  
   Log in with your Microsoft 365 account configured for app development.

2. **Upload Custom App**:

   - In Teams, navigate to **Apps** > **Manage your apps**.
   - Select **Upload a custom app** and choose the appropriate scope (e.g., for a team, chat, or personal use).
   - Select your app package ZIP file and confirm the upload.

3. **Testing & Approval**:  
   After uploading, test the functionalities across the Teams client. If any configurations change (e.g., updating the manifest), repackage and re-upload the app.

4. **Organization-wide Deployment**:  
   Once validated, your Microsoft 365 Administrator can deploy the app organization-wide via the Teams Admin Center.

---

## Testing

Unit tests are written using Jest and Supertest. To run the tests:

```bash
npm test
```

Integrate these tests into your CI/CD pipeline as part of your production workflow.

---

## Troubleshooting

- **API Connection Issues**: Verify that your 3CX configuration in `config/config.json` is correct and that your backend server is accessible over HTTPS.
- **Authentication Issues**: For production, replace the simulated Microsoft 365 sign-in with a full OAuth integration.
- **Deployment Errors**: Check logs from your process manager (e.g., PM2) and review Teams client logs if your app package fails to load.

---

## License

This project is licensed under the MIT License.

---

## Additional Notes

- This solution is built for extensibility and can be enhanced with full Microsoft 365 OAuth authentication, advanced call analytics, and additional telephony features.
- Contributions, issues, and feature requests are welcome to further improve this integration solution.
