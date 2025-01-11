# School Payment Dashboard application React

This repository contains the backend code for the School Payment and Dashboard Application.


This is a basic React application setup that uses **Context API** for state management and **React Router** for routing. It also integrates with `StrictMode` to highlight potential issues in the application during development.

## Key Features

- **Strict Mode**:  
  - `StrictMode` is enabled to help identify potential problems in the app by intentionally double-invoking certain lifecycle methods and functions.
  
- **React Router**:  
  - The app uses `BrowserRouter` from `react-router-dom` to handle routing. This allows navigating between different pages within the app.
  
- **Context API**:  
  - The app uses a custom `ContextProvider` to manage global state. The `dashboardContext.jsx` file wraps the entire app with a context to provide global state and functions to all components.

# React App with Routing and Protected Routes

This React application includes various pages such as **Signup**, **Login**, **Dashboard**, **Transaction Details**, and **Transaction Status**. The app utilizes **React Router** for navigation and **Protected Routes** to ensure only authenticated users can access certain pages.

## Key Features

- **React Router**:  
  - The app uses `Routes` and `Route` components from `react-router-dom` for managing routing between different components like Signup, Login, Dashboard, etc.

- **Protected Routes**:  
  - The app implements `ProtectedRoute` to restrict access to certain pages (Dashboard, Transaction Details, and Transaction Status) to authenticated users only.
  - If a user is not authenticated, they will be redirected to the Login page.


# 1. Signup Component

The `Signup` component provides the user interface for signing up a new user. It allows users to input their username, email, and password, and then submit this information to create a new account. If the submission is successful, the user is redirected to the login page. If there are any issues with the submission, an error message is displayed.

![App Screenshot](./src/assets/Screenshot%20(4).png)

## Features

### Form Fields
- **Username**: A text input field to enter the username.
- **Email**: A text input field to enter the email address.
- **Password**: A password input field to enter the password securely.

### Error Handling
- If the user leaves any of the fields empty or if there is a server error, an error message is shown below the form.
- The error messages are dynamically generated based on the issue.

### Navigation
- After a successful signup, the user is redirected to the login page.
- The `Already have an account?` link allows users to navigate to the login page if they already have an account.

### Redirect if Logged In
- If the user is already logged in (based on the presence of a JWT token), the component will redirect the user to the home page (`/`).

### API Request
- The component sends a POST request to the backend API to create a new user with the details entered in the form. The API URL is fetched from the context (`apiUrl`).

## Component Structure

### State Management
- **username**: Stores the inputted username.
- **email**: Stores the inputted email address.
- **password**: Stores the inputted password.
- **errorMsg**: Stores error messages for form validation or API errors.
- **showError**: A boolean that controls whether the error message is shown or not.

### Functions
- **handleUsername()**: Updates the `username` state when the input field is changed.
- **handleEmail()**: Updates the `email` state when the input field is changed.
- **handlePassword()**: Updates the `password` state when the input field is changed.
- **onSubmitSuccess()**: Navigates to the login page upon successful signup.
- **onSubmitFailure(msg)**: Displays the error message when the signup fails.
- **onSubmitForm()**: Handles the form submission by sending a POST request to the API.

### JWT Token Check
- If the JWT token is already set in the cookies (i.e., the user is already logged in), the user is redirected to the home page (`/`).

## Usage

1. **Install Dependencies**: Ensure that all dependencies such as `react-router-dom`, `js-cookie`, and `axios` are installed.
2. **Component Integration**: This component is part of the signup flow and should be used in a route like `/signup`.

## Example Usage

```js
import Signup from './components/Signup/Signup';

// Inside your main app component or layout component
<Signup />
```
# 2. Login Component

The `Login` component provides the user interface for logging into the dashboard. It allows users to input their email and password and submit the credentials to authenticate the user. Upon successful login, a JWT token is saved in cookies and the user is redirected to the dashboard. If there are any issues with the login attempt, an error message is displayed.

![App Screenshot](./src/assets/Screenshot%20(5).png)

## Features

### Form Fields
- **Email**: A text input field for the user to enter their email address.
- **Password**: A password input field for the user to securely enter their password.

### Error Handling
- If the user leaves any fields empty or if there is an authentication error, an error message is displayed below the form.
- The error messages are dynamically generated based on the issue.

### Navigation
- After a successful login, the user is redirected to the dashboard page (`/`).
- The `Don't have an account?` link navigates the user to the signup page for account creation.

### Redirect if Logged In
- If the user is already logged in (based on the presence of a JWT token), the component will redirect the user to the dashboard page (`/`).

### API Request
- The component sends a POST request to the backend API to authenticate the user with the provided credentials. The API URL is fetched from the context (`apiUrl`).

## Component Structure

### State Management
- **email**: Stores the inputted email address.
- **password**: Stores the inputted password.
- **errorMsg**: Stores error messages for form validation or API errors.
- **showError**: A boolean that controls whether the error message is shown or not.

### Functions
- **handleEmail()**: Updates the `email` state when the input field is changed.
- **handlePassword()**: Updates the `password` state when the input field is changed.
- **onLoginSuccess(jwtToken)**: Saves the JWT token to cookies and navigates to the dashboard upon successful login.
- **onLoginFailure(msg)**: Displays the error message when login fails.
- **onSubmitForm()**: Handles the form submission by sending a POST request to the API.

### JWT Token Check
- If the JWT token is already set in the cookies (i.e., the user is already logged in), the user is redirected to the dashboard page (`/`).

## Usage

1. **Install Dependencies**: Ensure that all dependencies such as `react-router-dom`, `js-cookie`, and `axios` are installed.
2. **Component Integration**: This component is part of the login flow and should be used in a route like `/login`.

## Example Usage

```js
import Login from './components/Login/Login';

// Inside your main app component or layout component
<Login />
```




# 3. Header Component

The `Header` component provides the navigation and user interface for the top section of the application. It allows users to toggle between light and dark themes, navigate between different pages (Dashboard, School, CheckStatus), and log out of the application.

## Features

### Theme Toggle
- Users can switch between dark and light themes using a toggle button.
- The theme state is managed globally through the `dashboardContext`.

### Navigation Links
- Provides navigation to key sections:
  - **Dashboard**: Link to the dashboard page.
  - **School**: Link to the school-related page.
  - **CheckStatus**: Link to the transaction status page.

### Logout
- Provides a logout button that removes the JWT token from the cookies and redirects the user to the login page.

### Responsive Styling
- Dynamically adjusts the UI style based on the selected theme (light or dark).
- Utilizes custom CSS classes to apply different styles for header background, text color, and button appearances.

## Component Structure

### State and Context
- **theme**: The current theme of the application (`dark` or `light`). Managed through the `dashboardContext`.
- **toggleTheme**: A function provided by the context to toggle the theme between dark and light.

### Functions
- **toggleThemeHandle()**: Toggles the theme between light and dark.
- **onLogoutHandle()**: Logs out the user by removing the JWT token from cookies and redirects to the login page.

### Conditional Rendering
- Renders different icons for the theme toggle button depending on the current theme (sun for light, moon for dark).
- Displays different styles for buttons and links based on the selected theme.

## Usage

1. **Install Dependencies**: Ensure that all dependencies such as `react-router-dom`, `js-cookie`, and `react-icons` are installed.
2. **Component Integration**: This component should be included at the top of the application for easy access to the theme toggle and navigation links.

## Example Usage

```js
import Header from './components/Header/Header';

// Inside your main app component or layout component
<Header />

```



# 4. Dashboard Component

The `Dashboard` component is a central page for managing and displaying transactions for a school dashboard. It includes a table that lists transactions with options for filtering, searching, and pagination. Users can filter transactions by status, search by order ID, and specify a date range for the transactions.

**Light Mode**
![App Screenshot](./src/assets/Screenshot%20(6).png)

**Dark Mode**
![App Screenshot](./src/assets/Screenshot%20(7).png)
## Features

### Search
- Allows users to search for transactions by the `custom_order_id`.

### Date Filter
- Provides date input fields for filtering transactions based on a specific start and end date.

### Status Filter
- Allows filtering of transactions by status: Success, Pending, or Failure.

### Pagination
- Displays transactions with pagination, with a default of 10 transactions per page.
- Pagination controls allow users to navigate between pages.

### Dynamic Theme
- Supports both dark and light themes that dynamically adjust the appearance of the page.

### API Integration
- Fetches transaction data from an API using a JWT token for authentication.
- Displays transactions on the dashboard based on the status and date range selected.

## Component Structure

### State Management
- **transactionData**: Stores the list of transactions fetched from the API.
- **startDate**: Stores the selected start date for filtering transactions.
- **endDate**: Stores the selected end date for filtering transactions.
- **filteredDocs**: Stores filtered transaction data based on the date range.
- **currentStatus**: Stores the selected transaction status (All, Success, Pending, Failure).
- **currentPage**: Tracks the current page for pagination.
- **searchInput**: Stores the input for searching by order ID.

### Functions
- **searchedItems()**: Filters transactions based on the search input.
- **filterByDateRange()**: Filters transactions based on the selected date range.
- **initiateAllTransactionsApi()**: Fetches all transaction data from the API.
- **onChangeSearchInput()**: Updates the search input state.
- **onStatusChangeHandler()**: Updates the selected transaction status filter.
- **paginate()**: Updates the current page for pagination.

### Conditional Rendering
- Displays a loading spinner or error message if transactions are not available.
- Renders different table styles and headers depending on the current theme (`light` or `dark`).

## Usage

1. **Install Dependencies**: Make sure to install all required dependencies such as `axios`, `react-router-dom`, and `js-cookie`.
2. **JWT Authentication**: Ensure that the JWT token is set in the cookies before using the dashboard.
3. **Component Integration**: This component is used in the main application and requires context from the `dashboardContext` for theme settings and API URL.

## Example Usage

```js
import Dashboard from './components/Dashboard/Dashboard';

// Inside your App component or routing setup
<Route exact path="/" element={<Dashboard />} />
```

# 5. Pagination Component

The `Pagination` component provides a paginated interface to navigate through a list of items, such as rows in a table. It takes in the current page and total pages and allows the user to click on page numbers to navigate between different pages.

**Pagination**
![App Screenshot](./src/assets/Screenshot%20(8).png)

## Features

### Page Navigation
- Displays page numbers as clickable elements.
- Highlights the current page with a special class (`current-page`), while the remaining pages are styled differently (`remaining-page`).
- Supports dynamic pagination based on the total number of pages.

### Props
- **paginationDetails**: An object containing:
  - `totalPages`: The total number of pages.
  - `currentPage`: The current active page number.
- **paginate**: A function that handles the page change when a page number is clicked.

## Component Structure

### State Management
This component is stateless, as it purely receives `paginationDetails` as props and displays the page numbers.

### Functions
- **paginate(pageNumber)**: Called when a page number is clicked to change the current page. It triggers the parent component's function to update the page.

### Layout
- The component renders a list of page numbers (`ul`), with each page number wrapped in a `li` element. Clicking on a page number triggers the `paginate` function.
  
### Styling
- **pagination-container**: The `ul` element that contains the page numbers.
- **page-number**: Each individual page number, with styles for `current-page` and `remaining-page` applied dynamically based on the current page.

## Example Usage

```js
import Pagination from './components/Pagination/Pagination';

// Inside your main component
<Pagination 
  paginationDetails={{ totalPages: 10, currentPage: 1 }} 
  paginate={handlePageChange} 
/>
```

# 6. TransactionDetails Component

The `TransactionDetails` component displays transaction information for different schools. It allows users to filter transactions based on school ID and view detailed data about specific transactions.

**Light Mode**
![App Screenshot](./src/assets/Screenshot%20(14).png)

**Dark Mode**
![App Screenshot](./src/assets/Screenshot%20(15).png)

**Drop Down**
![App Screenshot](./src/assets/Screenshot%20(16).png)

**School Details By School ID**
![App Screenshot](./src/assets/Screenshot%20(17).png)


## Features

- **School ID Dropdown**: Allows users to select a school ID to filter transactions.
- **Transaction List**: Displays transaction details including date, collect ID, school ID, gateway, order amount, transaction amount, status, and custom order ID.
- **Theming**: Supports light and dark themes for better UI adaptability.
- **API Integration**: Fetches transaction data from an API using JWT authentication stored in cookies.
  
## Props

- This component does not accept props directly but uses context via `dashboardContext` for `theme` and `apiUrl`.

## State Management

- **transactions**: Stores the list of transactions retrieved from the API.
- **uniqueIds**: Stores unique school IDs extracted from the transactions.
- **currentId**: Stores the selected school ID to filter transactions.
- **transactionDetails**: Stores transaction details based on the selected school ID.

## Component Structure

- **Dropdown**: Displays school IDs as a dropdown to allow filtering of transaction data.
- **Transaction Table**: Displays detailed transaction information when a school ID is selected.
- **API Calls**:
  - `getTransactions`: Fetches all transactions from the server.
  - `getTransactionDetails`: Fetches transaction details for a selected school ID.

## Layout

- The component uses a header (`Header` component) to display the page title and theme toggles.
- The transactions are displayed in a table format with various details such as date, school ID, status, and more.
- The `RowItem` component is used to render each row of transaction details.

## Example Usage

```js
import TransactionDetails from './components/TransactionDetails/TransactionDetails';

// Inside your main component
<TransactionDetails />
```

# 7. TransactionStatus Component

The `TransactionStatus` component allows users to check the status of transactions based on a search query (Order ID). It fetches transaction data from an API and displays the status information in a table format.

**Dark Mode**
![App Screenshot](./src/assets/Screenshot%20(18).png)

**Light Mode**
![App Screenshot](./src/assets/Screenshot%20(25).png)


## Features

- **Search Functionality**: Users can search for transaction statuses using an order ID.
- **Transaction List**: Displays detailed transaction information such as date, collect ID, school ID, gateway, order amount, transaction amount, status, and custom order ID.
- **Theming**: Supports both light and dark themes to adapt to user preferences.
- **API Integration**: Makes an API call to fetch transaction status based on the order ID.
  
## Props

- This component does not accept props directly but uses context via `dashboardContext` for `theme` and `apiUrl`.

## State Management

- **searchInput**: Stores the input value entered by the user for searching the transaction status.
- **currentStatus**: Stores the list of transaction details based on the order ID search.

## Component Structure

- **Search Input**: An input field to search for transactions by order ID.
- **Transaction Table**: Displays transaction details including date, school ID, status, and more for the searched order ID.
- **API Call**: 
  - Fetches transaction data from the server based on the search input (Order ID).
  - If no results are found, a message indicating no results is shown.

## Layout

- The component uses a header (`Header` component) to display the page title and theme toggles.
- The transactions are displayed in a table format with various details such as date, school ID, status, and more.
- The `RowItem` component is used to render each row of transaction details.

## Example Usage

```js
import TransactionStatus from './components/TransactionStatus/TransactionStatus';

// Inside your main component
<TransactionStatus />
```
# 8. ProtectedRoute Component

The `ProtectedRoute` component is a higher-order component that restricts access to certain routes based on the user's authentication status. If the user is not authenticated (i.e., no valid JWT token is present in the cookies), the component redirects them to the login page. If the user is authenticated, it allows the children components to be rendered.

## Features

- **Authentication Check**: Checks if a valid JWT token exists in cookies.
- **Redirect on Unauthorized Access**: If no JWT token is found, the user is redirected to the login page (`/login`).
- **Flexible**: Can wrap any route or component to restrict access based on authentication status.

## Props

- **children**: The component or elements that are wrapped by the `ProtectedRoute`. These will be rendered if the user is authenticated.

## Example Usage

The `ProtectedRoute` component can be used to protect routes in your application that require authentication. Here's an example of how to use it:

```js
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
```

# 9. ContextProvider Component

The `ContextProvider` component provides a React context to manage the application's global state, including the theme and API URL. It allows child components to access and modify the theme and the API URL in a centralized manner. This component is wrapped around the main app or specific parts of it to provide consistent state management across the application.

## Features

- **Theme Management**: Handles the theme (`light` or `dark`) for the application.
- **Persistent Theme State**: Saves the theme preference in the `localStorage` so that it persists even after a page reload.
- **Global API URL**: Provides a centralized API URL (`http://localhost:3009`) for making requests to the backend.

## Props

- **children**: The child components that will have access to the context.

## Context Values

The following values are provided through the context:

- **theme**: The current theme of the application (`light` or `dark`).
- **toggleTheme**: A function to toggle between `light` and `dark` themes.
- **apiUrl**: The base URL for the backend API (`http://localhost:3009`).

## Example Usage

To use the context values in any child component, you can access the context using the `useContext` hook. Here's an example:

```js
import React, { useContext } from "react";
import { dashboardContext } from "./context/dashboardContext";

const ThemeToggler = () => {
  const { theme, toggleTheme } = useContext(dashboardContext);

  return (
    <div>
      <h1>The current theme is {theme}</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

export default ThemeToggler;
```


# Screenshots of Pages

**Signup Page**
![App Screenshot](./src/assets/Screenshot%20(4).png)

**Login Page**
![App Screenshot](./src/assets/Screenshot%20(5).png)

**Dashboard Home Page** (Light Mode)
![App Screenshot](./src/assets/Screenshot%20(6).png)


**Dashboard Home Page** (Dark Mode)
![App Screenshot](./src/assets/Screenshot%20(7).png)

**Dashboard Search results by dropdown filter (Success)**
![App Screenshot](./src/assets/Screenshot%20(8).png)

**Dashboard Search result by dropdown filter (Pending)**
![App Screenshot](./src/assets/Screenshot%20(9).png)

**Dashboard Search results by dropdown filter (Failure)**
![App Screenshot](./src/assets/Screenshot%20(10).png)

**Dashboard Date range**
![App Screenshot](./src/assets/Screenshot%20(11).png)

**Specific School details** (Light Mode)
![App Screenshot](./src/assets/Screenshot%20(14).png)

**Specific School Details** (Dark Mode)
![App Screenshot](./src/assets/Screenshot%20(15).png)

**Specific School Details Dropdown**
![App Screenshot](./src/assets/Screenshot%20(16).png)

**Specific School Details**
![App Screenshot](./src/assets/Screenshot%20(17).png)


**Transaction status by Order ID** (Dark Mode)
![App Screenshot](./src/assets/Screenshot%20(18).png)

**Transaction status by Order ID** (Light Mode)
![App Screenshot](./src/assets/Screenshot%20(19).png)

**Transaction status by Order ID**
![App Screenshot](./src/assets/Screenshot%20(25).png)

## Pages for Smaller Screens
![App Screenshot](./src/assets/Screenshot%20(29).png)

![App Screenshot](./src/assets/Screenshot%20(30).png)

![App Screenshot](./src/assets/Screenshot%20(31).png)

![App Screenshot](./src/assets/Screenshot%20(32).png)

![App Screenshot](./src/assets/Screenshot%20(33).png)

![App Screenshot](./src/assets/Screenshot%20(34).png)

![App Screenshot](./src/assets/Screenshot%20(36).png)

![App Screenshot](./src/assets/Screenshot%20(37).png)

![App Screenshot](./src/assets/Screenshot%20(38).png)

![App Screenshot](./src/assets/Screenshot%20(39).png)

![App Screenshot](./src/assets/Screenshot%20(40).png)