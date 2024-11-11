# Frank and Oak eCommerce Website Clone

This project is a clone of the **Frank and Oak** eCommerce website. It consists of three main parts:

1. **Website**: The frontend of the store, built with React and Next.js.
2. **Admin Panel**: A separate admin panel for managing products and users.
3. **API**: The backend API for handling product data, user authentication, and order management.

## Folder Structure

- **`frankandoak/`**: Contains the frontend code (React, Next.js) for the eCommerce website.
- **`frankandoak_adminpanel/`**: Contains the admin panel for managing users and products.
- **`frankandoaks API/`**: Contains the backend API (Node.js with Express) to serve product data and handle user authentication.

## Running the Project

To run the full project locally, you need to start the frontend, backend, and admin panel separately.

### 1. Running the Website

1. Navigate to the `frankandoak/` directory:

         cd frankandoak

3. Install dependencies:

         npm install 

         npm install @babel/preset-env @babel/preset-react @fortawesome/fontawesome-svg-core @fortawesome/free-brands-svg-icons @fortawesome/free-solid-svg-icons @fortawesome/react-               fontawesome @headlessui/react @heroicons/react @reduxjs/toolkit axios next razorpay react react-dom react-icons react-razorpay react-redux react-slick slick-carousel universal-           cookie eslint eslint-config-next postcss tailwindcss

4. Run the website:

          npm run dev

The website will be accessible at `http://localhost:3000`.




### 2. Running the Backend API

1. Navigate to the `frankandoaks API/` directory:

   `cd frankandoaks API`

2. Install dependencies:

    `npm install`

    `npm install axios react react-cookie react-dom react-router-dom react-toastify @eslint/js @types/react @types/react-dom @vitejs/plugin-react autoprefixer eslint eslint-plugin-react 
    eslint-plugin-react-hooks eslint-plugin-react-refresh globals postcss tailwindcss vite`

3. Run the backend API with nodemon:

   `nodemon`

The backend API will be running at `http://localhost:5000`.

### 3. Running the Admin Panel

1. Navigate to the `frankandoak_adminpanel/` directory:

   `cd frankandoak_adminpanel`

2. Install dependencies:

    `npm install`

   `npm install bcrypt cors express jsonwebtoken mongoose multer nodemailer razorpay react-cookie`

4. Run the admin panel:

    `npm run dev`

The admin panel will be accessible at `http://localhost:4000`.

In the admin panel, you can manage:

- **Users**: View and manage users of the eCommerce platform.
- **Products**: Add, edit, and remove products available for sale.

