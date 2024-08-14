# Bidly

## Project Description
Bidly is a web application built with Next.js. It is an auction platform where users can show off their items for sale, and others can offer bids on them. 
It leverages various libraries and tools to provide a robust and scalable platform for its users. This project includes features such as authentication, form handling, and database interactions.

## Installation

To get started with the project, clone the repository and install the dependencies:

```bash
git clone https://github.com/efronic/bidly
cd bidly
npm install
```

## Scripts

The following scripts are available in the project:

- **dev**: Starts the development server.
- **build**: Builds the application for production.
- **start**: Starts the application in production mode.
- **lint**: Runs ESLint to check for code quality issues.
- **db:push**: Pushes the database schema using Drizzle Kit.
- **db:studio**: Opens the database studio.

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run db:push
npm run db:studio
```

## Dependencies

The project relies on several dependencies to function correctly. Here are some of the key dependencies:

- `@auth/drizzle-adapter`: Authentication adapter for Drizzle.
- `@aws-sdk/client-s3`: AWS SDK for S3.
- `@aws-sdk/s3-request-presigner`: AWS SDK for S3 request presigning.
- `@hookform/resolvers`: Resolvers for React Hook Form.
- `@kinde-oss/kinde-auth-nextjs`: Kinde authentication for Next.js.
- `@knocklabs/node`: Knock Labs Node.js SDK.
- `@knocklabs/react`: Knock Labs React SDK.
- `@radix-ui/react-dropdown-menu`: Radix UI Dropdown Menu component.
- `@radix-ui/react-label`: Radix UI Label component.
- `@radix-ui/react-popover`: Radix UI Popover component.
- `@radix-ui/react-slot`: Radix UI Slot component.
- `@t3-oss/env-nextjs`: Environment variables management for Next.js.
- `class-variance-authority`: Utility for managing class variance.
- `clsx`: Utility for constructing className strings.
- `date-fns`: Date utility library.
- `drizzle-orm`: ORM for database interactions.
- `lucide-react`: React icons library.
- `next`: Next.js framework.
- `next-auth`: Authentication for Next.js.
- `postgres`: PostgreSQL client.
- `react`: React library.
- `react-day-picker`: Date picker component for React.
- `react-dom`: React DOM library.
- `react-hook-form`: Form handling library for React.
- `tailwind-merge`: Utility for merging Tailwind CSS classes.
- `tailwindcss-animate`: Tailwind CSS animations.
- `zod`: TypeScript-first schema declaration and validation library.

## Dev Dependencies

The project also includes several development dependencies:

- `@types/node`: TypeScript definitions for Node.js.
- `@types/react`: TypeScript definitions for React.
- `@types/react-dom`: TypeScript definitions for React DOM.
- `drizzle-kit`: Drizzle Kit for database management.
- `eslint`: Linter for JavaScript and TypeScript.
- `eslint-config-next`: ESLint configuration for Next.js.
- `postcss`: Tool for transforming CSS.
- `tailwindcss`: Utility-first CSS framework.
- `typescript`: TypeScript language.

## Usage

To start the development server, run:

```bash
npm run dev
```

To build the application for production, run:

```bash
npm run build
```

To start the application in production mode, run:

```bash
npm run start
```

To lint the code, run:

```bash
npm run lint
```

To push the database schema, run:

```bash
npm run db:push
```

To open the Drizzle Kit studio, run:

```bash
npm run db:studio
```

## Spinning Up the PostgreSQL Docker Image

To spin up the PostgreSQL instance using Docker, follow these steps:

1. **Ensure Docker is installed**: Make sure you have Docker installed on your machine. You can download it from [Docker's official website](https://www.docker.com/products/docker-desktop).

2. **Navigate to the project directory**: Open a terminal and navigate to the directory containing the `docker-compose.yml` file.

    ```sh
    cd path/to/your/project
    ```

3. **Run Docker Compose**: Use the following command to start the PostgreSQL container defined in the `docker-compose.yml` file.

    ```sh
    docker-compose up -d
    ```

    The `-d` flag runs the containers in the background (detached mode).

4. **Verify the container is running**: You can check if the PostgreSQL container is running by using the following command:

    ```sh
    docker ps
    ```

    You should see a container named `bidly_db` in the list.

5. **Access the PostgreSQL instance**: The PostgreSQL instance will be accessible on port `5432` of your localhost. You can connect to it using any PostgreSQL client with the following credentials:

    - **Host**: `localhost`
    - **Port**: `5432`
    - **Username**: `postgres`
    - **Password**: `example`

6. **Stopping the container**: To stop the PostgreSQL container, run:

    ```sh
    docker-compose down
    ```

This will stop and remove the container, but the data will be preserved in the Docker volume named `postgres`.
## Contributing

If you would like to contribute to the project, please fork the repository and submit a pull request. We welcome all contributions!

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
