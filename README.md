# Summarist

Summarist is a book summary and audio platform I built for the Frontend Simplified Virtual Internship.

The assignment was to recreate a full subscription-based web application featuring authentication, book browsing, dynamic routes, audio playback, premium access, Stripe subscriptions, settings, search, sidebar navigation, saved books, and finished books. They gave us the homepage HTML/CSS and assets, which helped, but the real work was turning that starter into a full Next app with actual routes, state, auth, payments, database behavior, and all the little user flows that make it feel finished.

This is not one of those projects where I only made the screen look right. I wanted the app to actually move like the requirements said it should move. If a user is logged out, the app reacts. If a book is premium, access is gated. If a book gets saved, it goes to Firestore. If the audio finishes, it shows up under finished books. If checkout succeeds, the app responds like a subscription product.

## Live demo

[View Live Demo | https://summarist-rust.vercel.app](https://summarist-rust.vercel.app)

demo account credentials:

Standard User -
Username: guest123@gmail.com
Password: guest123

Premium User -
Username: guest@gmail.com
Password: guest123

---

## Features

- Converted homepage using the provided Summarist HTML, CSS, logo, and assets
- Firebase email/password auth, guest login, Google login, logout, and forgot password
- Custom auth modal instead of a generic Firebase UI widget
- App shell with sidebar navigation and top search
- Real book data from the provided Summarist API
- `/for-you` page with selected, recommended, and suggested books
- Dynamic book detail pages at `/book/[id]`
- Dynamic player pages at `/player/[id]`
- Premium book access logic
- Stripe Checkout subscriptions for monthly and yearly plans
- Settings page with logged-in and logged-out states
- Search with debounce
- Skeleton loading states
- Responsive layout across the main app routes

Beyond the required internship scope, I also implemented:

- Firestore library persistence
- Finished books tracking
- Google authentication
- Forgot password flow
- Reader text-size controls on the player page
- Active rotating homepage headings
- Extra UX polish around logged-out settings, saved-book state, and premium access

I also kept some things intentionally different from the reference. The reference player felt dated to me, and the native browser audio player is cleaner and more useful because it already gives users playback, seeking, speed, download, and other browser-supported controls. I did not want to rebuild a worse player just to match a screenshot.

## Tech Stack

### Frontend

- Next.js 16 App Router
- React 19
- TypeScript
- CSS
- React Icons

### Auth, Data, and Payments

- Firebase Authentication
- Firestore
- Stripe Checkout
- Stripe subscriptions

### Deployment

- Vercel

## Architecture Highlights

- Firebase Authentication and Firestore-backed user data
- Stripe Checkout subscriptions with monthly and yearly plans
- Protected premium content and gated read/listen actions
- Dynamic book and player routes using the Next.js App Router
- Persistent saved books and finished books per user
- Shared React Context providers for authentication, subscription state, and reader preferences

Firestore user data is scoped under the signed-in user's UID:

```txt
users/{uid}/library/{bookId}
users/{uid}/finished/{bookId}
```

Stripe uses Checkout Sessions in subscription mode with separate monthly and yearly price IDs.

## Main Challenges

The UI was not really the hard part. The hard part was getting all the little systems to agree with each other.

Some of the bigger pieces I had to work through:

- Making auth state control the app instead of just sitting behind a login button
- Making checkout require a logged-in user so a subscription belongs to an account
- Connecting premium access to book behavior without overbuilding the backend
- Saving library and finished-book state to Firestore per user
- Making the book page know when a title was already saved after coming back later
- Keeping auth, payment, saved-book, and settings states from feeling disconnected
- Knowing when to follow the reference and when to make a better product decision

That last part mattered. I wanted this to feel like I built the product, not like I blindly copied every old design choice from the reference.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

Run checks:

```bash
npm run lint
npm run build
```

## Future Improvements

If this became a real production product, I would add:

- Stripe webhooks
- Server-verified subscription status
- Firestore user subscription documents
- Customer portal support for cancellation and plan changes
- Reading progress tracking
- Stronger API error states

For this internship, I focused on making the full required flow work, then added the optionals that made the app feel complete.

## Author

Justin H.

[GitHub.com/massiahtheruler](https://github.com/massiahtheruler/)

[LinkedIn.com/justin-frontend](https://www.linkedin.com/in/justin-frontend/)
