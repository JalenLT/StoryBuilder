# Story Builder

## Introduction
A graph-based story creation platform build with Laravel, React, and Typescript. It enables users to visualize narrative structure, link story nodes, and iterate collaboratively.

## Screenshots
> ![Node grid with four nodes. A character node, a feature node, a setting node, and a scene node. All are populated with content](/public/pictures/story_builder_grid.png)

## Features
### **Graph-Based Story Mapping**
- Visual node-based interface for stories, scenes, characters, settings, and features.
- Right-click context menus for node creation and node actions.
- Smart linking rules to prevent invalid node connections.
- Named edges for clear relationship mapping.

### **Node & Edge Management**
- Full CRUD for nodes and edges via TanStack Query + useMutation.
- Automatic fetching of user, story, node, and edge data.
- Node position tracking (bug fix in progress).

### **Scene System**
- Scene and Scene Point data models.
- Full Scene Controller and API endpoints implemented.

### **Alert & Notification System**
- Custom toast component with multiple variants: Notice, Success, Error, Warning, Info.

### **Backend Architecture**
- Updated migrations, models, controllers, actions, and requests.
- Simplified backend by removing legacy Block system.

### **Upcoming Features**
- Branch Suggestion System
- Scene Builder & Chapter Builder UIs
- Landing / Login / Register / Dashboard / Profile pages
- Subscription system (WiPay/PayPal)
- Two-Factor Authentication (2FA)
- Admin panel + permission system

## Tech Stack
- Laravel 12
- Inertia
- React 19
- Vite
- TailwindCSS + ShadCN
- TypeScript
- React Query for server-state management
- Zustand for client-side store
- React Flow for node-based graph systems

## Getting Started

### Prerequisites
- PHP 8.2+
- Composer
- Node.js 18+
- npm / pnpm / bun
- PostgreSQL or MySQL
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/JalenLT/StoryBuilder
```

### 2. Install Backend Dependencies
```bash
composer install
```

### 3. Install Frontend Dependencies
```bash
npm install
# or
pnpm install
# or
bun install
```

### 4. Environment File
```bash
cp .env.example .env
```
Then generate the application key by doing the following:
```bash
php artisan key:generate
```
Then update you **.env** with:
* Database credentials
* APP_URL
* Additional API keys required

### 5. Run Database Migrations and Seed Database
```bash
php artisan migrate
php artisan db:seed
```

### 6. Start Development Server
Run the Laravel Backend:
```bash
php artisan serve
```
In a separate terminal, run the Vite frontend:
```bash
npm run dev
```

### 7. Build for Production
```bash
npm run build
```

## License
All rights reserved.

## Contact

### Email
stefanseunarine@gmail.com

### LinkedIn
https://linkedin.com/in/stefanseunarine

### GitHub
https://github.com/JalenLT
