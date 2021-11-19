import Pusher from "pusher-js/react-native";

const APP_KEY = "a6b6d2cab5545ec144de";

export const pusher = new Pusher(APP_KEY, {
  cluster: "eu",
  activityTimeout: 500,
});