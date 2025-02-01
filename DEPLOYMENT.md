# Deployment Instructions for Teams 3CX App

This document provides the necessary steps and configuration details to deploy and package the Teams 3CX App.

## 1. Microsoft Teams App Package

The app package must include the following items in the root folder of the ZIP file:

- **manifest.json**  
  Located in the [teams-app-package](teams-app-package/manifest.json) folder.  
  This file contains the app manifest, detailing your app's configuration, capabilities, and metadata. Ensure you update the URLs, app id, and other details to reflect your production environment.

- **App Icons**  
  Place your icons in the same folder as the manifest:
  - **color.png**: 192x192 pixels PNG file.
  - **outline.png**: 32x32 pixels PNG file.

**Packaging Steps:**

1. Create a folder (e.g., `teams-app-package`) and include:
   - `manifest.json`
   - `color.png`
   - `outline.png`
2. Zip the contents of the folder (do not include the folder itself). The ZIP file's root should contain the above files.

## 2. Process Management with PM2

An ecosystem file is provided for managing the backend server with PM2 in a production environment.

**File:** [ecosystem.config.js](ecosystem.config.js)

This configuration runs the backend server (`./backend/index.js`) in cluster mode for optimal performance. To start the server in production, use:

```bash
pm2 start ecosystem.config.js
```

## 3. CI/CD Pipeline (Azure Pipelines)

The project includes an Azure Pipelines configuration file for continuous integration.

**File:** [azure-pipelines.yml](azure-pipelines.yml)

This file triggers on pushes to the 'main' branch, installs Node.js, installs project dependencies, and runs tests. Ensure your project environment and tests pass before deployment.

## 4. Additional Configuration

- **Backend Configuration:**  
  Verify and update [config/config.json](config/config.json) if necessary, particularly ensuring that 3CX configurations and other environmental settings are correct for production.

- **Frontend Configuration:**  
  Ensure that your frontend (e.g., `frontend/teamsApp.jsx`) is pointing to the correct hosted URLs and that any API endpoints match your production settings.

## 5. Deployment Steps

1. **Package Your Teams App:**

   - Prepare your app package as described in section 1.
   - Upload the ZIP file via Microsoft Teams client under Apps > Manage your apps > Upload a custom app.

2. **Deploy the Backend:**

   - Deploy your backend to an HTTPS-enabled host (e.g., Azure).
   - Start your backend using PM2:
     ```bash
     pm2 start ecosystem.config.js
     ```

3. **CI/CD Integration:**

   - Verify that your Azure Pipelines configuration builds successfully by checking that the build process installs dependencies and runs tests without errors.

4. **Testing & Final Approval:**
   - Test your app in Microsoft Teams, review logs from your process manager (PM2), and confirm:
     - HTTPS accessibility.
     - Correct configuration of hosted URLs.
     - Successful integration of authentication and API endpoints.

Following these instructions and confirming your settings in each configuration file will ensure that your Teams 3CX App is production-ready.

License: MIT License

Contributions, issues, or feature requests can be addressed via the project repository.
