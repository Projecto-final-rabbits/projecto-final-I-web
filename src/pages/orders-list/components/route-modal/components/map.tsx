import { useAppDispatch } from "@/state-managment/hooks";
import {
  clearSuggestion,
  suggestRoute,
} from "@/state-managment/slices/ordersSlice";
import { RootState } from "@/state-managment/store"; // adjust if needed
import { Stack, Button, Typography } from "@mui/material";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

type MapProps = {
  orderId: number;
};

const center = {
  lat: 4.711,
  lng: -74.0721,
};

const Map = ({ orderId }: MapProps) => {
  const dispatch = useAppDispatch();
  const route = useSelector((state: RootState) => state.orders.route);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const { t } = useTranslation();

  const optimizedRequestedRef = useRef(false);

  const fetchDirections = (route: { origen: string; destino: string }) => {
    if (!window.google) return;
    if (optimizedRequestedRef.current) return;

    optimizedRequestedRef.current = true;

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: route.origen,
        destination: route.destino,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK && result) {
          setDirections(result);
        } else {
          console.error("Directions request failed:", status, result);
        }
      }
    );
  };

  const handleOptimizeRoute = () => {
    dispatch(suggestRoute(orderId));
  };

  useEffect(() => {
    if (route && !optimizedRequestedRef.current && window.google) {
      fetchDirections(route);
    }
  }, [route]);

  useEffect(() => {
    return () => {
      optimizedRequestedRef.current = false;
      dispatch(clearSuggestion());
    };
  }, [dispatch]);

  return (
    <Stack direction="column" spacing={2}>
      <Stack>
        <Typography>
          <b>{t("orders.route.origin")}:</b> {route?.origen}
        </Typography>
        <Typography>
          <b>{t("orders.route.destination")}:</b> {route?.destino}
        </Typography>
      </Stack>

      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "450px", minWidth: 450 }}
        center={center}
        zoom={12}
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>

      <Button variant="contained" color="primary" onClick={handleOptimizeRoute}>
        {t("orders.table.optimizeRoute")}
      </Button>
    </Stack>
  );
};

export { Map };
