// import Map from '../components/Map';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../components/Map'), { ssr: false });


export default function Page() {
  return (
    <div>
      <h1>My Leaflet Map</h1>
      <Map />
    </div>
  );
}
