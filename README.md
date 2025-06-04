# Guest Request Management System

A comprehensive full-stack WhatsApp-based guest request logging system. Features n8n.io workflow automation, NestJS backend, and Next.js dashboard with real-time request management capabilities.

## License

This project is licensed under the MIT License – see the [LICENSE](./LICENSE) file for details.


##  Features

### WhatsApp Integration (n8n.io)

![Screenshot 2025-05-28 233536](https://github.com/user-attachments/assets/5683abec-2f13-42f3-83b6-e0ac1d3b12ae)


- **Automated Workflow**: WhatsApp Business API webhook processing
- **Guest Request Handling**: Extract phone numbers and request text
- **Auto-Response**: Instant confirmation messages to guests
- **Error Handling**: Robust workflow with fallback mechanisms


### Backend API (NestJS)

- **RESTful Endpoints**: Create and retrieve guest requests
- **Database Integration**: PostgreSQL with Prisma ORM
- **Type Safety**: Full TypeScript implementation
- **Validation**: Phone number and request text validation


### Frontend Dashboard (Next.js)

- **Real-time Display**: Live guest request monitoring
- **Mobile-First Design**: Responsive luxury hotel interface
- **TanStack Query**: Efficient data fetching and caching
- **Zustand State Management**: Lightweight state management


### Infrastructure

- **Vercel Deployment**: Serverless hosting with auto-scaling
- **WhatsApp Business API**: Sandbox integration for testing
- **Cloud Database**: Supabase PostgreSQL hosting
- **CI/CD Pipeline**: Automated deployment on push


##  Tech Stack

### Workflow Automation

- **n8n.io** - Visual workflow automation
- **WhatsApp Business API** - Messaging integration
- **Webhook Processing** - Real-time message handling


### Backend

![image](https://github.com/user-attachments/assets/6dfe5e31-8625-43fc-beb8-0b64bff01622)


- **NestJS 10.x** - Progressive Node.js framework
- **TypeScript 5.x** - Type-safe development
- **Prisma** - Next-generation ORM
- **PostgreSQL** - Robust relational database
- **class-validator** - Decorator-based validation


### Frontend

![image](https://github.com/user-attachments/assets/261ada02-fbd4-439c-9aaa-0af520e0e2b2)


- **Next.js 14.x** - React framework with App Router
- **TanStack Query** - Powerful data synchronization
- **Zustand** - Simple state management
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality components


### Infrastructure

- **Vercel** - Serverless deployment platform
- **Supabase** - PostgreSQL hosting
- **GitHub Actions** - CI/CD automation


##  Architecture

```plaintext
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   WhatsApp      │    │   n8n.io        │    │   NestJS API    │    │   PostgreSQL    │
│   Business API  │    │   Workflow      │    │                 │    │                 │
│                 │───►│                 │───►│  - Controllers  │───►│  - Requests     │
│  - Webhooks     │    │  - Triggers     │    │  - Services     │    │  - Audit Logs   │
│  - Messages     │    │  - Processing   │    │  - Validation   │    │  - Users        │
│  - Auto-Reply   │    │  - API Calls    │    │  - DTOs         │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘    └─────────────────┘
                                                        ▲
                                                        │
┌─────────────────┐                                    │
│   Next.js       │                                    │
│   Dashboard     │────────────────────────────────────┘
│                 │
│  - Request List │
│  - Real-time UI │
│  - TanStack     │
│  - Zustand      │
└─────────────────┘
```

## Installation & Setup

### Prerequisites

- Node.js 18.x+
- npm or yarn
- PostgreSQL database (Supabase recommended)
- WhatsApp Business API sandbox account
- n8n.io account (free tier)


### 1. Clone Repository

```shellscript
git clone https://github.com/yourusername/travel-studio-intern-assignment.git
cd travel-studio-intern-assignment
```

### 2. Backend Setup

```shellscript
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# Start development server
npm run start:dev
```

### 3. Frontend Setup

```shellscript
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit with your API endpoints

# Start development server
npm run dev
```

### 4. n8n.io Workflow Setup

```shellscript
# Install n8n globally
npm install -g n8n

# Start n8n
n8n start

# Import workflow
# 1. Open http://localhost:5678
# 2. Import workflow/request-workflow.json
# 3. Configure WhatsApp Business API credentials
# 4. Activate workflow
```

##  Environment Variables

### Backend (.env)

```plaintext
# Database Configuration
DATABASE_URL="postgresql://username:password@host:port/database"

# Supabase Configuration
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Application Configuration
NODE_ENV="development"
PORT=3000

# n8n Integration
N8N_WEBHOOK_URL="http://localhost:5678/webhook/whatsapp"
```


### n8n.io Configuration

```plaintext
# WhatsApp Business API
WHATSAPP_ACCESS_TOKEN="your-access-token"
WHATSAPP_PHONE_NUMBER_ID="your-phone-number-id"
WHATSAPP_WEBHOOK_VERIFY_TOKEN="your-verify-token"

# Backend API
NESTJS_API_URL="http://localhost:3000/api" (Deployed as well)
```

## 📱 WhatsApp Business API Setup

### 1. Create Sandbox Account

1. Visit [Facebook Developers](https://developers.facebook.com/)
2. Create new app → Business → WhatsApp
3. Add WhatsApp product to your app
4. Get test phone number and access token


### 2. Configure Webhook

```shellscript
# Webhook URL (for n8n.io)
https://your-n8n-instance.com/webhook/whatsapp

# Verify Token
your-custom-verify-token

# Webhook Fields
messages, message_status
```

### 3. Test Message Format

```json
{
  "object": "whatsapp_business_account",
  "entry": [{
    "changes": [{
      "value": {
        "messages": [{
          "from": "1234567890",
          "text": {
            "body": "I need extra towels in room 205"
          }
        }]
      }
    }]
  }]
}
```

## n8n.io Workflow

### Workflow Structure

```json
{
  "name": "WhatsApp Guest Request Handler",
  "nodes": [
    {
      "name": "WhatsApp Webhook",
      "type": "n8n-nodes-base.webhook",
      "parameters": {
        "path": "whatsapp",
        "httpMethod": "POST"
      }
    },
    {
      "name": "Extract Message Data",
      "type": "n8n-nodes-base.function",
      "parameters": {
        "functionCode": "// Extract phone and message text\nconst entry = items[0].json.entry[0];\nconst message = entry.changes[0].value.messages[0];\n\nreturn [{\n  json: {\n    guestPhone: message.from,\n    requestText: message.text.body,\n    timestamp: new Date().toISOString()\n  }\n}];"
      }
    },
    {
      "name": "Save to NestJS API",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "url": "http://localhost:3000/api/requests",
        "method": "POST",
        "sendBody": true,
        "bodyParameters": {
          "guestPhone": "={{$json.guestPhone}}",
          "requestText": "={{$json.requestText}}"
        }
      }
    },
    {
      "name": "Send WhatsApp Reply",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "url": "https://graph.facebook.com/v17.0/{{$env.WHATSAPP_PHONE_NUMBER_ID}}/messages",
        "method": "POST",
        "sendHeaders": true,
        "headerParameters": {
          "Authorization": "Bearer {{$env.WHATSAPP_ACCESS_TOKEN}}"
        },
        "sendBody": true,
        "bodyParameters": {
          "messaging_product": "whatsapp",
          "to": "={{$json.guestPhone}}",
          "text": {
            "body": "Request received! Our staff will assist you soon. 🏨"
          }
        }
      }
    }
  ]
}
```

##  API Documentation

### Endpoints

#### Create Guest Request

```plaintext
POST /api/requests
Content-Type: application/json

{
  "guestPhone": "+919876543210",
  "requestText": "Need extra towels in room 205"
}
```

**Response:**

```json
{
  "id": 1,
  "guestPhone": "+919876543210",
  "requestText": "Need extra towels in room 205",
  "status": "pending",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

#### Get Pending Requests

```plaintext
GET /api/requests
```

**Response:**

```json
[
  {
    "id": 1,
    "guestPhone": "+919876543210",
    "requestText": "Need extra towels in room 205",
    "status": "pending",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  {
    "id": 2,
    "guestPhone": "+919876543211",
    "requestText": "Room service for breakfast",
    "status": "pending",
    "createdAt": "2024-01-15T11:00:00Z"
  }
]
```

#### Update Request Status

```plaintext
PATCH /api/requests/:id
Content-Type: application/json

{
  "status": "completed"
}
```

### Error Responses

```json
{
  "error": "Validation failed",
  "message": "Phone number must be a valid format",
  "statusCode": 400
}
```

##  Deployment

### Vercel Deployment (Frontend)

1. **Connect Repository**


```shellscript
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

2. **Environment Variables**
Add in Vercel dashboard:


- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_WS_URL`


3. **Custom Domain**
Configure: `'


### Backend Deployment (Vercel Serverless)

1. **Configure vercel.json**


```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/main.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/main.ts"
    }
  ]
}
```

2. **Environment Variables**
Add in Vercel:


- `DATABASE_URL`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`


### n8n.io Cloud Deployment

1. **Sign up**: [n8n.io cloud](https://n8n.io/cloud/)
2. **Import Workflow**: Upload `workflow/request-workflow.json`
3. **Configure Credentials**: Add WhatsApp Business API tokens
4. **Activate Workflow**: Enable webhook endpoint


##  Testing

### Manual Testing Flow

1. **WhatsApp Message**


```plaintext
Send to test number: "I need room service"
```

2. **Verify n8n.io Workflow**


```shellscript
# Check workflow execution logs
# Verify API call to NestJS backend
```

3. **Check Database**


```sql
SELECT * FROM requests WHERE status = 'pending';
```



##  Monitoring & Analytics

### Request Tracking

- **Real-time Dashboard**: Live request monitoring
- **Status Updates**: Pending → In Progress → Completed
- **Response Times**: Track staff response efficiency
- **Guest Satisfaction**: Optional feedback collection


### Performance Metrics

- **API Response Times**: Monitor backend performance
- **Workflow Execution**: Track n8n.io processing times
- **Database Queries**: Optimize with Prisma insights
- **Frontend Loading**: Core Web Vitals monitoring


##  Security & Best Practices

### API Security

- **Input Validation**: Comprehensive request validation
- **Rate Limiting**: Prevent API abuse
- **CORS Configuration**: Secure cross-origin requests
- **Environment Variables**: Secure credential management


### WhatsApp Security

- **Webhook Verification**: Verify Facebook webhook signatures
- **Token Management**: Secure access token handling
- **Message Validation**: Validate incoming message format
- **Error Handling**: Graceful failure management


### Database Security

- **Connection Pooling**: Efficient database connections
- **Query Optimization**: Prevent SQL injection
- **Data Encryption**: Secure sensitive information
- **Backup Strategy**: Regular database backups


##  Troubleshooting

### Common Issues

**WhatsApp Webhook Not Receiving Messages**

```shellscript
# Check webhook URL configuration
# Verify access token validity
# Test with WhatsApp API test tool
```

**n8n.io Workflow Failing**

```shellscript
# Check workflow execution logs
# Verify API endpoint connectivity
# Test individual nodes
```

**Database Connection Issues**

```shellscript
# Verify DATABASE_URL format
# Check Supabase connection limits
# Test with Prisma Studio: npx prisma studio
```

**Frontend API Errors**

```shellscript
# Check CORS configuration
# Verify API endpoint URLs
# Monitor network requests in DevTools
```

**Deployment Issues**

```shellscript
# Check Vercel build logs
# Verify environment variables
# Test local build: npm run build
```

## Performance Optimization

### Backend Optimization

- **Database Indexing**: Optimize query performance
- **Connection Pooling**: Efficient database connections
- **Caching Strategy**: Redis for frequently accessed data
- **API Response Compression**: Reduce payload size


### Frontend Optimization

- **Code Splitting**: Lazy load components
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: Monitor and reduce bundle size
- **Service Worker**: Offline functionality


### Workflow Optimization

- **Parallel Processing**: Optimize n8n.io workflow execution
- **Error Recovery**: Implement retry mechanisms
- **Monitoring**: Track workflow performance metrics
- **Scaling**: Handle increased message volume




##  Acknowledgments


- **n8n.io** for powerful workflow automation
- **WhatsApp Business API** for messaging integration
- **NestJS** for the robust backend framework
- **Next.js** for the excellent frontend framework
- **Vercel** for seamless deployment platform







