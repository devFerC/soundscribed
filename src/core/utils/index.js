const production= process.env.NODE_ENV === "production";

export const SITE_URL= production ? "https://soundscribed.online" : "http://localhost:3000";