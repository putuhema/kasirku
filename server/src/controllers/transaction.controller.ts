import { Category } from "@/interfaces/category.interface";
import { Transaction } from "@/interfaces/transaction.interface";
import { CategoryService } from "@/services/category.service";
import { TransactionService } from "@/services/transaction.service";
import { NextFunction, Request, Response } from "express";
import Container from "typedi";

export class TransactionController {
  public transaction = Container.get(TransactionService);

  public getAllTransaction = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const findTransactions: Transaction[] =
        await this.transaction.getAllTransaction();
      res.status(200).json({
        data: findTransactions,
        message: "findAllTrasaction",
      });
    } catch (error) {
      next(error);
    }
  };

  public getTransaction = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const transactionId = Number(req.params.id);
      const findTransaction: Transaction =
        await this.transaction.getTransaction(transactionId);
      res.status(200).json({
        data: findTransaction,
        message: "findAllTrasaction",
      });
    } catch (error) {
      next(error);
    }
  };

  public getTodayTransaction = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const date = new Date(req.query.date as string);
      const findTransactions = await this.transaction.salesAggregateToday(date);
      res.status(200).json({
        data: findTransactions,
        message: "salesToday",
      });
    } catch (error) {
      next(error);
    }
  };
  public getSalesPerDay = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const findTransactions = await this.transaction.salesPerday();
      res.status(200).json({
        data: findTransactions,
        message: "salesPerDay",
      });
    } catch (error) {
      next(error);
    }
  };

  public createTrasaction = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { name, payment, orders } = req.body;
      const newCategory = await this.transaction.createTransaction({
        name,
        payment,
        orders,
      });

      res.status(200).json({
        data: newCategory,
        message: "createTrasaction",
      });
    } catch (error) {
      next(error);
    }
  };

  public deleteTransaction = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const transactionId = Number(req.params.id);
      const deletedTransaction = await this.transaction.deleteTransaction(
        transactionId
      );

      res.status(200).json({
        data: deletedTransaction,
        message: "deleteTransaction",
      });
    } catch (error) {
      next(error);
    }
  };
}
