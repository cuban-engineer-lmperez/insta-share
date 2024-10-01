import type { Config } from 'jest';

const config: Config = {
    silent: true,
    coverageReporters: ['text'], // text-summary
    coverageThreshold: {
        global: {
          branches: 0,
          functions: 85,
          lines: 0,
          statements: 0,
        },
      },
};

export default config;