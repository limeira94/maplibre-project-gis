# MapLibre WebGIS Project

A modern WebGIS application built with MapLibre GL JS, React, TypeScript, and Tailwind CSS. This project provides an interactive web mapping platform with OpenStreetMap integration.

## Features

- Interactive map display using MapLibre GL JS
- OpenStreetMap base layer
- Navigation controls for pan/zoom functionality
- Scale control for distance reference
- Responsive design that works on all screen sizes
- Clean, well-structured codebase with TypeScript type safety

## Tech Stack

- **React**: UI components and state management
- **Vite**: Fast builds and development server
- **TypeScript**: Type-safe code
- **MapLibre GL JS**: Interactive mapping library
- **Tailwind CSS**: Utility-first styling
- **ESLint/Prettier**: Code formatting and linting

## Getting Started

### Prerequisites

- Node.js (version 16.x or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/limeira94/maplibre-project-gis.git
   cd maplibre-project-gis
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Development

Run the development server:
```
npm run dev
```

The application will be available at http://localhost:5173

### Build for Production

Create a production build:
```
npm run build
```

## Project Structure

```
src/
├── assets/          # Static assets like images and icons
├── components/      # React components
│   └── map/         # Map-related components
├── hooks/           # Custom React hooks
├── services/        # API and data fetching services
├── styles/          # CSS and style-related files
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## Environment Variables

The following environment variables can be configured in a `.env` file:

- `VITE_MAPLIBRE_KEY` - API key for MapLibre services (if required)
- `VITE_MAP_STYLE_URL` - URL to the map style definition
- `VITE_DEFAULT_LONGITUDE` - Default map center longitude
- `VITE_DEFAULT_LATITUDE` - Default map center latitude
- `VITE_DEFAULT_ZOOM` - Default map zoom level
- `VITE_TILE_SERVER_URL` - URL to the tile server
- `VITE_DATA_API_URL` - URL to the GIS data API

## License

MIT
