Here’s the updated README.md with your detailed explanations added for each screen:

---

# SpendifyApp

**SpendifyApp** is a user-friendly expense tracker that allows you to easily log, categorize, and visualize your income and spending. It provides a seamless experience for managing personal finances, with dynamic charts and categorization options. SpendifyApp includes two user roles: **User** and **Admin**.

![SpendifyApp Overview](./assets/SpendifyApp-logo.png)

## Table of Contents
1. [How to Build](#how-to-build)
2. [Software Architecture & Design Patterns](#software-architecture-design-patterns)
3. [Additional Features](#additional-features)
4. [User Roles](#user-roles)
5. [Screenshots](#screenshots)
6. [Database & API Information](#database-api-information)
7. [Important Information](#important-information)

---

### 1. How to Build

**Pre-requisites**:
- Node.js (version 14 or higher)
- React Native CLI
- Android Studio
- Npm

**Steps**:
1. Clone the repository:
    ```bash
    git clone https://github.com/220804-tech/SpendifyApp.git
    cd SpendifyApp
    ```
2. Install dependencies:
    ```bash
    npm install
    # or
   npm install --legacy-peer-deps
    ```
3. Run the application (for Android):
    ```bash
    npm run-android
    ```

4. Start the Metro bundler:
    ```bash
    npx start --reset-cache
    ```

---

### 2. Software Architecture & Design Patterns

- **Architecture**: SpendifyApp follows a **modular architecture**, separating concerns across different components like `UI`, `Services`, `State Management`, and `API Handlers`. This ensures scalability and maintainability.
  
- **Design Patterns**:
  - **MVVM (Model-View-ViewModel)**: For better separation of concerns and cleaner UI logic.
  - **Hooks-based Functional Components**: We extensively use React Hooks (`useEffect`, `useState`, `useReducer`) for state management and lifecycle events.
  - **Custom Hooks**: To manage reusable logic (e.g., fetching transactions, handling inputs).
  
- **State Management**:
  - Managed through `Zustand` for a lightweight and efficient state management solution.
  
- **API**:
  - `Axios` is used to manage HTTP requests, while `react-query` ensures efficient and optimized API caching and data fetching.

---

### 3. Additional Features

- **Dynamic Expense Charting**: Users can view their spending trends via dynamically generated charts, making it easier to track financial habits.
- **Date Filtering**: Easily filter expenses by date range to gain insights over a specific period.
- **Category Breakdown**: View expenses categorized by different areas like Food, Transport, etc.
- **User Profile**: Each user has a profile with personal finance statistics and tracking.

---

### 4. User Roles

SpendifyApp includes two roles with the following login credentials:

- **User1 Role**: 
  - Username: `Rizky Fajri`
  - Password: `12345678`
 
- **User2 Role**: 
  - Username: `Caramel`
  - Password: `12345678`
  
- **Admin Role**: 
  - Username: `Mas Admin`
  - Password: `inikatadmin1`

Users have access to personal financial tracking and data visualization, while the admin can manage all users' transactions and perform administrative tasks.

---

### 5. Screenshots

Here are some screenshots to provide a visual overview of SpendifyApp:

- **Login Screen**:
  
  ![Login Screen](https://github.com/user-attachments/assets/54450a25-0250-4873-b056-2cadb9c0ce84) 
  
  You can access the app as a **User** or **Admin** with the credentials provided. If you log in as a user, you will be directed to the user home screen, and if you log in as an admin, you will be directed to the admin home screen.

- **Admin Home Screen**:
  
  ![Admin Home Screen](https://github.com/user-attachments/assets/df66ed6e-57fd-4f69-9292-2caa4dc313e2)
  
  This is the admin home screen. At the bottom, you will see a list of all users. As a test, two users have been created. To view detailed charts and expenses for each user, click the arrow next to their name. You can also access the profile menu by clicking on the profile picture in the top right corner.

- **Detail All Expense User (Admin)**:
  
  ![Detail All Expense User](https://github.com/user-attachments/assets/967ebd8a-34a3-4461-99d7-d9fe008472d0)
  
  In this section, you can view the total expenses of a user represented in a pie chart along with a list of all transactions. You can filter expenses by date (default is 1 week). To edit an expense, click the pencil icon, and for deletion, click the trash icon.

- **Edit Modal (Admin)**:
  
  ![Edit Modal](https://github.com/user-attachments/assets/66d4d748-50fb-4249-92ac-56e7ddc72f53)
  
  In the edit modal, you can change only the amount and description. The date and type (Expense/Income) are not editable.

- **Date Modal (Admin)**:
  
  ![Date Modal](https://github.com/user-attachments/assets/eff5c63e-7235-40d6-8fb2-ea51d562e9d2)
  
  This modal allows you to select a date range to filter expenses based on the start and end date.

- **Profile (Admin)**:
  
  ![Profile Admin](https://github.com/user-attachments/assets/5cf6caef-5ee1-4798-9018-d3a0ac8db6d2)
  
  The profile page displays the admin's name and ID. You can also change the currency in the currency menu, and log out by clicking the "Log Out" button.

- **User Home Screen**:
  
  ![User Home Screen](https://github.com/user-attachments/assets/d4fbbbfe-05ed-4251-a654-fdbcc6b64962)
  
  This is the user home screen. It displays the user’s name, a chart of expenses by category, and the current wallet balance. You can add income or expense entries by clicking the pencil icon. If it’s your first time logging in, the chart will be empty until you input your income. The next arrow icon takes you to the detailed expense history page.

- **Add Modal User**:
  
  ![Add Modal User](https://github.com/user-attachments/assets/8385d5c1-d59d-4cc7-9c6b-abb310d2847a)
  
  When you click the pencil icon to add a new transaction, this modal will appear. Select "Income" if it's your first time logging in, then input the amount, category, and date. You can select a date using the calendar icon. If you miss any field, an alert will prompt you to complete it.

- **Category Modal User**:
  
  ![Category Modal User](https://github.com/user-attachments/assets/3d77a4a1-44f6-43f3-9632-dce8ec96e52f)
  
  This modal allows you to select a category for income or expense transactions.

- **Calendar Modal User**:
  
  ![Calendar Modal User](https://github.com/user-attachments/assets/10ec8f92-88b8-4ccf-8d87-3d406b37579a)
  
  This calendar modal helps you select the date for your income or expense entry.

- **Detail Expense User**:
  
  ![Detail Expense User](https://github.com/user-attachments/assets/3f869b2b-6028-442a-a67b-74e29d47d2ad)
  
  In the detailed expense view, you can see your total wallet balance, income, and expenses. The chart shows your total expenses categorized by type, and beneath that, your income and expenses are displayed in text. At the bottom, there is a filter for selecting a date range to display your expenses.

- **Profile User**:
  
  ![Profile User](https://github.com/user-attachments/assets/8e934454-58e3-4d78-b47d-d547cefb42a7)
  
  The profile screen displays the user’s name, ID, and allows them to change the currency.

---

### 6. Database & API Information

- **Local Data Storage**: SpendifyApp uses **LocalStorage** to store user-specific transaction data locally on the device.
  
- **Backend API for Login**: 
   - The login system is backed by an **Express.js** API.
   - User authentication data is stored in **PostgreSQL**.
   - Upon login, users receive a session token, which is managed through **LocalStorage** for keeping users logged in during a session.

  You can view and manage the API logic in the `server` folder, where the `Express.js` API endpoints are defined for handling authentication and user data requests.

---

### 7. Important Information

SpendifyApp is built for easy tracking of income and expenses. The admin role

 is designed to manage user transactions, while users can monitor their own financial records.

---

Now, the README provides a complete guide, including explanations of the screens with the images you requested.
