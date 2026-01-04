# Biased Film Review - Next.js 15

A modern film review platform built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

## Features

- 🎬 **Film Reviews**: Create, edit, and browse film reviews with rich text editing
- 🔐 **Authentication**: Firebase Authentication with email/password
- 🌓 **Dark/Light Mode**: System preference detection with manual toggle
- 📱 **Responsive Design**: Mobile-first approach with fluid layouts
- ♿ **Accessibility**: WCAG 2.1 AA compliant
- ⚡ **Performance**: Server Components, streaming, and optimistic updates
- 🎨 **Modern UI**: Framer Motion animations and micro-interactions

## Tech Stack

- **Framework**: Next.js 15.x with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animation**: Framer Motion
- **State Management**: Zustand
- **Database/Auth**: Firebase (Firestore, Auth, Storage)
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Toast Notifications**: Sonner
- **Rich Text Editor**: React Quill

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, or pnpm
- Firebase project

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd BFR
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your Firebase configuration:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Auth routes (login, register, forgot-password)
│   ├── admin/             # Admin panel
│   ├── create-post/       # Create new post
│   ├── edit-post/         # Edit existing post
│   ├── news/              # Movie news
│   ├── profile/           # User profile
│   ├── reviews/           # Reviews listing
│   ├── view-blog/         # Individual blog post
│   ├── error.tsx          # Error boundary
│   ├── loading.tsx        # Loading state
│   ├── layout.tsx         # Root layout
│   ├── not-found.tsx      # 404 page
│   └── page.tsx           # Home page
├── components/
│   ├── admin/             # Admin components
│   ├── auth/              # Authentication forms
│   ├── blog/              # Blog-related components
│   ├── home/              # Home page sections
│   ├── layout/            # Navigation, Footer
│   ├── news/              # News components
│   ├── profile/           # Profile components
│   ├── providers/         # Context providers
│   ├── reviews/           # Reviews listing
│   └── ui/                # Reusable UI components
├── lib/
│   ├── actions/           # Server actions
│   ├── firebase/          # Firebase configuration
│   ├── store.ts           # Zustand stores
│   ├── types.ts           # TypeScript types
│   └── utils.ts           # Utility functions
├── public/                # Static assets
└── styles/                # Global styles
```

## Key Features Explained

### App Router & Server Components

The application uses Next.js 15's App Router with React Server Components for optimal performance. Pages that don't require client-side interactivity are rendered on the server.

### Authentication

Firebase Authentication is used with a custom auth provider that:
- Persists user sessions
- Manages user profiles in Firestore
- Supports admin roles

### Dark Mode

Implemented using `next-themes` with:
- System preference detection
- Manual toggle in navigation
- Smooth transitions
- No flash on initial load

### Animations

Framer Motion powers all animations:
- Page transitions
- Card hover effects
- Loading states
- Modal dialogs

### Responsive Design

Mobile-first approach using Tailwind CSS:
- Fluid typography
- Responsive grid layouts
- Touch-friendly interactions
- Collapsible mobile navigation

## Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run typecheck

# Linting
npm run lint
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API key | Yes |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | Yes |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID | Yes |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | Yes |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase sender ID | Yes |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID | Yes |
| `NEXT_PUBLIC_NEWS_API_KEY` | News API key (optional) | No |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Firebase Hosting

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build: `npm run build`
5. Deploy: `firebase deploy --only hosting`

## Migration from Vue.js

This project was converted from a Vue.js 2 application. Key changes:

- **Routing**: Vue Router → Next.js App Router
- **State**: Vuex → Zustand
- **Components**: Vue SFCs → React components
- **Styling**: Scoped CSS → Tailwind CSS
- **Build**: Vue CLI → Next.js

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details