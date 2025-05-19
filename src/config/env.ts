import { z } from "zod";

const envSchema = z.object({
  VITE_PORT: z.string().default("3000"),
  VITE_NODE_ENV: z.string().optional().default("develop"),

  VITE_API_URL_CLIENTS: z.string(),
  VITE_API_URL_SELLERS: z.string(),
  VITE_API_URL_WAREHOUSE: z.string(),

  VITE_FIREBASE_API_KEY: z.string(),
  VITE_FIREBASE_AUTH_DOMAIN: z.string(),
  VITE_FIREBASE_PROJECT_ID: z.string(),
  VITE_FIREBASE_STORAGE_BUCKET: z.string(),
  VITE_FIREBASE_MESSAGING_SENDER_ID: z.string(),
  VITE_API_REACT_APP_GOOGLE_MAPS_API_KEY: z.string(),
});

// Function to validate environment variables
const validateEnv = () => {
  try {
    return envSchema.parse(import.meta.env);
  } catch (error) {
    console.error("❌ Invalid environment variables:", error);
    throw error;
  }
};

// Export validated environment variables
export const env = validateEnv();

// Export type for environment variables
export type Env = z.infer<typeof envSchema>;
