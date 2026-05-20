<p align='center'>
    <img src='./frontend/public/favicon.svg' height='130'>
</p>

<h1 align='center'>Blogspot</h1>

<p align='center'>
    A minimal blog sharing platform built on the MERN stack.
</p>

<p align='center'>
    <img src='https://github.com/mhanzlah/blogspot/actions/workflows/ci.yml/badge.svg'>
    <img src='https://img.shields.io/badge/node-%3E%3D24-brightgreen?logo=node.js'>
    <img src='https://img.shields.io/badge/license-MIT-blue'>
</p>

---

## Overview

Blogspot is a full-stack web application where users can create, manage, and share blogs. It features secure authentication with access and refresh tokens, media uploads via Cloudinary, and a clean, responsive interface.

---

## Features

- JWT-based authentication with access & refresh token rotation
- Full blog CRUD — create, read, update, and delete posts
- Image uploads powered by Cloudinary
- Responsive UI built with Tailwind CSS

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React, Tailwind CSS |
| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcrypt |
| Media | Cloudinary |

---

## Getting Started

### Prerequisites

- Node.js >= 24
- A MongoDB connection URI
- A Cloudinary account

### Installation

**Backend**

```bash
git clone https://github.com/mhanzlah/blogspot.git
cd blogspot/backend
npm install
```

**Frontend**

```bash
cd ../frontend
npm install
```

### Environment Variables

Create a `.env` file inside `backend/`:

| Key | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `ACCESS_TOKEN_SECRET` | Secret used to sign short-lived JWT access tokens |
| `REFRESH_TOKEN_SECRET` | Secret used to sign long-lived JWT refresh tokens |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name for media storage |
| `CLOUDINARY_API_KEY` | Cloudinary API key for authenticated requests |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret for server-side signing |
| `PORT` | Server port (default 3000) |

### Run

**Backend**

```bash
cd backend
npm run dev
```

**Frontend**

```bash
cd frontend
npm run dev
```

---

## License

MIT © Muhammad Hanzla
