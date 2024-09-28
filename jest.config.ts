import type { Config } from 'jest';

const config: Config = {
    coverageReporters: ['text'], // text-summary
    coverageThreshold: {
        global: {
          branches: 85,
          functions: 85,
          lines: 85,
        //  statements: -10,
        },
      },
};

export default config;