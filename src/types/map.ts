import { Map as MaplibreMap } from 'maplibre-gl';

export interface MapProps {
    initialViewState?: {
        longitude: number;
        latitude: number;
        zoom: number;
    };
    style?: string;
    mapStyle?: string | object;
    className?: string;
    width?: string | number;
    height?: string | number;
}

export interface MapContextValue {
    map: MaplibreMap | null;
    setMap: (map: MaplibreMap) => void;
} 