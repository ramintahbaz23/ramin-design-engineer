# Ramin  Designer

A small portfolio built with Next.js, TypeScript, Framer Motion, and Tailwind CSS. It showcases interactive experiments, essays, and case-study intros, with **Photo boom** as the first featured interaction.

## Projects

- **Photo boom**  An exploding image gallery interaction that treats motion as rich feedback.
- **Interactions, essays, case studies** on `/work` give a lightweight overview of other ideas and writing.

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open `http://localhost:3000` in your browser.

## Structure

```text
ramin-portfolio/
├── app/
│   ├── layout.tsx          # Root layout + global navbar
│   ├── page.tsx            # Photo boom project page
│   ├── work/page.tsx       # Work index (interactions, essays, case studies)
│   └── project-template/   # Template for future project pages
├── components/
│   ├── AnimatedPage.tsx    # Shared page-load animation wrapper
│   ├── PhotoBoom.tsx       # Exploding image gallery interaction
│   └── ProjectPageShell.tsx# Shared project page shell
├── public/
│   └── images/             # Images and avatar
└── package.json
```

## Technologies

- **Next.js 16** (App Router)
- **TypeScript**
- **Framer Motion**
- **Tailwind CSS**

## Notes

This repo started as a single interaction (Photo boom) and evolved into a small portfolio shell. Feel free to fork it and adapt the shell for your own projects.
