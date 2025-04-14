const keyStorage = {
  user: "user",
  theme: "theme",
  lastUpdateDate: "lastUpdate",
  lastSendDataDate: "lastSendDate"
}
const isDemoMode = process.env.IS_DEMO_MODE??false;

export { keyStorage,isDemoMode }