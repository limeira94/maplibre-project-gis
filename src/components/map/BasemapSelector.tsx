import { useState, useCallback } from 'react';
import maplibregl, { StyleSpecification } from 'maplibre-gl';
import { useMapContext } from '../../hooks/useMapContext';
import './BasemapSelector.css'; // Import the CSS file

// BasemapConfig interface
interface BasemapConfig {
    key: number;
    name: string;
    url?: string;
    thumbnail: string;
    attribution?: string;
}

// Basemap options matching the wireframe exactly
const basemapsConfig: BasemapConfig[] = [
    {
        key: 1,
        name: "Blank",
        // Empty style for blank map
        thumbnail: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/7+8fQAAAABJRU5ErkJggg==", // 1x1 white pixel
        attribution: ''
    },
    {
        key: 2,
        name: "Satellite",
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        thumbnail: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/0/0/0",
        attribution: 'Tiles &copy; Esri'
    },
    {
        key: 3,
        name: "Dark",
        url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
        thumbnail: "https://a.basemaps.cartocdn.com/dark_all/0/0/0.png",
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
    },
    {
        key: 4,
        name: "Light",
        url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
        thumbnail: "https://a.basemaps.cartocdn.com/light_all/0/0/0.png",
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
    },
    {
        key: 5,
        name: "Default",
        url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        thumbnail: "https://a.tile.openstreetmap.org/0/0/0.png",
        attribution: '&copy; OpenStreetMap contributors'
    }
];

const generateStyle = (config: BasemapConfig): StyleSpecification => {
    // Handle Blank map case
    if (!config.url) {
        return { version: 8, sources: {}, layers: [] };
    }

    const sourceId = `raster-tiles-${config.key}`;
    const layerId = `raster-layer-${config.key}`;
    const tileUrl = config.url.includes('{s}')
        ? config.url.replace('{s}', 'a')
        : config.url;

    return {
        version: 8,
        sources: {
            [sourceId]: { type: 'raster', tiles: [tileUrl], tileSize: 256, attribution: config.attribution || '' }
        },
        layers: [{ id: layerId, type: 'raster', source: sourceId, minzoom: 0, maxzoom: 22 }]
    };
};

const BasemapSelector = () => {
    const { map } = useMapContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Default to the "Default" map (key 5)
    const [currentStyleKey, setCurrentStyleKey] = useState<number>(5);

    const toggleModal = useCallback(() => {
        setIsModalOpen(prev => !prev);
    }, []);

    const changeBasemap = useCallback((newKey: number) => {
        const selectedConfig = basemapsConfig.find(b => b.key === newKey);
        if (!map || !selectedConfig || newKey === currentStyleKey) {
            return;
        }

        const nextStyle = generateStyle(selectedConfig);

        // Save camera position
        const center = map.getCenter();
        const zoom = map.getZoom();
        const bearing = map.getBearing();
        const pitch = map.getPitch();

        // Apply new style
        map.setStyle(nextStyle);

        // Restore camera after style loads
        map.once('style.load', () => {
            map.setCenter(center);
            map.setZoom(zoom);
            map.setBearing(bearing);
            map.setPitch(pitch);
        });

        setCurrentStyleKey(newKey);
        setIsModalOpen(false);
    }, [map, currentStyleKey]);

    // Button to toggle the basemap selector
    const BasemapButton = (
        <button
            onClick={toggleModal}
            className="basemap-button"
            aria-label="Select basemap"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6-3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
        </button>
    );

    // Modal showing basemap options
    const BasemapModal = (
        <div className="basemap-modal">
            {/* Header with title and three-dots menu */}
            <div className="basemap-header">
                <span className="basemap-title">Basemap</span>
                <button className="dots-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            {/* Basemap options list */}
            <ul className="basemap-list">
                {basemapsConfig.map((config) => (
                    <li key={config.key} className="basemap-item">
                        <button
                            onClick={() => changeBasemap(config.key)}
                            className={`basemap-option ${currentStyleKey === config.key ? 'selected' : ''}`}
                        >
                            <div className={`thumbnail-container ${currentStyleKey === config.key ? 'selected' : ''}`}>
                                <img
                                    src={config.thumbnail}
                                    alt={config.name}
                                    className="thumbnail"
                                    onError={(e) => (e.currentTarget.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/7+8fQAAAABJRU5ErkJggg==')}
                                />
                            </div>
                            <span className="basemap-name">{config.name}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <div className="basemap-component">
            {BasemapButton}
            {isModalOpen && BasemapModal}
        </div>
    );
};

export default BasemapSelector;