📨 Postme — A NestJS Microservices Monorepo

Postme is a distributed post management platform built with NestJS
, designed to demonstrate a clean microservices architecture using a monorepo setup.
It showcases modular design, inter-service communication, and clean API gateway orchestration.

🏗️ Architecture Overview

The system follows a microservices architecture using NestJS and TCP-based inter-service communication.
```
apps/
├── postme/           # API Gateway - main entry point
├── users/            # Users service (authentication, profile, followers)
├── posts/            # Posts service (CRUD operations, likes)
├── notifications/    # Notifications service (async events)
libs/
└── postme-common/    # Shared library (DTOs, entities, enums, utils)
```

Each service runs independently but communicates over NestJS microservice messaging (TCP transport).

⚙️ Features

* 🧩 Monorepo setup using @nestjs/cli

* 🔌 Microservices communication via TCP

* 🌐 API Gateway handling HTTP requests and orchestrating services

* 💬 Localization (i18n) integrated in the API Gateway

* 🗃️ TypeORM integration for database entities and relations

* 🔄 DTOs & Shared Models in a reusable library

* 🧠 Clean architecture and modular service boundaries

🚀 Getting Started
1. Clone the repository
``` Terminal command
git clone https://github.com/MohammadHoseinS/postme.git
cd postme
```

2. Install dependencies
``` Terminal command
npm install
```

3. Setup environment variables

Create a .env file in the project root. Example:
``` env file
# api gateway - postme app
POSTME_HOST="localhost"
POSTME_PORT=3000

# users service
USERS_SERVICE_HOST="localhost"
USERS_SERVICE_PORT=3001
USERS_DATABASE_HOSTNAME="localhost"
USERS_DATABASE_PORT=3306
USERS_DATABASE_USERNAME="username"
USERS_DATABASE_PASSWORD="password"
USERS_DATABASE_NAME=postme_users

# posts service
POSTS_SERVICE_HOST="localhost"
POSTS_SERVICE_PORT=3002
POSTS_DATABASE_HOSTNAME="localhost"
POSTS_DATABASE_PORT=3306
POSTS_DATABASE_USERNAME="username"
POSTS_DATABASE_PASSWORD="password"
POSTS_DATABASE_NAME=postme_posts

# notifications service
NOTIFICATIONS_SERVICE_HOST="localhost"
NOTIFICATIONS_SERVICE_PORT=3003
```

4. Run all services (not in watch mode)
``` Terminal command
npm run start:all
```

Or run individual services:

``` Terminal command
npm run start:dev:users
npm run start:dev:postme
npm run start:dev:posts
npm run start:dev:notifications
```

🧱 Technology Stack

* Framework: NestJS

* Database: MySQL with TypeORM

* Language: TypeScript

* Communication: TCP (NestJS Microservices)

* Localization: nestjs-i18n

* Monorepo Management: Nest CLI

* Runtime: Node.js 22+

🧩 Shared Library (postme-common)

This library includes:

* DTOs

* Entities (for shared schemas)

* Enums

* Utility classes (e.g., BaseMicroserviceClient)

This allows all services — and even frontend apps — to share consistent models and data types.

📬 Example Communication

API Gateway → Users Service
``` Nest.Js TypeScript
const user = await this.usersClient.getById(1);
```

Users Service
``` Nest.Js TypeScript
@MessagePattern('users.get')
getUserById(id: number): Promise<User> {
  const user = this.userRepository.findOneBy({ id });
  if (!user) throw new RpcException({ statusCode: 404, message: 'user.exceptions.notFound' });
  return user;
}
```

🧠 TODO / Future Improvements

 * Add authentication (JWT)

 * Add google / apple authentication (OAuth 2.0)

 * Add message queue (e.g., RabbitMQ)

 * Add Docker support for easier setup

 * Add unit/integration tests for each service
