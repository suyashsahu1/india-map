import React, { useMemo, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import geoJson from "./geoJson.json";
import { locations } from "./locationData";

export default function IndiaMap() {
  const [selectedState, SetSelectedState] = useState(null);

  const locationStates = useMemo(() => locations.map((obj) => obj.state), []);

  const stateCityMap = useMemo(() => {
    const map = {};
    locations.forEach(({ state, cities }) => {
      map[state] = cities;
    });
    return map;
  }, []);

  const selectedStateCities = selectedState
    ? stateCityMap[selectedState] || []
    : [];

  const getFillColor = (isHighlighted, selectedState, stateName) =>
    isHighlighted
      ? selectedState === stateName
        ? "#5f9fa3"
        : "#8fc683"
      : "#bdbbbc";

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 800,
        margin: "50px auto",
      }}
    >
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center: [80, 22], scale: 1000 }}
        width={800}
        height={600}
      >
        <Geographies geography={geoJson}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const stateName = geo.properties.st_nm;
              const isHighlighted = locationStates.includes(stateName);

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseDown={() => SetSelectedState(stateName)}
                  style={{
                    default: {
                      fill: getFillColor(
                        isHighlighted,
                        selectedState,
                        stateName
                      ),
                      stroke: "#fff",
                      strokeWidth: 0.5,
                      transition: "fill 0.2s ease-in-out",
                      outline: "none",
                    },
                    hover: {
                      fill: getFillColor(
                        isHighlighted,
                        selectedState,
                        stateName
                      ),
                      cursor: "pointer",
                      outline: "none",
                    },
                    pressed: {
                      fill: getFillColor(
                        isHighlighted,
                        selectedState,
                        stateName
                      ),
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>

        {locations
          .filter((loc) => loc.coords && loc.coords.length === 2)
          .map(({ coords, state }) => (
            <Marker
              onMouseDown={() => SetSelectedState(state)}
              key={state}
              coordinates={coords}
              style={{
                default: { outline: "none" },
                hover: { fill: "#6fbf73", cursor: "pointer", outline: "none" },
                pressed: { outline: "none" },
              }}
            >
              <circle r={3} fill="#8fc683" stroke="#1d993f" strokeWidth={1} />
            </Marker>
          ))}
      </ComposableMap>

      {/* ✅ Show hover info only if cities exist */}
      {selectedState && selectedStateCities.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            background: "white",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            transition: "opacity 0.2s ease-in-out",
            outline: "none",
          }}
        >
          <strong style={{ color: "#e63946" }}>{selectedState}</strong>
          <ul style={{ margin: 0, padding: "4px 0 0 18px" }}>
            {selectedStateCities.map((city) => (
              <li key={city}>{city}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
