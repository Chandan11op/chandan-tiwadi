import express from 'express';
import { isDbConnected } from '../config/database.js';

const router = express.Router();
const startTime = Date.now();

/**
 * Liveness probe: checks if the Node.js process is alive
 */
router.get('/live', (req, res) => {
  return res.status(200).json({
    status: 'ok',
    alive: true,
    timestamp: new Date().toISOString(),
    uptime: Math.floor((Date.now() - startTime) / 1000),
  });
});

/**
 * Readiness probe: checks if the application is ready to accept traffic (including database)
 * Used by Render health-check!
 */
router.get('/ready', (req, res) => {
  const dbOk = isDbConnected();

  if (!dbOk) {
    return res.status(503).json({
      status: 'unavailable',
      ready: false,
      database: 'disconnected',
      timestamp: new Date().toISOString(),
      message: 'Database connection is not ready.',
    });
  }

  return res.status(200).json({
    status: 'ok',
    ready: true,
    database: 'connected',
    timestamp: new Date().toISOString(),
    uptime: Math.floor((Date.now() - startTime) / 1000),
  });
});

/**
 * General health summary endpoint
 */
router.get('/', (req, res) => {
  const dbOk = isDbConnected();

  return res.status(dbOk ? 200 : 503).json({
    status: dbOk ? 'healthy' : 'degraded',
    application: 'Chandan Tiwadi Portfolio CMS Backend',
    version: '1.0.0',
    database: {
      status: dbOk ? 'connected' : 'disconnected',
    },
    uptime: `${Math.floor((Date.now() - startTime) / 1000)}s`,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

export default router;

