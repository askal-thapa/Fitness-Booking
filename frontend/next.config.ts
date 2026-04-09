import type { NextConfig } from "next";
import { loadEnvConfig } from "@next/env";
import { join } from "path";

// Load environment variables from the root .env file
loadEnvConfig(join(process.cwd(), "../"));

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
