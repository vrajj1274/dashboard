// next.config.mjs
export default {
  experimental: {
    // parallelServerBuildTraces: true,
    // parallelServerCompiles: true,
    webpackBuildWorker: true, // ← this one is valid if you’re using it
  },
}
