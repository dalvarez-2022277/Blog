import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConnection } from "./mondodb.js";
import ComentsRoutes from "../src/Coments/Coments.routes.js";
import PostRoutes from "../src/Post/Post.routes.js";
import AuthRoutes from "../src/auth/auth.routes.js";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.authPath = '/blog/v1/auth'
    this.ComentsPath = "/blog/v1/coments";
    this.PostPath = "/blog/v1/publicate";

    this.dbConectarDb();
    this.middlewares();
    this.routes();
  }

  async dbConectarDb() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(morgan("dev"));
  }

  routes() {
    this.app.use(this.ComentsPath, ComentsRoutes);
    this.app.use(this.PostPath, PostRoutes);
    this.app.use(this.authPath, AuthRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port ", this.port);
    });
  }
}

export default Server;
