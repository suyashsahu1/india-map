import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

import geoJson from "./geoJson.json";

import { locations } from "./locationData";

const geoUrl = geoJson;

export default function IndiaMap() {
  const [hoveredState, setHoveredState] = useState(null);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 800,
        margin: "50px",
      }}
    >
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center: [80, 22], scale: 1000 }}
        width={800}
        height={600}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const stateName = geo.properties.st_nm;
              const isHighlighted = true;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => setHoveredState(stateName)}
                  onMouseLeave={() => setHoveredState(null)}
                  style={{
                    default: {
                      fill: isHighlighted ? "green" : "#d9d9d9",
                      stroke: "#fff",
                      strokeWidth: 0.5,
                    },
                    hover: {
                      fill: "#08519c",
                      cursor: "pointer",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>

        {locations.map(({ name, coords }) => (
          <Marker key={name} coordinates={coords}>
            <circle r={4} fill="#FF5722" stroke="#fff" strokeWidth={1.5} />
          </Marker>
        ))}
      </ComposableMap>

      {hoveredState && (
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            background: "white",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          <strong>{hoveredState}</strong>
          <ul style={{ margin: 0, padding: "4px 0 0 0" }}>
            {locations
              .filter((loc) => loc.state === hoveredState)
              .map((loc) => (
                <li key={loc.name}>{loc.name}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
