import { MapProvider } from '../../hooks/useMapContext';
import MapContainer from './MapContainer';
import { MapProps } from '../../types/map';

const Map = (props: MapProps) => {
    return (
        <MapProvider>
            <MapContainer {...props} />
        </MapProvider>
    );
};

export default Map; 