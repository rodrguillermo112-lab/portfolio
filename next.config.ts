import type { NextConfig } from "next";
const config: NextConfig = {
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  images: { unoptimized: true },
  devIndicators: false,
  experimental: {
    workerThreads: true,
    webpackBuildWorker: false,
    cpus: 2,
    useTypeScriptCli: false,
  },
};
export default config;
