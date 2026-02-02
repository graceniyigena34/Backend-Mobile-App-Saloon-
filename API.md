# Mobile Salon Backend API

## Authentication Endpoints

### POST /api/auth/register
Register a new user
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "customer" // or "owner"
}
```

### POST /api/auth/login
Login user
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

## Service Endpoints

### GET /api/services
Get all active services (public)

### POST /api/services
Create new service (owner only)
```json
{
  "name": "Haircut",
  "description": "Professional haircut service",
  "duration": 60,
  "price": 25.00,
  "category": "Hair"
}
```

### PUT /api/services/:id
Update service (owner only)

### DELETE /api/services/:id
Soft delete service (owner only)

## Booking Endpoints

### POST /api/bookings
Create new booking (authenticated)
```json
{
  "service": "service_id",
  "date": "2024-01-15",
  "time": "10:00",
  "notes": "Optional notes"
}
```

### GET /api/bookings
Get bookings (customers see their own, owners see all)

### PUT /api/bookings/:id/status
Update booking status (owner only)
```json
{
  "status": "confirmed" // pending, confirmed, completed, cancelled
}
```

## Headers
For protected routes, include:
```
Authorization: Bearer <jwt_token>
```