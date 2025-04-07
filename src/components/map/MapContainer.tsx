import { useRef, useEffect, useMemo } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MapProps } from '../../types/map';
import { useMapContext } from '../../hooks/useMapContext';

// Default OSM style definition outside component to avoid recreation
const DEFAULT_OSM_STYLE = {
    version: 8,
    sources: {
        'osm': {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
    },
    layers: [
        {
            id: 'osm-tiles',
            type: 'raster',
            source: 'osm',
            minzoom: 0,
            maxzoom: 19
        }
    ]
};

const MapContainer = ({
    initialViewState = {
        longitude: -122.4,
        latitude: 37.8,
        zoom: 9
    },
    mapStyle = DEFAULT_OSM_STYLE,
    className = '',
    width = '100%',
    height = '100%'
}: MapProps) => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const { setMap } = useMapContext();

    // Memoize initialViewState to prevent unnecessary re-renders
    const memoizedInitialViewState = useMemo(() => initialViewState, [
        initialViewState.longitude,
        initialViewState.latitude,
        initialViewState.zoom
    ]);

    useEffect(() => {
        if (!mapContainerRef.current) return;

        const map = new maplibregl.Map({
            container: mapContainerRef.current,
            style: mapStyle,
            center: [memoizedInitialViewState.longitude, memoizedInitialViewState.latitude],
            zoom: memoizedInitialViewState.zoom
        });

        map.addControl(new maplibregl.NavigationControl(), 'top-right');
        map.addControl(new maplibregl.ScaleControl(), 'bottom-left');

        setMap(map);

        return () => {
            map.remove();
        };
    }, [memoizedInitialViewState, mapStyle, setMap]); // Removed mapContainerRef from deps

    return (
        <div
            ref={mapContainerRef}
            className={`map-container ${className}`}
            style={{ width, height }}
        />
    );
};

export default MapContainer; 