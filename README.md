# Distributed Notification Gateway (DNG)

## Overview
DNG is a notification system built using TurboRepo.  
It separates API requests from background workers for asynchronous Email/SMS delivery.  
Tech Stack: Node.js, TypeScript, Express, PostgreSQL + Prisma, SendGrid, Twilio.

## Structure
```

apps/
├─ api/       # REST API
└─ workers/   # Background worker
packages/
├─ database/  # DB logic
└─ shared-schema/ # Types & enums

````

## Commands
```bash
pnpm install                   # Install dependencies
pnpm run build                 # Build all packages
pnpm --filter api start        # Run API
pnpm --filter workers start    # Run Worker
````

## Endpoints

* `POST /v1/notifications` → Create notification
* `GET /v1/notifications/:id` → Check status (PENDING, PROCESSING, COMPLETED, FAILED)