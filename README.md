# Offline-First Kanban Board

An **offline-first Kanban board** built using **Next.js**, **React**, **Tailwind CSS**, and **IndexedDB**.  
The application works seamlessly even when the user goes offline and automatically syncs data when the connection is restored.

---

## Features

- **Kanban Board** with three columns:
  - TODO
  - IN PROGRESS
  - DONE
- **Offline-first support** using IndexedDB
- **Automatic data persistence** across page reloads
- **Online / Offline status detection**
- **Auto-sync to server when back online**
- **Service Worker support** (PWA-ready)
- Built using **Next.js**


---

## Tech Stack

- **Next.js**
- **Tailwind CSS**
- **IndexedDB** (via `idb`)
- **Service Workers**
- **JavaScript (ES6+)**

---
## How It Works

### Offline Storage
- Tasks are stored locally using **IndexedDB**
- Data persists even when the browser is refreshed or closed

### Network Detection

- Listens for `online` and `offline` events
- Shows real-time status indicator in UI

### Sync Mechanism
- When the app comes back online, tasks are automatically synced to the server using a POST request
---
## Getting Started (Local Setup)

### 1. Clone the repository
```bash
git clone https://github.com/GV-Kaushik/Offline-First-Kanban
cd Offline-First-Kanban

```
### 2.Install dependencies
```bash
npm install
```
### 3.Run the development server
```bash
npm run dev
```
### 4.Open your browser at 
```dts
http://localhost:3000
```

---



## Project Structure
```nix
Offline-First-Kanban/
├── app/
│   ├── api/
│   │   └── sync/
│   │       └── route.js        # API route to sync tasks to server
│   │
│   ├── components/
│   │   ├── Cards.jsx           # Individual task card UI & controls
│   │   └── Column.jsx          # Kanban column (TODO / IN PROGRESS / DONE)
│   │
│   ├── layout.js               # Root layout (HTML, body, global styles)
│   ├── page.js                 # Main Kanban page (Client Component)
│   ├── globals.css             # Global Tailwind & app styles
│   └── favicon.ico             # App favicon
│
├── lib/
│   └── db.js                   # IndexedDB logic (save/load tasks)
│
├── public/
│   └── sw.js                   # Service Worker for offline caching
│
├── .gitignore                  # Git ignored files
├── eslint.config.mjs           # ESLint configuration
├── jsconfig.json               # JS path aliases & tooling support
├── next.config.mjs             # Next.js configuration
├── postcss.config.mjs          # PostCSS / Tailwind configuration
├── package.json                # Project dependencies & scripts
├── package-lock.json           # Dependency lock file
└── README.md                   # Project documentation
```
---

