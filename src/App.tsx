import Map from './components/map/Map';

function App() {
    return (
        <div className="w-full h-full">
            <Map
                initialViewState={{
                    longitude: -98.5795,
                    latitude: 39.8283,
                    zoom: 3
                }}
                className="w-full h-full"
            />
        </div>
    );
}

export default App; 