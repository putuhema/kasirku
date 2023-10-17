import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { Routes } from "./interfaces/routes.interface";
import { DB } from "./database";
import { logger, stream } from "./utils/logger";
import {
  CREDENTIALS,
  LOG_FORMAT,
  NODE_ENV,
  ORIGIN,
  PORT,
  allowedOrigins,
} from "./config";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error.middleware";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

export class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || "development";
    this.port = PORT || 3000;

    this.connectToDatabase();
    this.initializeMiddleware();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`================================`);
      logger.info(`====== ENV: ${this.env} ========`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabase() {
    await DB.sequelize.sync({ force: false });
  }

  private initializeMiddleware() {
    this.app.use("/uploads", express.static("uploads"));
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(
      cors({
        origin: (origin, callback) => {
          if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
          } else {
            callback(new Error("Not allowed by CORS"));
          }
        },
        optionsSuccessStatus: 200,
        credentials: CREDENTIALS,
      })
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: "REST API",
          version: "1.0.0",
          description: "Example docs",
        },
      },
      apis: ["swagger.yaml"],
    };

    const specs = swaggerJSDoc(options);
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
}
