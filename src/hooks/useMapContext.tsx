import { createContext, useContext, useState, ReactNode } from 'react';
import { Map as MaplibreMap } from 'maplibre-gl';
import { MapContextValue } from '../types/map';

const MapContext = createContext<MapContextValue | undefined>(undefined);

export const MapProvider = ({ children }: { children: ReactNode }) => {
    const [map, setMap] = useState<MaplibreMap | null>(null);

    return (
        <MapContext.Provider value={{ map, setMap }}>
            {children}
        </MapContext.Provider>
    );
};

export const useMapContext = (): MapContextValue => {
    const context = useContext(MapContext);
    if (context === undefined) {
        throw new Error('useMapContext must be used within a MapProvider');
    }
    return context;
}; 