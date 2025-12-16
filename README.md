# PhotoBoom - Exploding Images

A playful image explosion interaction built with Next.js, TypeScript, Framer Motion, and Tailwind CSS.

## Features

- 🎨 Interactive exploding images on mouse/touch interaction
- 📱 Fully responsive design
- ⚡ Built with Next.js 15 and App Router
- 🎭 Smooth animations with Framer Motion
- 🎨 Styled with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Add your images:
   - Create images in the `public/images/` folder
   - Name them `image1.jpg`, `image2.jpg`, `image3.jpg`, `image4.jpg` (or update the image paths in `app/page.tsx`)

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Customization

### Adding Your Own Images

1. Place your images in `public/images/`
2. Update the `images` array in `app/page.tsx`:

```typescript
const images = [
  {
    id: '1',
    src: '/images/your-image-1.jpg',
    alt: 'Description of image 1',
  },
  // Add more images...
];
```

### Customizing the Layout

- Edit `app/page.tsx` to change the header, title, and description
- Modify `components/ExplodingImages.tsx` to adjust animation behavior
- Update `app/globals.css` for global styling changes

### Changing Colors and Styling

The project uses Tailwind CSS. You can customize:
- Colors in `app/page.tsx` (currently using gray-900 to gray-100 gradient)
- Component styles in `components/ExplodingImages.tsx`
- Global styles in `app/globals.css`

## How It Works

- **Hover**: Move your mouse over the image stack to see subtle interactions
- **Click/Touch**: Click or touch to explode the images outward
- **Reset**: Press `ESC` key to reset the images back to stacked position

## Project Structure

```
photoboom/
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Homepage
│   └── globals.css     # Global styles
├── components/
│   └── ExplodingImages.tsx  # Main interaction component
├── public/
│   └── images/         # Your images go here
└── package.json
```

## Technologies

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Framer Motion** - Animation library
- **Tailwind CSS** - Utility-first CSS framework

## License

Feel free to use this project for your own purposes!
