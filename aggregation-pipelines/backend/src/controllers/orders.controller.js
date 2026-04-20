import { ApiResponse } from "../../../../async-handler/ApiResponse.js";
import orderModel from "../models/order.model.js";
import { ApiError } from "../utils/ApiError.js";
import asyncWrapper from "../utils/asyncHandler.js";



export const generateOrder = asyncWrapper(async (req, res) => {
  const { userId, orderNumber, status, products } = req.body;

  const order = await orderModel.create({
    user: userId,
    orderNumber: orderNumber,
    status: status,
    product: products.map((item) => ({
      productName: item.productName,
      productQyt: item.productQyt,
      price: item.price,
    })),
  });

  if (!order) {
    throw new ApiError(
      500,
      "something went wrong while creating an order, please try again",
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, order, "order created successfully"));
});

export const getOrderStats = asyncWrapper(async (req, res) => {
    const {month, year}= req.query


        const m = parseInt(month)
        const y= parseInt(year)



  const pipeline = [

    // Filtering the orders of one month 
    {
        $match : {createdAt : {
                $gte : new Date(y , m-1, 1),
                $lt : new Date(y, m, 1)
            }}
    },
    {
        // Using $facet to make sub pipelines
      $facet: {

        // Getting total orders
        totalOrders: [
          {
            $group: {
              _id: null,
              orderCount: { $sum: 1 },
            },
          },
        ],

        // Getting total revenue and Average Order value of completed orders
        revenueStats: [
          {
            $match: {
              status: "completed",
            },
          },
          {
            $unwind: "$product",
          },
          {
            $group: {
              _id: "$orderNumber",
              totalAmount: {
                $sum: {
                  $multiply: ["$product.price", "$product.productQyt"],
                },
              },
            },
          },
          {
            $group: {
              _id: null,
              totalRevenue: {
                $sum: "$totalAmount",
              },
              avgOrderValue: {
                $avg: "$totalAmount",
              },
            },
          },
        ],

        // Getting the numbers of orders w.r.t the order's status
        ordersByStatus: [
          {
            $group: {
              _id: "$status",
              count: { $sum: 1 },
            },
          },
        ],

        // Getting top selling product
        topSellingProduct: [
          { $unwind: "$product" },
          {
            $group: {
              _id: "$product.productName",
              totalSold: { $sum: "$product.productQyt" },
            },
          },
          { $sort: { totalSold: -1 } },
          { $limit: 1 },
        ],
      },
    },
    {
      $project: {
        totalRevenue: { $arrayElemAt: ["$revenueStats.totalRevenue", 0] },
        avgOrderValue: { $arrayElemAt: ["$revenueStats.avgOrderValue", 0] },
        totalOrders:{$arrayElemAt:["$totalOrders.orderCount", 0]},
        topSellingProduct: { $arrayElemAt: ["$topSellingProduct._id", 0] },
        ordersByStatus: {
            $arrayToObject : {
                $map :{
                    input : "$ordersByStatus",
                    as : "item",
                    in: {k : "$$item._id", v: "$$item.count"}
                }
            }
        },
      },
    },
  ];

  const result = await orderModel.aggregate(pipeline);
  if (!result || result.length ===0) {
    throw new ApiError(400, "something went wrong with stats");
  }

  console.log(result);
  return res
    .status(200)
    .json(new ApiResponse(201, result, "stats are successful"));
});

