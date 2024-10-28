Sure! Here’s the updated README with the project structure reflecting a Vite setup for a React application:

# Fundraising Portal - Frontend

Welcome to the Fundraising Portal frontend repository! This application allows users to raise funds for social causes and donate to existing campaigns. It is built using the MERN stack and provides a user-friendly interface for all fundraising activities.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Contributing](#contributing)

## Features
- **User Authentication:** Secure login and registration using JWT tokens.
- **Fundraising:** Users can create new fundraising campaigns.
- **Donations:** Users can browse and donate to existing campaigns.
- **Transaction History:** Both donors and fundraisers can view their transaction history.
- **Sharing Capabilities:** Easily share fund details via WhatsApp.

## Technologies Used
- React.js
- Vite
- Axios
- JWT for Authentication
- Bootstrap (or Material-UI for styling)

## Getting Started

To run the frontend application locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Manish-Nailwal/FundRaising-Portal.git
   ```

2. **Navigate to the frontend directory:**
   ```bash
   cd FundRaising-Portal/frontend
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the application:**
   ```bash
   npm run dev
   ```

5. **Open your browser and navigate to:**
   ```
   http://localhost:5173
   ```

## Project Structure
```
FundRaising-Portal/
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── public/
    ├── src/
    │   ├── landingPage/
    │   │   ├── Auth/
    │   │   ├── DashBoard/
    │   │   ├── NewFundRaise/
    │   │   ├── Transactions/
    │   │   ├── NavBar.jsx
    │   ├── NotFound.jsx
    │   └── main.jsx
```

## Usage
- Create an account or log in to your existing account.
- Browse the available campaigns or create your own.
- Donate to your chosen campaigns and track your donations in your account history.

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue if you encounter any bugs or have suggestions for improvements.


---

Thank you for checking out the Fundraising Portal frontend! Together, let's make a positive impact on our communities. 💙
