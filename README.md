# SearchSchool

A Next.js App Router app that lets users add schools (with image upload) and browse them in a grid. Uses Tailwind CSS v4 for styling, mysql2 for the database driver, and Server Actions for inserts and revalidation.

### Clone
```plane
https://github.com/alankritip/Search_School
```

## Tech stack
* Next.js (App Router, Server/Client Components, Server Actions)

* Tailwind CSS v4 (PostCSS plugin, no tailwind.config required for basic usage)

* MySQL 8 + mysql2/promise

* TypeScript

## Project structure :

```plane
my-app/
├── app/ # Next.js App Router
│ ├── actions/ # Server Actions
│ │ └── schools.ts
│ ├── addSchool/ # Add School page
│ │ └── page.tsx
│ ├── showSchools/ # Show Schools page
│ │ └── page.tsx
│ ├── components/ # Reusable UI components
│ │ └── SchoolCard.tsx
│ ├── globals.css # Global styles
│ ├── layout.tsx # Root layout
│ └── favicon.ico # App favicon
│
├── lib/ # Utility functions & DB config
│ ├── db.ts
│ ├── utils.ts
│ └── validation.ts
│
├── public/ # Static assets (images, icons, etc.)
│
├── .env.local # Environment variables
├── .gitignore # Git ignored files
├── eslint.config.mjs # ESLint configuration
├── next.config.ts # Next.js configuration
├── next-env.d.ts # Next.js type definitions
├── package.json # Project metadata & dependencies
├── package-lock.json # Locked dependency tree
├── postcss.config.mjs # PostCSS configuration
├── tsconfig.json # TypeScript configuration
└── README.md # Project documentation
```

## Prerequisites

* Node.js 18.18+ installed.

* MySQL Server running locally or remotely, with a user that can create and query tables.

* On Windows, ensure mysql.exe is on PATH (or use MySQL Workbench)

## Install dependencies
### From the project root (level with package.json):
```code
npm install
```
### Configure Tailwind (v4)
postcss.config.mjs should contain:
```code
export default { plugins: { "@tailwindcss/postcss": {} } };
```
app/globals.css should import Tailwind:
```code
@import "tailwindcss";
```

app/layout.tsx must import 
```code
import./globals.css
```



###  Environment variables
Create .env.local at the project root
```plane
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_DATABASE=schoolsdb
MYSQL_USER=root
MYSQL_PASSWORD=your_password
```
### Create the database and table:
```plane
Connect via CLI or Workbench and run:
CREATE DATABASE IF NOT EXISTS schoolsdb;
USE schoolsdb;
CREATE TABLE IF NOT EXISTS schools (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
address VARCHAR(255) NOT NULL,
city VARCHAR(100) NOT NULL,
state VARCHAR(100) NOT NULL,
contact VARCHAR(20) NOT NULL,
image VARCHAR(255) NOT NULL,
email_id VARCHAR(255) NOT NULL
);

Then verify with SHOW TABLES; and DESCRIBE schools;
```
### Start the app
```plane
http://localhost:3000/addSchool — maps to app/addSchool/page.tsx. Routes are file-system based; the segment addSchool comes from the folder name.

http://localhost:3000/showSchools — maps to app/showSchools/page.tsx. Each folder with a page.tsx creates a route with the same casing.

Build: npm run build

Production: npm run start

### References

Next.js Server Actions guide

revalidatePath API

redirect API

Tailwind v4 with PostCSS

Next.js + Tailwind with App Router guide

Next.js API Route Handlers

## License

[MIT](https://choosealicense.com/licenses/mit/)