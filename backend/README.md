# todo-app-with-next-and-graphql

## Prisma Migrations
To migrate new database alterations, do:
```bash
npx prisma migrate dev --name "migration title" --schema "./src/infrastructure/database/prisma/schema.prisma"
```