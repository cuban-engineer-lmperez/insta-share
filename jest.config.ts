import type { Config } from 'jest';

const config: Config = {
    silent: true,
    coverageReporters: ['text'], // text-summary
    coverageThreshold: {
        global: {
          branches: 85,
          functions: 85,
          lines: 85,
          statements: 85,
        },
      },
};

export default config;