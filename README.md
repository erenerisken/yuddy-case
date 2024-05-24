# Yuddy Case Interview React Project

This React project was created as part of a case interview for Yuddy. The project is designed to demonstrate the ability
to build and run a React application, utilizing a mock server to simulate API interactions.

## Prerequisites

Ensure you have the following installed on your machine:

- **Node.js**: v20.13.1
- **Yarn**: v1.22.22

## Getting Started

Follow these steps to set up and run the project locally.

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/erenerisken/yuddy-case.git
cd yuddy-case
```

### 2. Create a .env File

Create a `.env` file in the root directory of the project with the following content:

```
REACT_APP_API_URL=http://localhost:8080
```

This environment variable points to the mock server's API URL.

### 3. Install Dependencies

Install the project dependencies using Yarn:

```bash
yarn install
```

### 4. Start the Mock Server

Run the mock server using the following command:

```bash
npx json-server src/fixtures/db.json -p 8080
```

This command starts a JSON server that serves data from `src/fixtures/db.json` on port 8080.

### 5. Run the Application

Start the React application with:

```bash
yarn start
```

The app will be available at `http://localhost:3000`.

## Additional Information

- The mock server is used to simulate API responses and serves as the backend for the application.
- The `REACT_APP_API_URL` environment variable can be adjusted to point to a different API endpoint if necessary.

## Project Structure

- `src/`: Contains the source code of the React application.
- `src/fixtures/`: Contains the mock data used by the JSON server.

## Troubleshooting

- Ensure all dependencies are installed correctly.
- Verify that the `.env` file is correctly configured.
- Make sure the mock server is running before starting the React application.

## License

This project is licensed under the MIT License.

---

For any questions or issues, please contact erenerisken@gmail.com.

---

Thank you for reviewing this project for the Yuddy case interview!
