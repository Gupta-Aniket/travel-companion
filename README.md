# Travel Companion

A full-stack **multi-modal travel ticket organizer** built with **React Native**, designed to manage, validate, and visualize all your travel tickets across multiple transport types (flight, train, bus, ferry). The app provides OTP-based authentication, rich form handling, dynamic validations, and visual dashboards for a complete travel management experience.

---

## Features

- 🔑 **OTP-Based Authentication** (via Supabase)
- 🛫 **Multi-Modal Ticket Handling**: Flight, Train, Bus, Ferry support
- 🎯 **Dynamic Form Rendering** with conditional fields
- 📅 **Date & Time Pickers** with custom modals
- 👤 **Passenger Details Management** (multiple passengers per ticket)
- 📊 **Analytics Dashboard** (mood-style monthly tracking integrated with Firebase experimental branch)
- 🚀 **Offline-first architecture planned** (using AsyncStorage + Firestore in future upgrade)
- 💡 **Gemini AI API Key Integration** for experimental use case validations
- ⚛️ Built using **Expo Router** and **React Native Modular Components**

---

## Tech Stack

- **React Native** (Expo Router)
- **Supabase** (Primary backend & OTP auth)
- **Firebase** (experimental analytics branch)
- **Formik + Yup** (forms & validation)
- **Gemini AI API** (experimental key validation)
- **React Native Paper & Icons**
- **AsyncStorage** (local data persistence)

---

## Screenshots

> *(Add relevant screenshots here for better GitHub presentation)*

---

## Future Improvements

- Complete migration to Firebase (Firestore Realtime DB)
- Offline-first sync architecture
- More granular analytics and visualizations
- Role-based access controls
- Deeper integration with travel APIs

---

## Setup & Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Setup environment variables for:
- Supabase project keys
- Firebase config
- Gemini API keys (optional)

4. Start the project:

```bash
npx expo start
```

---
