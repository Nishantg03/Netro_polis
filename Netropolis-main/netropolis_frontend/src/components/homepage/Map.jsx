import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useRef } from "react";
import Title from "../globals/Title.jsx";
import Button from "../globals/Button.jsx";
import "../../css/leaflet.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon (Leaflet + bundlers issue)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const metadata = {
  title: "Japan Map's Guide",
  subtitle: "Are you lost? We have a map of the country of Japan",
  centerMap: [36.2048, 138.2529],
};

const Map = ({ destinations }) => {
  return (
    <div className="w-full dark:bg-neutral-950 py-20 flex justify-center items-center">
      <div className="w-full flex flex-col md:flex-row-reverse gap-8 max-w-7xl p-8">
        <div className="w-full md:w-1/3 flex flex-col justify-center items-end gap-5">
          <Title
            title={metadata.title}
            subtitle={metadata.subtitle}
            subtitleClass={"text-end"}
            customClass={"flex flex-col items-end"}
          />
          <Button text={"Explore Quests"} path={"/explore"} />
        </div>
        <div className="w-full md:w-2/3">
          <div className="w-full aspect-square md:aspect-video rounded-xl overflow-hidden">
            <MapContainer center={metadata.centerMap} zoom={6} style={{ width: "100%", height: "100%" }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {destinations.map((item, idx) => (
                <Marker key={idx} position={item.map}>
                  <Popup maxWidth={250}>
                    <div>
                      <div
                        style={{
                          width: "100%",
                          height: "120px",
                          borderRadius: "8px",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundImage: `url(https://picsum.photos/seed/${item.slug}/400/300)`,
                        }}
                      ></div>
                      <h3 style={{ margin: "8px 0 4px", fontSize: "16px", fontWeight: "bold" }}>
                        {item.title}
                      </h3>
                      <p style={{ fontSize: "13px", color: "#555", margin: "0 0 4px" }}>
                        📍 {item.location}
                      </p>
                      <p style={{ fontSize: "12px", color: "#777", margin: "0 0 8px" }}>
                        {item.description}
                      </p>
                      <a
                        href="/explore"
                        style={{
                          display: "block",
                          textAlign: "center",
                          fontWeight: "600",
                          backgroundColor: "#7c3aed",
                          color: "#fff",
                          padding: "8px 12px",
                          borderRadius: "8px",
                          textDecoration: "none",
                        }}
                      >
                        Details
                      </a>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
