/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  webpack(
    config,
    { isServer },
    // { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) {
    config.resolve.fallback = {
      ...config.resolve.fallback,

      fs: false, // the solution
    };

    if (isServer) {
      // NOTE: Must use this instead of serverExternalPackages | serverComponentsExternalPackages
      // because node:crypto for some reason only works below.
      // Also, when the below is defined, it overrides the serverExternalPackages,
      // so pino and pino-pretty must be included here.
      config.externals.push({
        'node:fs': 'commonjs fs',
        'node:crypto': 'commonjs crypto',
        argon2: 'argon2',
        pino: 'pino',
        'thread-stream': 'thread-stream',
        'pino-worker': 'pino-worker',
        'pino-file': 'pino-file',
        'pino-pretty': 'pino-pretty',
      });
    }
    return config;
  },
};

export default nextConfig;
