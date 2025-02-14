import {
  type User,
  type InsertUser,
  type FeatureFlag,
  type InsertFeatureFlag,
  type Configuration,
  type InsertConfiguration,
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Features
  getAllFeatures(): Promise<FeatureFlag[]>;
  getFeature(id: number): Promise<FeatureFlag | undefined>;
  createFeature(feature: InsertFeatureFlag): Promise<FeatureFlag>;
  updateFeature(
    id: number,
    update: Partial<FeatureFlag>
  ): Promise<FeatureFlag | undefined>;

  // Configurations
  getAllConfigurations(): Promise<Configuration[]>;
  getConfiguration(id: number): Promise<Configuration | undefined>;
  createConfiguration(config: InsertConfiguration): Promise<Configuration>;
  updateConfiguration(
    id: number,
    update: Partial<Configuration>
  ): Promise<Configuration | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private features: Map<number, FeatureFlag>;
  private configurations: Map<number, Configuration>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.features = new Map();
    this.configurations = new Map();
    this.currentId = 1;
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Features
  async getAllFeatures(): Promise<FeatureFlag[]> {
    return Array.from(this.features.values());
  }

  async getFeature(id: number): Promise<FeatureFlag | undefined> {
    return this.features.get(id);
  }

  async createFeature(insertFeature: InsertFeatureFlag): Promise<FeatureFlag> {
    const id = this.currentId++;
    const feature = { ...insertFeature, id };
    this.features.set(id, feature);
    return feature;
  }

  async updateFeature(
    id: number,
    update: Partial<FeatureFlag>
  ): Promise<FeatureFlag | undefined> {
    const feature = this.features.get(id);
    if (!feature) return undefined;

    const updated = { ...feature, ...update };
    this.features.set(id, updated);
    return updated;
  }

  // Configurations
  async getAllConfigurations(): Promise<Configuration[]> {
    return Array.from(this.configurations.values());
  }

  async getConfiguration(id: number): Promise<Configuration | undefined> {
    return this.configurations.get(id);
  }

  async createConfiguration(
    insertConfig: InsertConfiguration
  ): Promise<Configuration> {
    const id = this.currentId++;
    const config = { ...insertConfig, id };
    this.configurations.set(id, config);
    return config;
  }

  async updateConfiguration(
    id: number,
    update: Partial<Configuration>
  ): Promise<Configuration | undefined> {
    const config = this.configurations.get(id);
    if (!config) return undefined;

    const updated = { ...config, ...update };
    this.configurations.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
