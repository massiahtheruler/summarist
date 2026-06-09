# Summarist

A full-stack audiobook and book summary platform built as part of the Frontend Simplified Virtual Internship.

The application allows users to browse book summaries, listen to audio content, manage subscriptions, access premium content, search books, and manage their account through a modern, responsive user experience.

**Tech Stack:** Next.js, React, TypeScript, Firebase, Stripe, Redux Toolkit

## Live Demo

[View Live Demo](https://summarist-rust.vercel.app/)

---

## Features

### Authentication

- User registration with email and password
- User login and logout
- Guest login functionality
- Protected routes and content access
- Persistent authentication state across sessions

### Book Discovery

- Personalized "For You" recommendations
- Recommended books section
- Suggested books section
- Dynamic book detail pages
- Search books by title or author

### Audio Experience

- Custom audio player
- Play and pause controls
- Skip forward and backward controls
- Seek through audio progress
- Dynamic duration tracking
- Book summary reading experience

### Premium Content

- Free and premium book access
- Subscription-based content gating
- Conditional user access based on plan status
- Upgrade flow for restricted content

### Subscription Management

- Monthly subscription plan
- Annual subscription plan
- Stripe payment integration
- User subscription status tracking
- Settings page with account information

### User Experience

- Responsive design
- Skeleton loading states
- Sidebar navigation
- Search with debouncing
- Dynamic routing
- Global state management

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Redux Toolkit
- React Icons

### Backend & Services

- Firebase Authentication
- Firestore Database
- Stripe Payments

### Deployment

- Vercel

---

## Challenges & Learnings

This project provided experience working with several real-world application concerns beyond simple UI development.

Some of the more challenging aspects included:

- Managing authentication state across multiple pages
- Persisting user session data between refreshes
- Integrating Stripe subscriptions with Firebase
- Synchronizing premium account status with content access
- Building a custom audio player experience
- Handling protected routes and user permissions
- Managing loading states throughout the application
- Creating responsive layouts while maintaining feature parity

One implementation decision I made was keeping a custom audio player experience rather than relying entirely on a basic implementation. This provided greater control over the user experience while supporting playback controls, progress tracking, and audio navigation.

---

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

---

## Future Improvements

- Google Authentication
- Password Reset Functionality
- User Library Persistence
- Book Completion Tracking
- Reading Progress Tracking
- Favorites System
- Improved Analytics
- Enhanced Audio Controls

---

## What This Project Demonstrates

- React and Next.js development
- TypeScript usage in production-style workflows
- Authentication and authorization
- State management with Redux Toolkit
- API integration
- Payment processing
- Protected content workflows
- Dynamic routing
- Responsive design
- Real-world application architecture

---

## Acknowledgements

This project was completed as part of the Frontend Simplified Virtual Internship program and was built using the provided design specifications and project requirements.

## Author

Justin H. | Frontend Engineer

[GitHub.com/massiahtheruler](https://github.com/massiahtheruler/)

[LinkedIn.com/justin-frontend](https://www.linkedin.com/in/justin-frontend/)
