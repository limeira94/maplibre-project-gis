import { MapProvider } from '../../hooks/useMapContext';
import MapContainer from './MapContainer';
import BasemapSelector from './BasemapSelector';
import { MapProps } from '../../types/map';

const Map = (props: MapProps) => {
    return (
        <MapProvider>
            <MapContainer {...props} />
            <BasemapSelector />
        </MapProvider>
    );
};

export default Map; 