# Feedback Workflow System

A modern feedback app for HR and users — send feedback links, collect responses, and trigger instant email notifications. Built with Next.js (App Router), Tailwind CSS, and Resend.

---

## 🚀 Features

- **HR Dashboard:** Send feedback request links to clients/users by email.
- **User Feedback Form:** Clean UI for submitting feedback (thank-you and HR notification emails triggered automatically).
- **Fully responsive, creative UI.**
- **Works out-of-the-box. No login required!**

---

## 🛠 Tech Stack

- **Frontend/Backend:** Next.js (App Router)
- **Static UI:** Tailwind CSS
- **Email Engine:** [Resend](https://resend.com)
- *(Optional/Bonus): MongoDB (not required for the main workflow)*

---

## ⚡️ Getting Started (Local Development)

1. **Clone the repository:**
    ```
    git clone https://github.com/Sandeepkrishna24/feedback-workflow.git
    cd feedback-workflow
    ```

2. **Install dependencies:**
    ```
    npm install
    ```

3. **Set up environment variables:**
    - Create a `.env.local` file in the root folder and add:
      ```
      RESEND_API_KEY=your_resend_api_key
      HR_EMAIL=hr@example.com
      ```

4. **Run locally:**
    ```
    npm run dev
    ```
    Visit [http://localhost:3000](http://localhost:3000)

---

## 📧 Email Service Setup

- Get a free API key from [Resend.com](https://resend.com).
- Paste it into `.env.local` as `RESEND_API_KEY`.
- The HR email in `HR_EMAIL` receives feedback notifications.

---

## 🌐 Deploying to Vercel

1. Push your project to GitHub (instructions below).
2. Go to [vercel.com/import](https://vercel.com/import).
3. Select your repo, set `RESEND_API_KEY` and `HR_EMAIL` in the environment variables section.
4. Click **Deploy**.
5. Copy your public Vercel link and update below.

---

## 🧪 Demo/Test Instructions

- As HR, open the homepage and send a feedback request to any email you control (mailinator.com or your own email).
- Fill the form as the user. Check both HR and user emails for notifications.

---

## 📦 Push to GitHub

