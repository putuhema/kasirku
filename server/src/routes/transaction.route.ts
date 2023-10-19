import { TransactionController } from "@/controllers/transaction.controller";
import { Routes } from "@/interfaces/routes.interface";
import { Router } from "express";

export class TrasactionRoute implements Routes {
  public path = "/transactions";

  public router = Router();
  public transaction = new TransactionController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.transaction.getAllTransaction);
    this.router.get(`${this.path}/:id(\\d+)`, this.transaction.getTransaction);
    this.router.get(`${this.path}/today`, this.transaction.getTodayTransaction);
    this.router.get(`${this.path}/sales`, this.transaction.getSalesPerDay);
    this.router.post(`${this.path}`, this.transaction.createTrasaction);
    this.router.post(
      `${this.path}/delete/:id(\\d+)`,
      this.transaction.deleteTransaction
    );
  }
}
