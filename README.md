# Nishat Mazumder - Portfolio Website

My newest portfolio re-working. Built with Next.js 16 canary, TypeScript, Tailwind CSS V4.

## Tech Stack

- **Framework**: Next.js 16 canary with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS V4
- **UI Components**: Shadcn/ui
- **Icons**: Custom SVG components & Lucide React Icons
- **Font**: Inter, Calistoga (Google Fonts)
- **Deployment**: Vercel

## Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/nishatislam04/new-portfolio.git
   cd new-portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create .env.local file**

   ```bash
   cp .env.example .env.local
   ```

4. **Start development server**

   ```bash
   make dev
   ```

5. **Open in browser**
   Navigate to [http://192.168.1.108:3000](http://192.168.1.108:3000)

## Deployment

### Vercel (Recommended)

1. **Prepare for Production in local development**

   ```bash
   make lint:fix
   make type-check
   make build
   ```

2. **Deploy to Vercel**
   - Push your code to GitHub
   - Set environment variables in Vercel dashboard

### Manual Build & preview

```bash
make build
make start
```
