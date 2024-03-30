# CommuniLink Documentation

## Introduction

-   This documentation outlines the architecture and features of a Social Media application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The application enables users to create profiles, connect with friends, share posts, and engage in social interactions.

## Features

**User Authentication**

-   Implementation of firebase authentication using google provider
-   Users can sign up, login, and logout securely.

**User**

-   Users can create and customize their profiles with profile pictures, bios, and personal information.
-   Profile information is displayed on the user's dashboard.

**Friend Connection**

-   Users can follow and unfollow each others.
-   Friends' activities and posts are visible on the user's feed.

**Post Sharing**

-   Users can create and share posts with text, images or videos.
-   Posts can be liked, commented on, and shared.
-   The feed displays the latest posts from all the users.

**Notification**

-   Users recieive notification for new follow and comments.
-   Notification are displayed in the notification page.

**Search Functionality**

-   Users can search for other users.
-   Search results are displayed based on relevance and user preferences.

## Architecture

**Fronend (React.js)**

-   Components: Resuable UI components for the user interface.
-   Redux: State management for handling user authentication, profiles, posts, and notifications.
-   React Router: Navigation and routing between different pages.
-   Axios: HTTP client for making API requests to the backend.

**Backend (Node.js, Express.js)**

-   RESTful APIs: Endpoints for user authentication, profiles, posts, friendships, notifications, and search functionalities.
-   MongoDB Atlas: Cloud-hosted MongoDB database for storing user data, posts, and application content.
-   Prisma: Object Relation Mapping (ORM) for interacting with MongoDB from Node.js
-   JWT Authentication: JSON Web Tokens for secure user authentication and authorization.

**Database(MongoDB)**

-   User Collections: User collection for storing user profiles and authentication data.
-   Posts collection: Stores user-generated posts with associated metadata.
-   Comments collection: Store the comments for the post.
-   Notifications collection: Stores notifications for user activities and interactions.

## Getting Started

-   Pre-requisite: You need to install the nodejs in your system: [node.js documentation]()

1. **Clone the Repository:**

```zsh
    git clone https://github.com/your-username/social-media-app.git
    cd social-media-app
```

2. **Install Dependencies:**

```zsh
    cd client && npm install
    cd ../server && npm install
```

3. **Setup the Environment Variable**

-   Create .env files in the frontend and backend directories.
-   Configure environment variables such as database connection strings, API keys, and secret keys as given .env.sample.

4. **Start the development servers:**

-   Frontend

```zsh
    cd client && npm start
```

-   Backend

```zsh
    cd server && npm start
```

5. **Access the Application**

-   Open your browser and navigate to http://localhost:5173 to view the application.

## Conclusion

The Social Media MERN Application provides a robust platform for users to connect, share, and interact within a social networking environment. Continuous development and enhancements aim to improve user experience and engagement.

**Thank you for using our Social Media MERN Application**
