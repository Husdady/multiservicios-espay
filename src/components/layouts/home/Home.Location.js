// Librarys
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; 

const HomeLocation = () => {
  const position = [-5.091263, -81.092772];
  const height = 500;

  return (
    <section className="tm-home-location py-5 d-table w-100">
      <h2 className="text-center fs-1 fw-bold title">¿Deseas ubicar nuestro negocio?</h2>
      <span className="d-block text-center text-muted mx-auto">Ubícanos en Urbanización Isabel Barreto MZ F LT 15 - Paita, Piura - Perú, cerca del Instituto Hermanos Cárcamo</span>
      <div className="container fluid mt-4" style={{ height }}>
        <MapContainer center={position} zoom={15} className="w-100 h-100">
          <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        </MapContainer>
      </div>
    </section>
  );
}

export default HomeLocation;
