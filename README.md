# RAG PDF Chat System

A Retrieval-Augmented Generation (RAG) application that allows users to upload PDF documents and chat with their content using OpenAI, LangChain, Qdrant Vector Database, BullMQ, and Next.js.

## Features

* User Authentication with Clerk
* Secure PDF Upload
* Background PDF Processing using BullMQ
* PDF Parsing and Chunking with LangChain
* Vector Embedding Generation using OpenAI
* Qdrant Vector Database Integration
* Semantic Search over PDF Content
* AI-Powered Chat Interface
* Dockerized Infrastructure for Qdrant and Valkey

---

## Architecture

```text
User
  │
  ▼
Next.js Frontend
  │
  ├── Clerk Authentication
  │
  ├── Upload PDF
  ▼
Express.js API
  │
  ├── Store PDF using Multer
  ├── Add Job to BullMQ Queue
  ▼
BullMQ Worker
  │
  ├── Load PDF using LangChain
  ├── Split into Chunks
  ├── Generate OpenAI Embeddings
  └── Store Embeddings in Qdrant
        │
        ▼
     Qdrant DB

----------------------------------

User Question
      │
      ▼
Next.js Chat UI
      │
      ▼
Express.js API
      │
      ├── Generate Query Embedding
      ├── Search Similar Chunks in Qdrant
      └── Send Context + Question to OpenAI
              │
              ▼
        AI Response
```

---

## Tech Stack

### Frontend

* Next.js
* React.js
* TypeScript
* Clerk Authentication

### Backend

* Node.js
* Express.js
* Multer
* BullMQ
* LangChain

### AI & Vector Search

* OpenAI
* LangChain
* Qdrant Vector Database

### Infrastructure

* Docker
* Docker Compose
* Valkey (Redis Compatible Queue Backend)

---

## Project Workflow

### PDF Upload

1. User signs in using Clerk.
2. Authenticated user uploads a PDF.
3. Frontend sends PDF to Express API.
4. Multer stores the file in the uploads directory.
5. A BullMQ job is created for PDF processing.

### PDF Processing

1. Worker picks the queued job.
2. LangChain loads the PDF.
3. PDF is split into smaller chunks.
4. OpenAI generates embeddings.
5. Embeddings are stored in Qdrant.

### Chat with PDF

1. User asks a question.
2. OpenAI generates an embedding for the query.
3. Similar chunks are retrieved from Qdrant.
4. Relevant context and user query are sent to OpenAI.
5. AI-generated response is returned to the user.

---

## Prerequisites

Install the following before starting:

* Node.js 18+
* Docker
* Docker Compose
* OpenAI API Key
* Clerk Account

---

## Environment Variables

### Frontend (.env.local)

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (.env)

```env
OPENAI_API_KEY=

QDRANT_URL=http://localhost:6333

VALKEY_HOST=localhost
VALKEY_PORT=6379
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/web-nirav/rag-pdf-bullmq-qdrantdb.git

cd rag-pdf-bullmq-qdrantdb
```

---

## Start Infrastructure

Run Qdrant and Valkey using Docker Compose:

```bash
docker compose up -d
```

Verify services:

```bash
docker ps
```

Expected services:

* Qdrant
* Valkey

---

## Frontend Setup

```bash
cd client

npm install

npm run dev
```

Frontend will run on:

```text
http://localhost:3000
```

---

## Backend Setup

```bash
cd server

npm install

npm run dev
```

Backend will run on:

```text
http://localhost:8000
```

---

## Worker Setup

Start the BullMQ worker:

```bash
cd server

npm run worker
```

The worker continuously processes uploaded PDF jobs.

---

## Folder Structure

```text
rag-pdf-bullmq-qdrantdb
│
├── client
│   ├── Next.js Frontend
│   ├── Authentication
│   └── Chat Interface
│
├── server
│   ├── Express API
│   ├── BullMQ Queue
│   ├── Worker
│   ├── PDF Processing
│   └── Vector Storage
│
├── docker-compose.yml
│
└── README.md
```

---

## Future Improvements

* Multi-document support
* User-specific document collections
* Chat history persistence
* Streaming AI responses
* Source citations
* Document management dashboard
* Hybrid search (Keyword + Vector Search)

---

## Author

Nirav Prajapati

GitHub: https://github.com/web-nirav
