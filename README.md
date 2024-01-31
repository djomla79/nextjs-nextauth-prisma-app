# nextjs-nextauth-prisma-app

### This application demonstrates the integration of NextAuth for authentication with both credentials and Google in a Next.js environment.

### It utilizes Prisma for database operations and employs React Hook Form with Zod validation for form handling.

### Additionally, Tailwind CSS is used for styling, and the entire project is implemented in TypeScript.

## Run The App

Use `npm install` command to install all dependencies.

Use `npm run dev` command to run the app on `http://localhost:3000` in dev mode.

## Prisma

### Prisma Studio

Use `npx prisma studio` command to view and edit data in prisma db on `http://localhost:5555`.

### Prisma with Nextjs Documentation

For more details go to: [Prisma with Nextjs quickstart](https://www.prisma.io/docs/getting-started/quickstart)

## Prerequisites

Set following variables in your `.env` or `.env.local` file.
If you use `.env` file, don't forget to include it in your `.gitignore` file.

```
NEXTAUTH_URL=http://localhost:3000/
NEXTAUTH_SECRET=your-generated-secret-key
SMTP_USER=your-smtp-user
SMTP_PASSWORD=your-smtp-password
JWT_SECRET_KEY=your-generated-secret-key
```

`For windows users:` to generate secret keys, open git bash in terminal and run this command `openssl rand -base64 32`.

If you don't want to use generator at all, you can type random letters and numbers.

## Email Activation Testing

To facilitate testing of the email activation link, it is necessary to create a Nodemailer SMTP user and password.

You can leverage platforms such as [Mailtrap](https://mailtrap.io/), [Mailchimp](https://mailchimp.com/), or similar services for comprehensive email activation testing for free.

Navigate to Email Testing and Settings on the chosen platform, select Nodemailer for SMTP integrations, and obtain the user and password from the auth object.

Copy and paste these user and password values into the `SMTP_USER` and `SMTP_PASSWORD` fields in your `.env` or `.env.local` file.

After registering a new user, an email activation link will be promptly sent to the provided email address submitted in the form.

Administrator users have an option to activate user directly on Admin page.

## Recommended Setup On Registration

### Create Admin User

1. Start the app
2. Register a user
3. Open Prisma Studio using `npx prisma studio` and visit on `http://localhost:5555`
4. Edit the user's role to `admin` and save changes
5. The user with admin privileges will now be authorized to access the Admin Page.

An admin user has the option to create, view, edit, and delete users.
