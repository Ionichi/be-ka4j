# Web API for KA4J 🎖️

KA4J is a Sunday School where every child is guided to grow and develop spiritually. This API created to help and manage the Sunday School Attendance and Activity Report.

## 🎯 Features

- Child and teacher absences
- Activity coupon management

## 🛠️ Tech Stack

- **Express.js**
- **Typescript**
- **Prisma (ORM)**

## 🚀 Getting Started

1. Install depedencies :

    ```
    pnpm install
    ```

2. Set up environment variables:
    - Copy .env.example to .env and fill in required values (database, etc)

3. Run database migrations:

    ```
    pnpm prisma migrate dev
    pnpm prisma generate
    ```

4. Start the development server (`http://localhost:3000`):
    ```
    pnpm run dev
    ```

## 🗂️ Project Structure

```
📁 be-ka4j/
│
├── 📁 prisma/
│   ├── 📁 migrations/📄...
│   └── 📄 schema.prisma
│
├── 📁 src/
│   ├── 📁 domain/📁.../📄...
│   ├── 📁 middleware/📄...
│   ├── 📁 routes/📄...
│   ├── 📁 utils/📄...
│   └── 📄 index.ts
│
├── 📄 .env
├── 📄 .env.example
├── 📄 .eslintignore
├── 📄 .eslintrc.json
├── 📄 .gitignore
├── 📄 .nvmrc
├── 📄 .prettierignore
├── 📄 .prettierrc
├── 📄 docker-compose.yml
├── 📄 jest.config.ts
├── 📄 LICENSE
├── 📄 package.json
├── 📄 pnpm-lock.yaml
├── 📄 README.md
└── 📄 tsconfig.json
```

# 📜 License

MIT
