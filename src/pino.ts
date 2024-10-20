// this is the logger for the browser
import pino, { LogEvent, LoggerOptions } from 'pino';

const config = {
  serverUrl: process.env.REACT_APP_API_PATH || 'http://localhost:3000/api',
  env: process.env.NODE_ENV,
  publicUrl: process.env.PUBLIC_URL,
};

const pinoConfig: LoggerOptions = {
  //   base: { source: 'backend' },
  level: 'info',
  formatters:
    process.env.NEXT_RUNTIME === 'nodejs'
      ? {
          bindings: (bindings) => {
            return { pid: bindings.pid, hostname: bindings.hostname };
          },
          level: (label) => {
            return { severity: label };
          },
        }
      : undefined,
  transport: {
    target: 'pino/file',
    options: {
      destination: `logs/server.log`,
    },
  },
  browser: {
    asObject: true,
    // write: (o: any) => {
    //   o.level = logger.levels.labels[o.level];
    //   navigator.sendBeacon(`${config.serverUrl}/log`, JSON.stringify(o));
    // },
  },
};

if (config.serverUrl) {
  if (pinoConfig && pinoConfig.browser) {
    pinoConfig.browser.transmit = {
      level: 'info',
      send: (level: string, logEvent: LogEvent) => {
        const msg = logEvent.messages[0];
        const hostname = window.location.hostname || null;

        const headers = {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
          type: 'application/json',
        };

        // const pinoMessage: PinoMessage = {}
        const blob = new Blob(
          [JSON.stringify({ time: logEvent.ts, level, hostname, msg })],
          headers,
        );
        navigator.sendBeacon(`${config.serverUrl}/log`, blob);
      },
    };
  }
}

const logger = pino(pinoConfig);

export const log = (msg: string) => logger.info(msg);
export default logger;
