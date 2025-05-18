import { env } from "@/config/env";
import { Stack, Button, Skeleton } from "@mui/material";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { Fragment, useCallback, useReducer, useState } from "react";

type Route = {
  from: string;
  to: string;
};

const center = {
  lat: 4.711, // Center on Bogotá
  lng: -74.0721,
};

const initialRoute: Route = {
  from: "Carrera 15 #80-45, Bogotá, Colombia",
  to: "Carrera 7 #72-10, Bogotá, Colombia",
};

function routeReducer(state: Route, action: { type: string; payload: Route }) {
  switch (action.type) {
    case "updateDirection":
      return action.payload;
    default:
      return state;
  }
}

const Map = () => {
  const [wasOptimized, setWasOptimized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [route] = useReducer(routeReducer, initialRoute);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  const fetchDirections = useCallback(() => {
    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: route.from,
        destination: route.to,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          setDirections(result);
        } else {
          console.error("Directions request failed:", status, result);
        }
        setLoading(false);
      }
    );
  }, [route]);

  const handleOptimizeRoute = () => {
    setWasOptimized(true);
    fetchDirections(); // Manually trigger when button is clicked
  };

  return (
    <Stack direction="column" spacing={2}>
      {loading ? (
        <Skeleton height={400} width={400} />
      ) : (
        <Fragment>
          <LoadScript
            googleMapsApiKey={env.VITE_API_REACT_APP_GOOGLE_MAPS_API_KEY!}
          >
            <GoogleMap
              mapContainerStyle={{ width: "400px", height: "400px" }}
              center={center}
              zoom={12}
            >
              {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
          </LoadScript>
        </Fragment>
      )}

      <Button
        variant="contained"
        color="primary"
        disabled={wasOptimized}
        onClick={handleOptimizeRoute}
      >
        Optimizar ruta
      </Button>
    </Stack>
  );
};

export { Map };
