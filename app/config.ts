import { z } from "zod";

const configSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string(),
});

const configProject = configSchema.safeParse({
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL
});

if (!configProject.success) {
  console.error(configProject.error.issues);
  throw new Error("Value in env file not valid");
}

const envConfig = configProject.data;
export default envConfig;
