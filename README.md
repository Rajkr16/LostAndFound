# Lost & Found

A full-stack web application for reporting, searching, and managing lost and found items within a campus/community environment.

The platform allows users to report lost or found items, browse reported items, submit claims, approve or reject claims, and securely exchange contact information after a claim has been approved.

---

## 📌 Project Overview

Lost & Found is designed to solve a common problem in colleges and communities: recovering lost belongings.

Instead of relying on notice boards, WhatsApp groups, or word of mouth, users can use one centralized platform to:

- Report lost items
- Report found items
- Search and filter reported items
- View detailed item information
- Submit claims for items
- Review claims on reported items
- Approve or reject claims
- Mark items as returned after approval
- Access contact information after an approved claim
- Track activity through a personal dashboard

---

## ✨ Features

### 🔐 Authentication

- User registration
- User login
- Password hashing using bcrypt
- JWT-based authentication
- Protected routes
- Persistent login using local storage
- Logout functionality

### 📦 Item Management

Users can report:

- Lost items
- Found items

Each item can contain:

- Title
- Type
- Category
- Description
- Location
- Date
- Status
- Reporter information

Users can also update or delete items they reported.

### 🔎 Browse & Search

Users can browse all reported items and filter them by:

- Search text
- Lost / Found type
- Category
- Location

Each item has a dedicated details page.

### 📋 Claim System

Users can submit a claim for an active item by providing a message explaining why they believe the item belongs to them.

The system prevents:

- Users from claiming their own items
- Duplicate claims for the same item

### ✅ Claim Approval

The person who reported an item can:

- Approve a claim
- Reject a claim

When a claim is approved:

- The claim status becomes `approved`
- The item status automatically becomes `returned`

### 📞 Contact After Approval

Contact information is protected until a claim is approved.

After approval, authorized users can access the item owner's:

- Name
- Email
- Mobile number

This prevents personal contact information from being exposed before the claim is verified.

### 📊 Dashboard

The dashboard provides users with an overview of their Lost & Found activity, including reported item statistics and item status information.

### 📱 Responsive Design

The application is designed to work on:

- Desktop
- Tablet
- Mobile devices

The navigation and pages have been tested for mobile responsiveness.

---

## 🔄 Claim Workflow

The main claim workflow is:

```text
User A reports an item
        ↓
Item appears in Browse Items
        ↓
User B views the item
        ↓
User B submits a claim
        ↓
Claim appears in User A's My Reports
        ↓
User A reviews the claim
        ↓
      ┌───────────────┐
      ↓               ↓
   Approve          Reject
      ↓               ↓
Item → Returned    Claim → Rejected
      ↓
Contact information becomes available

🛠️ Tech Stack
Frontend
React
React Router
Vite
JavaScript
CSS
Backend
Node.js
Express.js
MongoDB
Mongoose
JWT
bcryptjs
CORS
dotenv
📁 Project Structure
LostAndFound/
│
├── client/
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Items.jsx
│   │   │   ├── ItemDetails.jsx
│   │   │   ├── ReportItem.jsx
│   │   │   ├── MyClaims.jsx
│   │   │   ├── MyReports.jsx
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── itemController.js
│   │   └── claimController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Item.js
│   │   └── Claim.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── itemRoutes.js
│   │   └── claimRoutes.js
│   │
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── .gitignore
└── README.md
🔐 Authentication & Security

Authentication is handled using JWT.

During login, the server creates a JWT containing the user's:

User ID
Role

The token is then used to access protected API routes.

Passwords are never stored as plain text. They are hashed using bcryptjs.

Protected operations include:

Reporting items
Updating items
Deleting items
Submitting claims
Viewing personal claims
Viewing claims on reported items
Approving or rejecting claims
Viewing approved claim contact information
🔗 API Routes
Authentication
POST /api/auth/register
POST /api/auth/login
Items
POST   /api/items
GET    /api/items
GET    /api/items/:id
PUT    /api/items/:id
DELETE /api/items/:id
Claims
POST /api/claims/:itemId
GET  /api/claims/my-items
GET  /api/claims/my-claims
PUT  /api/claims/:claimId

Protected endpoints require:

Authorization: Bearer <JWT_TOKEN>
⚙️ Installation
1. Clone the repository
git clone <your-github-repository-url>
cd LostAndFound
2. Install backend dependencies
cd server
npm install
3. Configure environment variables

Create:

server/.env

Add:

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

Do not upload the .env file to GitHub.

A sample configuration is provided in:

server/.env.example
4. Start the backend

From the server directory:

npm run dev

The backend runs on:

http://localhost:5000
5. Install frontend dependencies

Open another terminal:

cd client
npm install
6. Start the frontend
npm run dev

The frontend will normally run on:

http://localhost:5173
🧪 Testing

The application has been tested for the main user workflow.

Authentication
Registration
Login
Logout
Protected routes
Items
Create item
Browse items
Search items
Filter items
View item details
Update item
Delete item
Claims
Submit claim
Prevent duplicate claim
Prevent claiming own item
Approve claim
Reject claim
Automatically mark approved item as returned
Show contact information only after approval
Responsive Design

The application has also been tested on:

Desktop
Tablet
Mobile layouts
Mobile navigation
🏗️ Production Build

The frontend production build can be generated using:

cd client
npm run build

The production build has been successfully tested using Vite.

🔮 Future Improvements

Possible future enhancements include:

Image upload for reported items
Email notifications
Real-time messaging
Advanced item matching
Admin dashboard
User profile management
Report moderation
Item image galleries
Cloud image storage
Production deployment
Better notification system
🎓 Project Purpose

This project was developed as a full-stack web application project to demonstrate practical implementation of:

Frontend development
Backend API development
Database management
Authentication
Authorization
REST APIs
CRUD operations
React routing
State management
Responsive UI design
Secure access control
👨‍💻 Technologies
Frontend  → React + Vite
Backend   → Node.js + Express
Database  → MongoDB + Mongoose
Auth      → JWT + bcryptjs
Styling   → CSS

📄 License

This project is intended for educational and academic purposes.