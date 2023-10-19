import { DB } from "@/database";
import { CreateTransactionDto } from "@/dtos/transaction.dto";
import { HttpException } from "@/exceptions/HttpException";
import { Transaction } from "@/interfaces/transaction.interface";
import { Op } from "sequelize";
import { Service } from "typedi";

@Service()
export class TransactionService {
  public async getAllTransaction(): Promise<Transaction[]> {
    const findAllTransaction: Transaction[] = await DB.Transaction.findAll({
      include: DB.TrasactionDetail,
      where: {
        status: "active",
      },
    });

    return findAllTransaction;
  }

  public async getTransaction(transactionId: number): Promise<Transaction> {
    const findTransaction: Transaction = await DB.Transaction.findByPk(
      transactionId,
      {
        include: [
          {
            model: DB.TrasactionDetail,
            include: [
              {
                model: DB.Products,
                attributes: ["name", "img_url", "price", "stock"],
                include: [
                  {
                    model: DB.Category,
                    attributes: ["name", "id"],
                  },
                ],
              },
            ],
          },
        ],
      }
    );
    if (!findTransaction) throw new HttpException(409, "No Transaction");

    return findTransaction;
  }

  public async createTransaction(
    transaction: CreateTransactionDto
  ): Promise<Transaction> {
    const newTransaction = await DB.Transaction.create({
      paymentMethod: transaction.payment,
      costumerName: transaction.name,
    });

    const Orders = transaction.orders.map((order) => ({
      productId: order.productId,
      transactionId: newTransaction.id,
      price: order.price,
      quantity: order.quantity,
    }));
    await DB.TrasactionDetail.bulkCreate(Orders);

    return newTransaction;
  }

  public async deleteTransaction(transactionId: number) {
    const findTransaction = await DB.Transaction.findByPk(transactionId);
    if (!findTransaction)
      throw new HttpException(409, "Transaction doesn't exist");
    await DB.Transaction.destroy({
      where: {
        id: transactionId,
      },
    });

    return findTransaction;
  }

  public async salesAggregateToday(date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const todaySales = await DB.Transaction.findAll({
      include: {
        model: DB.TrasactionDetail,
        attributes: [
          [DB.sequelize.fn("SUM", DB.sequelize.col("price")), "totalPrice"],
        ],
      },
      attributes: [
        "id",
        [
          DB.sequelize.fn(
            "TIME",
            DB.sequelize.col("TransactionModel.created_at")
          ),
          "transactionTime",
        ],
        [
          DB.sequelize.fn("COUNT", DB.sequelize.col("TransactionModel.id")),
          "totalTransaction",
        ],
      ],
      where: {
        status: "active",
        createdAt: {
          [Op.between]: [startOfDay, endOfDay],
        },
      },
      group: ["transactionTime", "id"],
      raw: true,
    });

    const transformedData = {
      id: "Transactions",
      data: todaySales.map((item) => ({
        id: item.id,
        x: item["transactionTime"],
        y: item["totalTransaction"],
      })),
    };

    return transformedData;
  }

  public async salesPerday() {
    const startDate = new Date("2023-10-01");
    const endDate = new Date("2023-10-31");

    const salesPerday = await DB.Transaction.findAll({
      attributes: [
        [DB.sequelize.fn("DATE", DB.sequelize.col("created_at")), "day"],
        [
          DB.sequelize.fn("COUNT", DB.sequelize.col("TransactionModel.id")),
          "value",
        ],
      ],
      where: {
        status: "active",
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
      group: [DB.sequelize.fn("DATE", DB.sequelize.col("created_at"))],
      order: [[DB.sequelize.fn("DATE", DB.sequelize.col("created_at")), "ASC"]],
      raw: true,
    });

    return salesPerday;
  }
}
