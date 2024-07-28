### Project Title

**User Dashboard Application**

### Project Description

This project is a User Dashboard Application built with React, TypeScript, Tailwind CSS, Shadcn UI, and Vite. The application fetches user data from a mock REST API and displays it in a user-friendly and responsive interface. The application also includes dark/light theme switching and routing to navigate between user profiles, posts, photos, and comments.

### Features

- **User Profile Page:** Displays user information including name, username, email, address, phone, website, and company details.
- **Posts Page:** Lists all posts by a user with a detailed view of each post.
- **Todos Page:** Displays the todos of the user.
- **Photos Page:** Displays user photos.
- **Comments:** Displays comments for each post.
- **User List Page:** Lists all users.
- **404 Not Found Page:** Handles routes that do not exist.
- **Dark/Light Theme Toggle:** Allows switching between dark and light modes.
- **Responsive Design:** Ensures the application is usable on various devices and screen sizes.

### Technologies Used

- **React:** JavaScript library for building user interfaces.
- **TypeScript:** Superset of JavaScript that adds static types.
- **Tailwind CSS:** Utility-first CSS framework for rapid UI development.
- **Shadcn UI:** Component library for building responsive interfaces.
- **Vite:** Frontend build tool that provides a fast development environment.
- **Axios:** Promise-based HTTP client for making requests to the API.
- **React Router:** Library for handling routing in React applications.

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/shyam-1905/user-dashboard.git
   cd user-dashboard-app
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Run the development server:**

   ```sh
   npm run dev
   ```

4. **Open the application in your browser:**
   Navigate to `http://localhost:3000`

### Project Structure

```
user-dashboard-app/
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   └── api.ts
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── modeToggle.tsx
│   │   ├── userProfile.tsx
│   │   ├── userActivities.tsx
│   │   ├── Comments.tsx
│   ├── context/
│   │   └── themeContext.tsx
│   ├── layouts/
│   │   └── MainLayout.tsx
│   ├── pages/
│   │   ├── dashboard.tsx
│   │   ├── posts.tsx
│   │   ├── todos.tsx
│   │   ├── userList.tsx
│   │   ├── notFound.tsx
│   ├── types/
│   │   └── types.ts
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

### Components

1. **Header.tsx:** Contains the header with a theme toggle switch.
2. **modeToggle.tsx:** Component for toggling between dark and light modes.
3. **UserProfile.tsx:** Displays the user's basic information.
4. **userActivities.tsx:** Displays a list of user activities such as posts.
5. **Comments.tsx:** Displays comments for a specific post.

### Pages

1. **dashboard.tsx:** Contains the layout and components for the user dashboard.
2. **posts.tsx:** Contains the layout and components for displaying user posts.
3. **todos.tsx:** Contains the layout and components for displaying user todos.
4. **userList.tsx:** Contains the layout and components for displaying a list of users.
5. **notFound.tsx:** Contains the layout and components for the 404 Not Found page.

### Context

1. **themeContext.tsx:** Context for managing and providing theme state across the application.

### Layouts

1. **layout.tsx:** Contains the main layout structure for the application.

### Types

1. **types.ts:** Contains TypeScript types used in the application.

### API

1. **api.ts:** Contains functions for making API requests.

### Routing

Routing is handled in `App.tsx` using `react-router-dom`. The routes defined are:

- `/users/:id`: Displays the user profile page.
- `/users/:id/posts`: Displays the user posts page.
- `/users/:id/todos`: Displays the user todos page.
- `/users/:id/photos`: Displays the user photos page.
- `/users`: Displays the user list page.
- `*`: Displays the 404 Not Found page.

### API Integration

The application uses the JSONPlaceholder API to fetch user data, posts, photos, and comments.

- **User Data:** `https://jsonplaceholder.typicode.com/users/:id`
- **User Posts:** `https://jsonplaceholder.typicode.com/users/:id/posts`
- **User Todos:** `https://jsonplaceholder.typicode.com/users/:id/todos`
- **User Photos:** `https://jsonplaceholder.typicode.com/users/:id/photos`
- **Post Comments:** `https://jsonplaceholder.typicode.com/posts/:postId/comments`

### Dark/Light Theme Toggle

The theme toggle is implemented using Tailwind CSS and `useContext` for managing the theme state. The theme is applied using conditional class names based on the context state.

### Acknowledgments

- **React:** https://reactjs.org/
- **TypeScript:** https://www.typescriptlang.org/
- **Tailwind CSS:** https://tailwindcss.com/
- **Shadcn UI:** https://shadcn.dev/
- **Vite:** https://vitejs.dev/
- **Axios:** https://axios-http.com/
- **React Router:** https://reactrouter.com/
- **JSONPlaceholder:** https://jsonplaceholder.typicode.com/

### Contact

- **Name:** Shyam Prasad Reddy Yenna
- **GitHub:** https://github.com/shyam-1905

---
