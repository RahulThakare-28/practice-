# Assignment 2B: Angular User Management Application

## 📋 Overview

A simple Angular application with user registration, login, and profile features using localStorage for data storage.

**Features:**
- ✅ User Registration with validation
- ✅ User Login with authentication
- ✅ User Profile display
- ✅ Logout functionality
- ✅ Protected routes (only logged-in users can access profile)
- ✅ Responsive Bootstrap design

---

## 🚀 Quick Start (3 Simple Steps)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start the Application
```bash
ng serve --open
```

The app will automatically open in your browser at `http://localhost:4200`

### Step 3: Test the Application
- Click **Register** to create a new user account
- Fill in the form with:
  - Full Name: Any name (min 3 characters)
  - Email: Any email format
  - Phone: 10 digits (e.g., 9876543210)
  - Password: Min 6 characters
  - Confirm Password: Must match password
  - Gender: Select Male/Female/Other
  - Address: Optional
- Click **Register** button
- You'll be redirected to login page
- Login with the email and password you just created
- View your profile after login

---

## 🔑 Demo Account (Optional)

If you want to test without registering:
- **Email:** demo@example.com
- **Password:** password123

(Register this account first by going through the registration process with these details)

---

## 📁 Project Structure

```
ass-2-b/
├── src/app/
│   ├── components/
│   │   ├── register/          # Registration form
│   │   ├── login/             # Login form
│   │   └── profile/           # User profile display
│   ├── services/
│   │   └── auth.service.ts    # User management logic
│   ├── guards/
│   │   └── auth.guard.ts      # Route protection
│   └── app.routes.ts          # Application routes
├── package.json               # Dependencies
└── README.md                  # This file
```

---

## 🔐 How It Works

1. **Registration**
   - Enter your details
   - System checks if email is already used
   - Data saved to browser localStorage
   - Redirects to login

2. **Login**
   - Enter email and password
   - System verifies credentials
   - Creates session in localStorage
   - Redirects to profile

3. **Profile**
   - Shows your information
   - Shows all registered users table
   - Logout button to end session
   - Profile is protected (can't access without login)

---

## 💾 Data Storage

All data is stored in **browser's localStorage** (not a database):
- **Users list** - stored as `users` key
- **Current session** - stored as `currentUser` key
- **Data persists** - survives browser refresh
- **No passwords sent anywhere** - only stored locally

---

## 🛠️ Available Commands

| Command | Purpose |
|---------|---------|
| `ng serve` | Run app on localhost (with auto-reload) |
| `ng serve --open` | Run app and open browser automatically |
| `ng build` | Create production build in `dist/` folder |
| `ng test` | Run unit tests |

---

## 🎯 Features Explained

### ✅ Form Validation
- Full name: Min 3 characters
- Email: Valid email format
- Phone: Exactly 10 digits
- Password: Min 6 characters
- Confirm Password: Must match password
- Gender: Required selection

### ✅ Security Features
- Passwords not visible in profile
- Protected routes (AuthGuard)
- Session management
- Automatic logout option

### ✅ User Experience
- Error messages on form errors
- Success alerts after registration
- Auto-redirect after login
- Responsive design works on phones, tablets, desktops

---

## 📝 Test Workflow

**Complete workflow to test:**

1. Open http://localhost:4200 (should show login page)
2. Click "Register here" link
3. Fill registration form:
   ```
   Full Name: John Doe
   Email: john@example.com
   Phone: 9876543210
   Password: password123
   Confirm: password123
   Gender: Male
   ```
4. Click Register button
5. See success message, then redirected to login
6. Login with same email and password
7. See profile with your information
8. See all registered users table
9. Click "Logout" button
10. Back to login page

---

## 🌐 Responsive Design

The application is responsive:
- **Desktop:** Full layout with sidebar
- **Tablet:** Adjusted spacing and sizes
- **Mobile:** Single column, touch-friendly

---

## 📚 Technology Stack

- **Angular 21** - Framework
- **TypeScript** - Programming language
- **Bootstrap 5** - UI styling
- **localStorage API** - Data persistence
- **HTML5 & CSS3** - Markup and styling

---

## ❓ FAQs

**Q: Where is my data stored?**
A: In your browser's localStorage. It's only on your computer.

**Q: Can I login on another browser?**
A: No, data is only in your browser. Each browser has separate storage.

**Q: What happens if I clear browser data?**
A: All registered users and sessions will be deleted.

**Q: Can I edit my password?**
A: Edit profile feature is coming soon.

**Q: Can I see others' passwords?**
A: No, passwords are securely stored and never displayed.

---

## 🚨 Errors & Solutions

| Error | Solution |
|-------|----------|
| Port 4200 already in use | Use `ng serve --port 4201` |
| Blank page loading | Wait for build to complete (check terminal) |
| Can't find modules | Run `npm install` |
| Layout looks broken | Clear browser cache (Ctrl+F5) |

---

## ✨ Next Steps

- Edit profile functionality
- Delete account functionality
- Password reset
- User search in admin table
- Export user data to CSV

---

**Created:** 2026-03-03
**Framework:** Angular 21
**Status:** Working & Ready to Use

