# CageMatch — Frontend

React frontend for CageMatch, a Nicholas Cage movie browsing and watchlist app.

## Live Website

https://cagematch-frontend-sage.vercel.app/

## Live Demo

![alt text](<screenshots/Screenshot 2026-04-19 153811.png>)
![alt text](<screenshots/Screenshot 2026-04-19 153625.png>)
![alt text](<screenshots/Screenshot 2026-04-19 153652.png>)
![alt text](<screenshots/Screenshot 2026-04-19 154202.png>)
![alt text](<screenshots/Screenshot 2026-04-19 161918.png>)
![alt text](<screenshots/Screenshot 2026-04-19 161829.png>)
![alt text](<screenshots/Screenshot 2026-04-19 153722.png>)

## Tech Stack

- React 19, React Router 7
- Firebase (authentication)
- Axios (API calls)
- Fuse.js (fuzzy search)
- tsparticles (background animation)
- Lucide React (icons)

## Getting Started

```bash
npm install
npm start
npm run build
```

## Environment Variables

Create a `.env` file in this directory:

```
REACT_APP_BACKEND_URL and REACT_APP_FIREBASE_CONFIG to be added here
```

## Project Structure

```
src/
  components/    # Navbar, MovieModal, LoginForm, SignupForm, Spinner
  pages/         # LoginPage, SignupPage, ProfilePage
  services/      # movieService.js — all API calls
  utils/         # Firebase client config
```

## Key Flows

- **Auth** — Firebase email/password auth.
- **Browse** — `ProfilePage` fetches movies grouped by genre on load. Cards open a modal with full movie details, trailer, cast and OTT availability.
- **Watchlist** — Bookmark icon in the movie modal toggles watchlist. The watchlist sidebar in the navbar fetches and displays saved movies.
- **Search** — Fuzzy search via Fuse.js over the already-loaded movie list. Results appear as a dropdown with poster, title, year and score.

## App Steps

- Signup and create a new user profile
- Login via Email and password
- Once logged in, hover through movies and click on movie cards to find more details and trailer
- Add a movie to watchlist by clicking the bookmark button near like, dislikes button.
- View all your watchlisted movies by clicking the 'Watchlist🎬' button
- Logout by clicking on the Nick Cage Face icon

## Furtre Enhancements

- Enabe like/dislike functionality
- Add Nick Cage AI feature
