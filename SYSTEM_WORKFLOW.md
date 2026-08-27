# Campus Circular — Complete System Workflow

> **Last Updated:** 2026-08-27  
> **Purpose:** Full reference of every feature, page, data flow, and integration point so any developer can understand, extend, or replicate the system.

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Tech Stack](#2-tech-stack)
3. [Environment Variables](#3-environment-variables)
4. [Supabase Backend Architecture](#4-supabase-backend-architecture)
5. [Authentication Flow](#5-authentication-flow)
6. [Route Map (All Pages)](#6-route-map-all-pages)
7. [Admin Workflow](#7-admin-workflow)
8. [Student Workflow](#8-student-workflow)
9. [Exchange State Machine (Borrowing Lifecycle)](#9-exchange-state-machine-borrowing-lifecycle)
10. [AI Search & Recommendations](#10-ai-search--recommendations)
11. [Notification System](#11-notification-system)
12. [Data Stores & Services](#12-data-stores--services)
13. [Component Map](#13-component-map)
14. [Feature-to-File Linkage](#14-feature-to-file-linkage)
15. [Database Schema](#15-database-schema)
16. [Mock/Prototype vs Production](#16-mockprototype-vs-production)
17. [Known Issues & Integration Notes](#17-known-issues--integration-notes)

---

## 1. System Overview

Campus Circular is a **college-only peer-to-peer resource sharing and borrowing platform**. It connects students who own items (cameras, laptops, books, sports gear, instruments, etc.) with students who need to borrow them temporarily.

**Two user roles exist:**
- **Student** — Can list resources, discover & search items, request to borrow, manage exchanges, rate peers, and maintain a trust profile.
- **Admin** — Controls user provisioning, resource approval, exchange oversight, dispute resolution, overdue tracking, fee management, and platform settings.

---

## 2. Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 18.3 + TypeScript |
| **Build Tool** | Vite 5.4 |
| **Styling** | TailwindCSS 3.4 + Shadcn/UI (Radix) |
| **Animations** | Framer Motion |
| **State Management** | React Context (AuthContext) + React Query |
| **Routing** | React Router DOM v6 |
| **Backend** | Supabase (Auth + PostgreSQL + Edge Functions) |
| **Notifications** | Sonner (toast) + In-app notification table |
| **SMS** | Twilio REST API |
| **Email** | Resend API |
| **AI Search** | Local keyword-based matching engine (no external AI API) |

---

## 3. Environment Variables

File: `.env` (project root)

```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...

# Twilio (SMS)
VITE_TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_TWILIO_FROM_NUMBER=+1XXXXXXXXXX
VITE_TWILIO_API_KEY_SID=SKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_TWILIO_API_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Resend (Email)
VITE_RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

> **Important:** The `VITE_` prefix exposes these to the client. For production, sensitive keys (Twilio Auth Token, Resend API Key) should be moved to Supabase Edge Function environment variables and never exposed client-side.

---

## 4. Supabase Backend Architecture

Supabase provides three services used by Campus Circular:

### 4.1 Authentication (`supabase.auth`)
- Email + password sign-in via `supabase.auth.signInWithPassword()`
- Session management (JWT tokens, auto-refresh)
- Password reset flow via `supabase.auth.resetPasswordForEmail()`
- Auth state listener via `supabase.auth.onAuthStateChange()`

### 4.2 Database (PostgreSQL via `supabase.from()`)
All data CRUD uses the Supabase JS client:
```typescript
// Read
const { data } = await supabase.from("table_name").select("*").eq("column", value);

// Insert
await supabase.from("table_name").insert({ column: value });

// Update
await supabase.from("table_name").update({ column: value }).eq("id", id);

// Delete
await supabase.from("table_name").delete().eq("id", id);
```

### 4.3 Edge Functions (`supabase.functions.invoke()`)
Used for server-side logic that requires the Service Role Key (admin-level database access):
- **`provision-user`** — Creates new student accounts, generates setup tokens, handles bulk import, verifies setup links, and completes first-time password setup.

> **Prototype Note:** Edge Functions are currently **mocked** in the client code. The mock intercepts calls and returns simulated success responses.

---

## 5. Authentication Flow

### 5.1 Login Flow
```
User visits /login
    │
    ├── Enters Student ID or College Email + Password
    │
    ├── If Student ID → resolves to email via user_profiles table
    │
    ├── supabase.auth.signInWithPassword({ email, password })
    │
    ├── On success:
    │   ├── Fetches user_profiles to determine role
    │   ├── Checks first_login_completed flag
    │   │   ├── false → "Account setup not complete" error
    │   │   └── true → Proceeds
    │   ├── Updates last_login timestamp
    │   └── Redirects:
    │       ├── role === "admin" → /admin
    │       └── role === "student" → /dashboard
    │
    └── On error → "Invalid credentials" toast
```

### 5.2 Account Provisioning Flow (Admin creates student)
```
Admin → /admin/users → "Add Student" button
    │
    ├── Fills form: Student ID, Name, Email, Mobile, Department, Year, Role
    │
    ├── Calls provision-user Edge Function (currently mocked)
    │   └── Returns: { studentId, email, setupLink, emailContent, smsContent }
    │
    ├── Shows Delivery Preview Modal
    │   ├── Email preview tab (simulated send)
    │   ├── SMS preview tab (simulated send)
    │   └── Copy setup link button
    │
    └── Student receives setup link
        │
        ├── Visits /setup?token=xxxxx
        ├── Token verified → Shows password form
        ├── Sets password → Account activated
        └── Redirected to /login (mock) or /dashboard (production)
```

### 5.3 Password Reset Flow
```
Login → "Forgot password?" → Enter email/Student ID
    │
    ├── supabase.auth.resetPasswordForEmail(email, { redirectTo: /reset-password })
    │
    └── User receives email → clicks link → /reset-password
        ├── Sets new password via supabase.auth.updateUser()
        └── Redirected to /login
```

### 5.4 AuthContext (Session Management)
**File:** `src/contexts/AuthContext.tsx`

The `AuthProvider` wraps the entire app and:
1. On mount, restores any existing session from cookies/localStorage
2. Listens to auth state changes (SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED)
3. Fetches the `user_profiles` row to build an `AuthUser` object
4. Exposes `{ user, loading, login, logout, refreshUser }` to all child components via `useAuth()` hook

---

## 6. Route Map (All Pages)

### Public Routes (No login required)
| Route | Page Component | Purpose |
|-------|---------------|---------|
| `/` | Redirect → `/login` | Entry point redirects to login |
| `/login` | `Login.tsx` | Email/password sign-in |
| `/setup` | `AccountSetup.tsx` | First-time account setup (from provisioning link) |
| `/reset-password` | `ResetPassword.tsx` | Password recovery after email link |

### Student Routes (Requires logged-in student)
| Route | Page Component | Purpose |
|-------|---------------|---------|
| `/dashboard` | `Dashboard.tsx` | Overview: active loans, pending requests, quick actions |
| `/discover` | `Discover.tsx` | Browse & search all available resources |
| `/resources/:id` | `ResourceDetail.tsx` | View single resource details, request to borrow |
| `/profile` | `Profile.tsx` | Trust score, ratings, exchange history, edit profile |
| `/loans` | `MyLoans.tsx` | Items currently borrowed by this student |
| `/requests` | `MyRequests.tsx` | Outgoing borrow requests and their statuses |
| `/my-items` | `MyItems.tsx` | Items listed by this student for others to borrow |
| `/exchanges` | `Exchanges.tsx` | All exchanges (as borrower or owner) |
| `/exchanges/:id` | `ExchangeDetail.tsx` | Full exchange timeline, actions, inspection, rating |

### Admin Routes (Requires admin role)
| Route | Page Component | Purpose |
|-------|---------------|---------|
| `/admin` | `AdminDashboard.tsx` → `AdminOverview` | Platform metrics, category charts, recent exchanges |
| `/admin/users` | `AdminDashboard.tsx` → `AdminUsers` | User management, provisioning, status control |
| `/admin/resources` | `AdminDashboard.tsx` → `AdminResources` | Approve/flag/remove resources |
| `/admin/exchanges` | `AdminDashboard.tsx` → `AdminExchanges` | Monitor all platform exchanges |
| `/admin/overdue` | `AdminDashboard.tsx` → `AdminOverdue` | Track and manage overdue returns |
| `/admin/disputes` | `AdminDashboard.tsx` → `AdminDisputes` | Review and resolve disputes |
| `/admin/transactions` | `AdminDashboard.tsx` → `AdminTransactions` | Platform revenue and fee tracking |
| `/admin/settings` | `AdminDashboard.tsx` → `AdminSettings` | Platform configuration |

> **Note:** All admin sub-pages are rendered as child routes inside `AdminDashboard.tsx`, which provides the sidebar navigation layout.

### Legacy Routes (Redirects)
| Route | Redirects To |
|-------|-------------|
| `/transactions` | `/exchanges` |
| `/transactions/:id` | `/exchanges` |

---

## 7. Admin Workflow

### 7.1 Admin Dashboard Overview (`/admin`)
Displays 8 metric cards pulled from live Supabase data:
- Active Members, Resources Shared, Successful Exchanges, Active Borrowings
- Overdue Returns, Open Disputes, Money Saved Estimate, On-Time Return %
- Popular Categories bar chart
- 5 most recent exchanges

### 7.2 User Management (`/admin/users`)
**Features:**
- Table of all registered users with avatar, name, email, student ID, department, trust score, exchange count, account status
- Search by name, email, or Student ID
- Filter by role (all / student / admin)
- Filter by status (all / active / pending setup / suspended)
- **Add Student** button → opens `CreateStudentModal`
- **Bulk Import** button → opens `BulkImportModal` (paste CSV)
- Per-user actions: Activate, Suspend, Regenerate Setup Link

### 7.3 Resource Management (`/admin/resources`)
- View all resources (approved, pending, flagged, removed)
- Approve or reject newly submitted resources
- Flag resources with a reason
- Remove resources from the platform

### 7.4 Exchange Management (`/admin/exchanges`)
- View all platform exchanges with status badges
- Filter by status
- Click to view exchange details

### 7.5 Overdue Returns (`/admin/overdue`)
- Lists exchanges with status "overdue"
- Shows borrower info, owner info, days overdue
- Admin can send reminders or escalate

### 7.6 Dispute Resolution (`/admin/disputes`)
- Lists disputes with status "under_review"
- View dispute details: reason, description, evidence
- Resolve with admin decision

### 7.7 Transactions (`/admin/transactions`)
- Platform revenue tracking
- Fee breakdown per exchange

### 7.8 Platform Settings (`/admin/settings`)
- Platform configuration controls

---

## 8. Student Workflow

### 8.1 Dashboard (`/dashboard`)
- Welcome message with user name
- Quick stats: active loans, pending requests
- Recent activity feed
- Quick action buttons (Discover, My Items, etc.)

### 8.2 Discover Resources (`/discover`)
- Grid of available resources with images
- **AI Natural Language Search** — Type a need like "I need a camera for event coverage tomorrow"
  - Parses keywords, deadlines, context
  - Ranks resources by match score
- Category filter tabs
- Search bar for text search
- Resource cards show: image, title, owner, price, rating, availability, distance

### 8.3 Resource Detail (`/resources/:id`)
- Full resource info: images, description, accessories, borrowing conditions
- Owner profile with trust score and verification badge
- Usage history and reviews
- Price breakdown (hourly rate, daily rate, security deposit)
- **"Request to Borrow"** button → opens `BorrowRequestModal`

### 8.4 Borrow Request Modal
When a student clicks "Request to Borrow":
1. Select date range (from / to)
2. Write purpose message
3. See price breakdown: daily rate × days + platform fee + security deposit
4. Submit → Creates an exchange record with status `requested`

### 8.5 My Requests (`/requests`)
- Outgoing borrow requests and their current status
- Can cancel pending requests

### 8.6 My Items (`/my-items`)
- Resources this student has listed for sharing
- Toggle availability on/off
- View incoming borrow requests for their items
- Accept or reject requests

### 8.7 My Loans (`/loans`)
- Items currently borrowed
- Due dates and return status
- Active/returned/overdue badges

### 8.8 Exchanges (`/exchanges` and `/exchanges/:id`)
- Complete exchange history as both borrower and owner
- Clicking an exchange opens the full detail page with:
  - Visual timeline showing all 9 lifecycle steps
  - Current status highlighted
  - Action buttons for the current step (e.g., "Confirm Handover", "Mark Returned")
  - Inspection checklist (for owners)
  - Settlement summary (fees, deposit refund)
  - Dispute raising form
  - Rating submission (star rating + review)

### 8.9 Profile (`/profile`)
- Trust score display (0-100)
- Rating average
- Exchange statistics (successful, late returns, disputes)
- Verification status
- Edit profile info

---

## 9. Exchange State Machine (Borrowing Lifecycle)

This is the **core engine** of the platform. Every borrow goes through these steps:

```
                                    ┌──────────┐
                              ┌────►│ REJECTED │
                              │     └──────────┘
                              │     ┌───────────┐
                              │ ┌──►│ CANCELLED │
                              │ │   └───────────┘
┌───────────┐   ┌──────────┐  │ │   ┌──────────┐   ┌──────────┐
│ REQUESTED ├──►│ ACCEPTED ├──┘ │   │ BORROWED ├──►│RETURN_DUE│
└─────┬─────┘   └────┬─────┘    │   └──┬───────┘   └────┬─────┘
      │               │         │      │                 │
      └───────────────┘         │      │     ┌───────┐   │
              │                 │      └────►│OVERDUE│   │
              ▼                 │            └───────┘   │
        ┌──────────┐            │                        │
        │ HANDOVER ├────────────┘          ┌─────────┐   │
        └──────────┘                  ┌───►│DISPUTED │   │
                                      │    └────┬────┘   │
        ┌──────────┐   ┌───────────┐  │         │        │
        │ RETURNED ├──►│INSPECTION ├──┘    ┌────▼────┐   │
        └────┬─────┘   └─────┬─────┘       │RESOLVED │   │
             │               │             └─────────┘   │
             │               ▼                           │
             │        ┌────────────┐                     │
             │        │ SETTLEMENT │◄────────────────────┘
             │        └─────┬──────┘
             │              │
             │              ▼
             │        ┌─────────┐
             └───────►│  RATED  │  ← EXCHANGE COMPLETE
                      └─────────┘
```

### Step-by-Step Actions

| Step | Status | Who Acts | What Happens |
|------|--------|----------|-------------|
| 1 | `requested` | Borrower | Submits borrow request with dates and purpose |
| 2 | `accepted` | Owner | Reviews request, accepts (or rejects/borrower cancels) |
| 3 | `handover` | Owner | Physically hands over the item |
| 4 | `borrowed` | Borrower | Confirms receipt of item |
| 5 | `return_due` | System | Auto-triggered when return date approaches |
| 6 | `returned` | Borrower | Returns the item to owner |
| 7 | `inspection` | Owner | Inspects item condition using checklist |
| 8 | `settlement` | System | Calculates fees: borrowing fee + platform fee + late fee + damage fee - deposit refund |
| 9 | `rated` | Both | Both borrower and owner submit star ratings + reviews |

### Fee Calculation
```
Borrowing Fee  = Daily Rate × Number of Days
Platform Fee   = Borrowing Fee × Platform Fee Rate (e.g., 10%)
Late Fee       = (calculated if returned after due date)
Damage Fee     = (set during inspection if damage found)
Deposit Refund = Security Deposit - Damage Fee
Total Charged  = Borrowing Fee + Platform Fee + Late Fee + Damage Fee
```

### Implementation Files
- **State type definition:** `src/types/index.ts` → `TransactionStatus`
- **State order & helpers:** `src/lib/lifecycle.ts` → `STATUS_ORDER`, `getStepIndex()`, `isTerminalStatus()`
- **State transitions:** `src/lib/exchangeStore.ts` → `exchangeStore.advance()`, `exchangeStore.updateInspection()`, `exchangeStore.raiseDispute()`, `exchangeStore.addRating()`
- **UI rendering:** `src/pages/ExchangeDetail.tsx` (31KB — the most complex page)
- **Timeline component:** `src/components/features/BorrowingTimeline.tsx`

---

## 10. AI Search & Recommendations

**File:** `src/lib/aiSearch.ts`

The AI search is a **local keyword matching engine** (not a cloud AI API). It works as follows:

### Input
User types a natural language query like: *"I need a camera for our college fest this weekend"*

### Processing
1. **Keyword Extraction** — Matches against a predefined `KEYWORD_MAP` (e.g., "camera" → Cameras category, "fest" → Event Equipment)
2. **Deadline Detection** — Regex patterns detect time urgency (e.g., "tomorrow", "this weekend", "urgent")
3. **Context Detection** — Identifies purpose (e.g., "club event", "college festival", "academic project")

### Scoring (out of 100)
Each resource gets a match score based on weighted factors:

| Factor | Max Points |
|--------|-----------|
| Availability (is it available now?) | 30 |
| Category match | 25 |
| Distance proximity | 15 |
| Item condition | 10 |
| Owner trust score | 10 |
| Tag/title keyword match | 10 |
| Rating | 5 |
| Price value | 5 |

### Output
Returns resources sorted by score (filtered to score ≥ 20) with `matchReasons` explaining why each was recommended.

### UI Components
- `src/components/features/AINeedSearch.tsx` — The search input and results panel
- `src/components/features/AIResultCard.tsx` — Individual result card with match score badge

---

## 11. Notification System

**File:** `src/lib/notificationService.ts`

### In-App Notifications
Stored in the `notifications` table in Supabase:
```typescript
await supabase.from("notifications").insert({
  user_id, title, message, type, is_read: false, link
});
```

Types: `info`, `success`, `warning`, `error`, `request`, `exchange`

### Exchange Lifecycle Notifications
The `notifyExchangeEvent()` function sends notifications to the relevant parties at each state transition:

| Event | Notified Users | Message Type |
|-------|---------------|--------------|
| `requested` | Owner | "New Borrow Request" |
| `accepted` | Borrower | "Request Accepted! 🎉" |
| `rejected` | Borrower | "Request Not Accepted" |
| `handover` | Borrower | "Item Ready for Pickup" |
| `borrowed` | Owner | "Borrowing Confirmed" |
| `return_due` | Borrower | "Return Due Tomorrow ⏰" |
| `overdue` | Borrower + Owner + Admins | "Item Overdue ⚠️" |
| `returned` | Owner | "Item Returned" |
| `settlement` | Borrower + Owner | "Settlement Ready/Complete" |
| `disputed` | Borrower + Owner + Admins | "Dispute Raised/Under Review" |
| `rated` | Borrower + Owner | "Exchange Complete ✅" |

### UI Component
- `src/components/features/NotificationBell.tsx` — Bell icon with unread count badge, dropdown panel showing recent notifications

---

## 12. Data Stores & Services

| File | Purpose | Supabase Tables Used |
|------|---------|---------------------|
| `src/lib/supabase.ts` | Supabase client initialization | — |
| `src/lib/resourceStore.ts` | CRUD for resources (getApproved, getAll, getById, getByOwner, updateStatus, updateAvailability) | `resources`, `user_profiles` |
| `src/lib/exchangeStore.ts` | CRUD for exchanges + state machine transitions (create, advance, updateInspection, raiseDispute, addRating) | `exchanges`, `disputes`, `ratings` |
| `src/lib/notificationService.ts` | Create in-app notifications for exchange events | `notifications`, `user_profiles` |
| `src/lib/aiSearch.ts` | Local AI-like keyword search and recommendation scoring | — (operates on in-memory resource data) |
| `src/lib/lifecycle.ts` | Exchange status order constants and helper functions | — |
| `src/lib/mockData.ts` | Static mock data (users, resources, loans, requests) for fallback/development | — |
| `src/contexts/AuthContext.tsx` | Auth state management (login, logout, session restore, profile fetch) | `user_profiles` (via supabase.auth) |

---

## 13. Component Map

### Feature Components (`src/components/features/`)

| Component | Used In | Purpose |
|-----------|---------|---------|
| `AINeedSearch.tsx` | Discover | Natural language search input + results |
| `AIResultCard.tsx` | AINeedSearch | Single AI search result card |
| `BorrowRequestModal.tsx` | ResourceDetail | Date picker + purpose + price breakdown modal |
| `BorrowingTimeline.tsx` | ExchangeDetail | Visual 9-step progress bar |
| `CategoryCard.tsx` | Discover | Category filter tile |
| `EmptyState.tsx` | Multiple | Empty state placeholder with icon and message |
| `ExchangeSummaryCard.tsx` | Exchanges | Exchange list item card |
| `FilterBar.tsx` | Discover | Category + sort + availability filters |
| `MatchScore.tsx` | ResourceCard | Circular match score badge |
| `NotificationBell.tsx` | Dashboard, Sidebar | Bell icon + notification dropdown |
| `PriceBreakdown.tsx` | BorrowRequestModal, ExchangeDetail | Itemized fee table |
| `ResourceCard.tsx` | Discover | Resource grid card with image, price, rating |
| `SearchBar.tsx` | Discover | Standard text search input |
| `StatusBadge.tsx` | Multiple | Colored status chip (e.g., "Borrowed", "Overdue") |
| `TransactionSummaryCard.tsx` | Exchanges | Legacy transaction card |
| `TransactionTimeline.tsx` | ExchangeDetail | Legacy timeline component |
| `TrustScore.tsx` | Profile, Admin | Circular trust score gauge |
| `UserAvatar.tsx` | Multiple | Avatar circle with verification badge |

---

## 14. Feature-to-File Linkage

### How features connect to each other:

```
┌─────────────────────────────────────────────────────┐
│                     App.tsx                          │
│  (Routes + AuthProvider + QueryClientProvider)       │
├─────────────────────────────────────────────────────┤
│                                                      │
│  AuthContext.tsx ◄──── supabase.ts                   │
│       │                    │                         │
│       ▼                    ▼                         │
│  ┌─────────┐    ┌──────────────────┐                │
│  │ Login   │    │ resourceStore.ts │                │
│  │ Setup   │    │ exchangeStore.ts │                │
│  │ Reset   │    │ notificationSvc  │                │
│  └────┬────┘    │ aiSearch.ts      │                │
│       │         │ lifecycle.ts     │                │
│       ▼         └────────┬─────────┘                │
│  ┌─────────────┐         │                          │
│  │  Dashboard  │◄────────┤                          │
│  │  Discover   │◄────────┤                          │
│  │  Resource   │◄────────┤                          │
│  │  Detail     │◄────────┤                          │
│  │  Exchanges  │◄────────┤                          │
│  │  Exchange   │◄────────┤                          │
│  │  Detail     │◄────────┤                          │
│  │  Profile    │◄────────┤                          │
│  │  MyLoans    │◄────────┤                          │
│  │  MyRequests │◄────────┤                          │
│  │  MyItems    │◄────────┘                          │
│  └─────────────┘                                    │
│                                                      │
│  ┌──────────────────┐                               │
│  │ AdminDashboard   │◄── supabase.ts (direct)       │
│  │  ├─ Overview     │    + exchangeStore             │
│  │  ├─ Users        │    + resourceStore             │
│  │  ├─ Resources    │    + notificationSvc           │
│  │  ├─ Exchanges    │                               │
│  │  ├─ Overdue      │                               │
│  │  ├─ Disputes     │                               │
│  │  ├─ Transactions │                               │
│  │  └─ Settings     │                               │
│  └──────────────────┘                               │
└─────────────────────────────────────────────────────┘
```

### Key Interactions

1. **Discover → Resource Detail → Borrow Request → Exchange**
   - Student browses `/discover` → clicks a `ResourceCard` → navigates to `/resources/:id`
   - Clicks "Request to Borrow" → `BorrowRequestModal` opens
   - Submits → `exchangeStore.create()` inserts into `exchanges` table
   - `notificationService.notifyExchangeEvent("requested", ...)` notifies owner
   - New exchange appears in both users' `/exchanges` page

2. **Exchange Detail → State Transitions**
   - Either party visits `/exchanges/:id` → `ExchangeDetail.tsx`
   - Shows current state in `BorrowingTimeline`
   - Action button calls `exchangeStore.advance(id, nextStatus)`
   - Notification sent to other party

3. **Admin → User Provisioning → Student Setup**
   - Admin visits `/admin/users` → "Add Student"
   - `CreateStudentModal` → calls Edge Function (mocked)
   - `DeliveryPreviewModal` shows setup link
   - Student clicks link → `/setup?token=xxx` → `AccountSetup.tsx`
   - Sets password → Account activated

4. **AI Search → Discover**
   - Student types query in `AINeedSearch` component
   - `parseNaturalLanguageQuery()` extracts items, categories, deadline, context
   - `computeAIResults()` scores each resource
   - Results displayed as `AIResultCard` components

---

## 15. Database Schema

### Tables in Supabase

#### `user_profiles`
| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid (PK) | Links to Supabase auth.users.id |
| `email` | text | College email |
| `student_id` | text | e.g., TSEC2025001 |
| `full_name` | text | Display name |
| `username` | text | Short username |
| `avatar_url` | text | Profile image URL |
| `department` | text | e.g., Computer Science |
| `year` | text | e.g., 3rd Year |
| `role` | text | "student" or "admin" |
| `status` | text | "active", "suspended", "flagged" |
| `is_verified` | boolean | College verification status |
| `trust_score` | integer | 0-100 trust rating |
| `rating` | decimal | Average star rating |
| `successful_exchanges` | integer | Count |
| `late_returns` | integer | Count |
| `disputes` | integer | Count |
| `mobile` | text | Phone number |
| `first_login_completed` | boolean | Has the user completed account setup? |
| `last_login` | timestamp | Last login time |
| `created_at` | timestamp | Account creation time |

#### `resources`
| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid (PK) | Auto-generated |
| `title` | text | Resource name |
| `description` | text | Full description |
| `category` | text | One of: Cameras, Electronics, Books, Sports, Music, Event Equipment |
| `images` | text[] | Array of image URLs |
| `owner_id` | uuid (FK → user_profiles) | Who owns this |
| `condition` | text | Excellent, Good, Fair |
| `is_available` | boolean | Currently available? |
| `available_from` | date | When it becomes available |
| `distance_km` | decimal | Distance from campus center |
| `rating` | decimal | Average rating |
| `review_count` | integer | Number of reviews |
| `hourly_rate` | decimal | Optional hourly price |
| `daily_rate` | decimal | Daily rental price |
| `security_deposit` | decimal | Refundable deposit |
| `accessories` | text[] | Included accessories |
| `borrowing_conditions` | text[] | Rules for borrowers |
| `tags` | text[] | Searchable tags |
| `match_score` | integer | AI ranking score |
| `status` | text | "pending", "approved", "flagged", "removed" |
| `flag_reason` | text | Why it was flagged |
| `created_at` / `updated_at` | timestamp | Timestamps |

#### `exchanges`
| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid (PK) | Auto-generated |
| `resource_id` | uuid | Which resource |
| `resource_title` | text | Denormalized for display |
| `resource_image` | text | Denormalized |
| `resource_category` | text | Denormalized |
| `resource_condition_before` | text | Condition at handover |
| `resource_condition_after` | text | Condition at return |
| `borrower_id` | uuid | Who is borrowing |
| `borrower_name` / `borrower_avatar` / `borrower_trust_score` | — | Denormalized |
| `owner_id` | uuid | Who owns it |
| `owner_name` / `owner_avatar` / `owner_trust_score` | — | Denormalized |
| `requested_from` / `requested_to` | date | Borrow period |
| `purpose` | text | Why they need it |
| `days` | integer | Number of days |
| `daily_rate` | decimal | Price per day |
| `platform_fee_rate` | decimal | Platform cut % |
| `security_deposit` | decimal | Deposit amount |
| `borrowing_fee` | decimal | daily_rate × days |
| `platform_fee` | decimal | borrowing_fee × rate |
| `late_fee` | decimal | Calculated if overdue |
| `damage_fee` | decimal | Set during inspection |
| `deposit_refund` | decimal | Deposit minus damage |
| `total_charged` | decimal | Final total |
| `status` | text | Current lifecycle status |
| `status_history` | jsonb | Array of { status, timestamp, note } |
| `inspection_checklist` | jsonb | Array of { label, checked } |
| `created_at` / `updated_at` | timestamp | Timestamps |

#### `disputes`
| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid (PK) | Auto-generated |
| `exchange_id` | uuid (FK) | Which exchange |
| `raised_by_id` | uuid | Who raised it |
| `raised_by_name` | text | Denormalized |
| `reason` | text | Dispute category |
| `description` | text | Detailed description |
| `evidence_labels` | text[] | Evidence descriptions |
| `status` | text | "under_review", "resolved" |
| `resolution` | text | Admin's resolution |
| `created_at` | timestamp | When raised |

#### `ratings`
| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid (PK) | Auto-generated |
| `exchange_id` | uuid (FK) | Which exchange |
| `from_user_id` | uuid | Who is rating |
| `from_user_name` | text | Denormalized |
| `to_user_id` | uuid | Who is being rated |
| `to_user_name` | text | Denormalized |
| `rating` | integer | 1-5 stars |
| `review` | text | Written review |
| `role` | text | "borrower_to_owner" or "owner_to_borrower" |
| `created_at` | timestamp | When submitted |

#### `notifications`
| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid (PK) | Auto-generated |
| `user_id` | uuid (FK) | Recipient |
| `title` | text | Notification title |
| `message` | text | Notification body |
| `type` | text | info, success, warning, error, request, exchange |
| `is_read` | boolean | Has user seen it? |
| `link` | text | URL to navigate to |
| `created_at` | timestamp | When created |

---

## 16. Mock/Prototype vs Production

The following features are currently **mocked** for the prototype:

| Feature | Mock Location | What It Does | Production Replacement |
|---------|--------------|-------------|----------------------|
| Create Student | `AdminDashboard.tsx` line ~360 | Returns fake setup link after 1s delay | Deploy `provision-user` Edge Function |
| Bulk Import | `AdminDashboard.tsx` line ~515 | Returns `{ created: N, errors: [] }` after 1.5s | Deploy `provision-user` Edge Function |
| Regenerate Token | `AdminDashboard.tsx` line ~670 | Returns fake setup link after 0.8s | Deploy `provision-user` Edge Function |
| Verify Setup Token | `AccountSetup.tsx` line ~40 | Detects `mock_token_*` prefix, returns fake profile | Deploy `provision-user` Edge Function |
| Complete Setup | `AccountSetup.tsx` line ~75 | Detects `mock_token_*` prefix, shows success and redirects to login | Deploy `provision-user` Edge Function |
| Email Send | `DeliveryPreviewModal` | Simulates 1.4s delay + success toast | Connect Resend API |
| SMS Send | `DeliveryPreviewModal` | Simulates 0.9s delay + success toast | Connect Twilio API |

### To move to production:
1. Deploy the Edge Function: `supabase functions deploy provision-user`
2. Set Edge Function env vars: `supabase secrets set TWILIO_ACCOUNT_SID=... TWILIO_AUTH_TOKEN=... RESEND_API_KEY=...`
3. Remove the mock blocks (search for `MOCK FOR PROTOTYPE` comments in the codebase)
4. Move sensitive keys out of `VITE_*` env vars into server-side only

---

## 17. Known Issues & Integration Notes

### Current Issues
1. **CSS Warning:** `@import must precede all other statements` — The `@import url(...)` for Google Fonts on line 5 of `src/index.css` comes after Tailwind directives. Fix: move the `@import` to line 1.

2. **Untracked Template Files:** `CampusCircularLogin.tsx` and `CircularHeroIllustration.tsx` in project root reference a non-existent `@/lib/theme.ts`. These are design templates, not integrated into the app.

3. **No Route Protection:** Student routes don't have auth guards. Any user can navigate to `/dashboard` without being logged in. The pages will show empty data but won't redirect to login.

4. **Denormalized Exchange Data:** Exchange records store borrower/owner names and avatars at creation time. If a user updates their profile, old exchanges show stale data.

### Integration Notes for Another Project
- **Auth System:** Import `AuthContext.tsx` and `supabase.ts`. Wrap your app in `<AuthProvider>`. Use `useAuth()` hook anywhere.
- **Exchange Engine:** Import `exchangeStore.ts` and `lifecycle.ts`. These are self-contained and only depend on `supabase.ts`.
- **Notification System:** Import `notificationService.ts`. Call `notifyExchangeEvent()` after each state transition.
- **AI Search:** Import `aiSearch.ts`. It's fully standalone — pass any array of `Resource` objects and get scored results.
- **All types** are defined in `src/types/index.ts` — import them for TypeScript compatibility.
