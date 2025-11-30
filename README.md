# BlogForge AI

BlogForge AI is a modern, full-stack blog platform powered by Next.js 15 and AI. It empowers writers with intelligent tools for content generation, SEO optimization, and idea brainstorming, all wrapped in a sleek, responsive interface.

![BlogForge AI Mission](/about-mission.png)

## 🚀 Features

-   **AI-Powered Writing**: Generate full blog posts and outlines using advanced AI (OpenAI/Gemini).
-   **SEO Assistant**: Real-time SEO analysis and metadata generation to boost visibility.
-   **Modern Editor**: Rich text editor with media support for crafting engaging stories.
-   **Role-Based Access**: Secure authentication (NextAuth) with User and Admin roles.
-   **Admin Dashboard**: Comprehensive dashboard for managing posts, users, and analytics.
-   **Media Management**: Seamless image uploads via UploadThing.
-   **Responsive Design**: Built with Tailwind CSS and Shadcn/ui for a premium experience on any device.
-   **Dark Mode**: Fully supported dark/light themes.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Language**: TypeScript
-   **Database**: PostgreSQL (via [Prisma ORM](https://www.prisma.io/))
-   **Auth**: [NextAuth.js](https://next-auth.js.org/) (v5 compatible)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn/ui](https://ui.shadcn.com/)
-   **AI**: OpenAI API / Google Gemini
-   **Storage**: [UploadThing](https://uploadthing.com/)

## 🏁 Getting Started

### Prerequisites

-   Node.js 18+
-   PostgreSQL database

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/blogforge-ai.git
    cd blogforge-ai
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root directory and add the following:

    ```env
    DATABASE_URL="postgresql://..."
    NEXTAUTH_SECRET="your-secret"
    NEXTAUTH_URL="http://localhost:3000"

    # OAuth Providers
    GOOGLE_CLIENT_ID=""
    GOOGLE_CLIENT_SECRET=""
    GITHUB_ID=""
    GITHUB_SECRET=""

    # AI Services
    OPENAI_API_KEY=""
    GOOGLE_API_KEY=""

    # UploadThing
    UPLOADTHING_SECRET=""
    UPLOADTHING_APP_ID=""
    ```

4.  **Initialize the database:**

    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📜 Scripts

-   `npm run dev`: Start the development server.
-   `npm run build`: Build the application for production.
-   `npm start`: Start the production server.
-   `npm run lint`: Run ESLint.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.