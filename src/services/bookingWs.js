import { Client } from "@stomp/stompjs";

const client = new Client({
  brokerURL: "ws://moviereservation.software/bookings",
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});

export default client;