# Meme Norris - Next.js Project

This is a Next.js project called **Meme Norris**, designed as a web application for sharing and viewing memes. The application utilizes Supabase for authentication.

## Live Demo

You can view the live webpage here:

[https://meme-norris.vercel.app/](https://meme-norris.vercel.app/)

> **Note:** The authentication was done with Supabase, and the authentication functionality may not work due to inactivity of the project on Supabase.

## Running the Project Locally

To run this project locally, follow these steps:

### Prerequisites

Make sure you have **Node.js** and **npm** (or **yarn**) installed on your machine.

### Steps

1. **Clone the repository**:

    ```bash
    git clone <repository-url>
    ```

2. **Navigate to the project directory**:

    ```bash
    cd meme-norris
    ```

3. **Install dependencies**:

    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```

4. **Set up environment variables**:

    - Create a `.env.local` file in the root of the project.
    - Add your **Supabase keys** to this file in the following format:

      ```plaintext
      NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
      NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
      ```

5. **Run the development server**:

    ```bash
    npm run dev
    ```
    or
    ```bash
    yarn dev
    ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Tech Stack

- **Next.js** - The React framework for server-rendered applications.
- **Supabase** - Provides backend services such as authentication and database management.
- **Vercel** - Hosting platform for deploying the application.

## License

This project is open source and available under the [MIT License](LICENSE).

