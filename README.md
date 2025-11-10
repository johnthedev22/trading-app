# 📈 jTrade — Stock Market App

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](./LICENSE)

---

## 🧠 Description
**jTrade** is a demonstration stock-market app that showcases multiple **React Contexts** and **state management** techniques — inspired by real-world trading apps (based on my own Trading212 account 😄). 

---

### 🌐 Live Demo

🔗  ([`View deployed app!`](https://netlify))

## 🛠️ Tech Stack

- ⚡ [Vite](https://vitejs.dev/) — Fast build tool
- ⚛️ [React](https://react.dev/) — Frontend library
- 🎨 [Tailwind CSS](https://tailwindcss.com/) — Styling framework
- 🧭 [React Router DOM](https://reactrouter.com/) — Routing
- 🧩 [Heroicons](https://heroicons.com/) — SVG icons
- 🧱 [Headless UI](https://headlessui.com/) — Unstyled accessible UI components

---

## 🚀 Installation

### 1️⃣ Create a new Vite project
```bash```
npm create vite@latest my-react-tailwind-app -- --template react

### 2️⃣ Install dependencies
npm install

### 3️⃣ Add Tailwind CSS
npm install tailwindcss @tailwindcss/vite
npx tailwindcss init -p

### 4️⃣ Configure Tailwind
In your vite.config.js (or vite.config.ts if using TypeScript), add the Tailwind CSS plugin.

### 5️⃣ Import Tailwind in your main CSS (e.g., index.css)
@tailwind base;
@tailwind components;
@tailwind utilities;

### 6️⃣ Install Heroicons
npm install @heroicons/react

### 7️⃣ run the dev server
npm run dev

## ✨ Features
### 🌙 Dark Mode
Managed by ThemeContext.
Supports "light" and "dark" action types.

### 🔐 Protected Routes
Managed by AuthContext with "LOGIN" and "LOGOUT" actions.
Also manages username and loggedIn state.

### 💰 Account Balance
Managed by AccountContext with "DEPOSIT", "WITHDRAW", "BUY", and "SELL" actions.