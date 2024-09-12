import { logger } from "./logger";
import { IncomingMessage, Server, ServerResponse } from "http"

export const handleShutdown = (server: Server<typeof IncomingMessage, typeof ServerResponse>) => {

  let connections: any[] = [];

  server.on('connection', (connection) => {
    // register connections
    connections.push(connection);

    // remove/filter closed connections
    connection.on('close', () => {
      connections = connections.filter((currentConnection) => currentConnection !== connection);
    });
  });

  function shutdown() {
    logger.info('Received kill signal, shutting down gracefully');

    server.close(() => {
      logger.info('Closed out remaining connections');
      process.exit(0);
    });

    setTimeout(() => {
      logger.error('Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 20000);

    // end current connections
    connections.forEach((connection) => connection.end());

    // then destroy connections
    setTimeout(() => {
      connections.forEach((connection) => connection.destroy());
    }, 10000);
  }

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}