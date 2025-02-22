# React Movies App

This project is a web application that allows users to search for movies and view their details. It is built using **React** and **Vite**, with **Appwrite** as the backend for data storage.

## Features

- **Movie Search**: Users can search for movies by title.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool and development server for modern web projects.
- **Appwrite**: A self-hosted backend-as-a-service (BaaS) for authentication, database, and storage.
- **JavaScript**: The primary programming language used.
- **Tailwind v4**: For styling the application.

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/AIDK/react-movies-app.git
   cd react-movies-app
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Appwrite Backend**:

   - Create an **Appwrite** project at [appwrite.io](https://appwrite.io/).
   - Configure authentication, database, and storage for managing movie-related data.
   - Set up API keys and update the `.env` file with your **Appwrite** credentials.

4. **Start the Development Server**:

   ```bash
   npm run dev
   ```

   This will start the Vite development server. Open your browser and navigate to the provided local address to view the application.

## Project Structure

The project's structure is organized as follows:

- `public/`: Contains static assets such as images and icons.
- `src/`: Houses the main application source code, including components and styles.
- `services/`: Appwrite service configuration for authentication and database interactions.
- `index.html`: The main HTML file.
- `package.json`: Contains project metadata and dependencies.
- `vite.config.js`: Configuration file for Vite.

## Contributing

Contributions are welcome! If you'd like to enhance this project, please fork the repository, create a new branch, and submit a pull request. Ensure that your code adheres to the project's coding standards and includes relevant tests.

## License

This project is licensed under the MIT License.
