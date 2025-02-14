import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertFeatureFlagSchema, insertConfigurationSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express) {
  // Features
  app.get("/api/features", async (_req, res) => {
    const features = await storage.getAllFeatures();
    res.json(features);
  });

  app.post("/api/features", async (req, res) => {
    try {
      const data = insertFeatureFlagSchema.parse(req.body);
      const feature = await storage.createFeature(data);
      res.json(feature);
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: fromZodError(err).message });
      }
    }
  });

  app.patch("/api/features/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const { enabled } = req.body;
    const feature = await storage.updateFeature(id, { enabled });
    res.json(feature);
  });

  // Configurations
  app.get("/api/configurations", async (_req, res) => {
    const configs = await storage.getAllConfigurations();
    res.json(configs);
  });

  app.post("/api/configurations", async (req, res) => {
    try {
      const data = insertConfigurationSchema.parse(req.body);
      const config = await storage.createConfiguration(data);
      res.json(config);
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: fromZodError(err).message });
      }
    }
  });

  app.patch("/api/configurations/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const { value } = req.body;
    const config = await storage.updateConfiguration(id, { value });
    res.json(config);
  });

  const httpServer = createServer(app);
  return httpServer;
}
