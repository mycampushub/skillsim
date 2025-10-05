# Supabase to Prisma Migration Guide

## Overview
Successfully converted your Supabase PostgreSQL schema to Prisma with SQLite. The conversion maintains all the original functionality while providing type-safe database access.

## Key Changes Made

### 1. Database Provider
- **From**: PostgreSQL (Supabase)
- **To**: SQLite (Local file-based database)
- **Location**: `/home/z/my-project/db/custom.db`

### 2. Schema Conversion
All your original tables have been converted to Prisma models:

#### Users Table → User Model
```prisma
model User {
  id            String   @id @default(cuid())
  name          String
  email         String   @unique
  phone         String
  password      String
  isPaid        Boolean  @default(false) @map("is_paid")
  paymentStatus String   @default("pending") @map("payment_status")
  role          String   @default("user")
  referralCode  String?  @map("referral_code")
  createdAt     DateTime @default(now()) @map("created_at")
  updatedAt     DateTime @updatedAt @map("updated_at")
  
  // Relations
  payments     Payment[]
  devices      Device[]
  userSessions UserSession[]
}
```

#### Payments Table → Payment Model
```prisma
model Payment {
  id                  String    @id @default(cuid())
  userId              String    @map("user_id")
  amount              Decimal
  paymentMethod       String    @map("payment_method")
  status              String    @default("pending")
  bKashTransactionId  String?   @map("bKash_transaction_id")
  verifiedAt          DateTime? @map("verified_at")
  createdAt           DateTime  @default(now()) @map("created_at")
  updatedAt           DateTime  @updatedAt @map("updated_at")
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

#### Devices Table → Device Model
```prisma
model Device {
  id         String   @id @default(cuid())
  userId     String   @map("user_id")
  deviceId   String   @map("device_id")
  deviceInfo String?  @map("device_info")
  isActive   Boolean  @default(true) @map("is_active")
  lastActive DateTime @default(now()) @map("last_active")
  createdAt  DateTime @default(now()) @map("created_at")
  updatedAt  DateTime @updatedAt @map("updated_at")
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

#### User Sessions Table → UserSession Model
```prisma
model UserSession {
  id        String   @id @default(cuid())
  userId    String   @map("user_id")
  token     String
  expiresAt DateTime @map("expires_at")
  createdAt DateTime @default(now()) @map("created_at")
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

## Features Maintained

### ✅ Relationships
- One-to-many relationships preserved
- Cascade deletes maintained
- Foreign key constraints enforced

### ✅ Data Types
- UUID → String (with cuid() default)
- Timestamp → DateTime
- Boolean → Boolean
- VARCHAR → String
- DECIMAL → Decimal

### ✅ Constraints
- Unique constraints (email)
- Default values
- Not null constraints
- Optional fields (referralCode, etc.)

### ✅ Indexes
- Prisma automatically creates indexes for:
  - Primary keys
  - Foreign keys
  - Unique constraints
  - Additional indexes can be added with `@@index`

## New Database Client

### Import Statement
```typescript
import { db } from '@/lib/db'
```

### Usage Examples

#### Create User
```typescript
const user = await db.user.create({
  data: {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    password: "hashedPassword"
  }
})
```

#### Find User by Email
```typescript
const user = await db.user.findUnique({
  where: { email: "john@example.com" },
  include: {
    payments: true,
    devices: true,
    userSessions: true
  }
})
```

#### Update Payment Status
```typescript
const payment = await db.payment.update({
  where: { id: "paymentId" },
  data: {
    status: "verified",
    verifiedAt: new Date()
  }
})
```

## Available Scripts

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database (development)
npm run db:push

# Create and run migrations (production)
npm run db:migrate

# Open Prisma Studio (database GUI)
npm run db:studio
```

## Security Considerations

### Row Level Security (RLS)
- Supabase RLS policies are not directly transferable to Prisma
- Implement authorization at the application level
- Use middleware or service functions to enforce access rules

### Example Authorization Middleware
```typescript
// Example: Ensure users can only access their own data
export async function getUserPayments(userId: string) {
  return await db.payment.findMany({
    where: { userId }
  })
}
```

## Migration Steps

1. **Install Dependencies**: ✅ Done
   ```bash
   npm install prisma @prisma/client
   ```

2. **Initialize Prisma**: ✅ Done
   ```bash
   npx prisma init
   ```

3. **Convert Schema**: ✅ Done
   - Created `prisma/schema.prisma`
   - Converted all tables to models
   - Maintained relationships

4. **Set Up Database Client**: ✅ Done
   - Created `lib/db.ts`
   - Generated Prisma client

5. **Test Connection**: ✅ Done
   - Database connected successfully
   - Schema validated

## Next Steps

1. **Update Application Code**
   - Replace Supabase client calls with Prisma queries
   - Update authentication logic
   - Modify API endpoints

2. **Data Migration** (if needed)
   - Export data from Supabase
   - Transform data format if necessary
   - Import to SQLite database

3. **Testing**
   - Test all database operations
   - Verify relationships work correctly
   - Test error handling

4. **Deployment**
   - Ensure production database is configured
   - Run migrations in production
   - Update environment variables

## Benefits of Prisma

- **Type Safety**: Full TypeScript support
- **Auto-completion**: Better IDE experience
- **Query Optimization**: Efficient database queries
- **Migrations**: Version-controlled schema changes
- **Studio**: Visual database management
- **Performance**: Optimized query generation

## Support

For any issues during migration:
1. Check Prisma documentation: https://www.prisma.io/docs
2. Use `npm run db:studio` to inspect database
3. Run `npm run db:push` to sync schema changes
4. Check this guide for common patterns