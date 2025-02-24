import { disconnectFromCluster } from "./mongodb";

process.on('beforeExit', async () => {
    await disconnectFromCluster();
});

process.on('SIGINT', async () => {
    await disconnectFromCluster();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    await disconnectFromCluster();
    process.exit(0);
});
