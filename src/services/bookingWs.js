import { Client } from "@stomp/stompjs";

const isProduction = import.meta.env.MODE;

const prodUrl = "wss://moviereservation.software/websocket-bookings/";
const devUrl = "ws://localhost:8084/bookings";

const brokerUrl =
  isProduction !== undefined && isProduction === "prod" ? prodUrl : devUrl;

const client = new Client({
  brokerURL: brokerUrl,
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});

export default client;
