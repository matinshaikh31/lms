require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/user.route";
import courseRouter from "./routes/course.route";
import orderRouter from "./routes/order.route";
import nrouter from "./routes/notification.route";
import BadgeRouter from "./routes/badge.route";
import { rateLimit } from 'express-rate-limit'
import progressRouter from "./routes/userProgress.route";
import Arouter from "./routes/analytic.route";

// body parser
app.use(express.json({ limit: "50mb" }));

// cookie parser
app.use(cookieParser());

// cors => cross origin resource sharing
// origin: process.env.ORIGIN,
app.use(
    cors({
        origin: ['http://localhost:3000','http://localhost:5173'],
        credentials: true,
    })
);
// app.use(cors({ origin: process.env.ORIGIN, credentials: true, }))

// api requests limit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
})

// routes
app.use(
    "/api/v1",
    Arouter,
    nrouter,
    userRouter,
    orderRouter,
    courseRouter,
    BadgeRouter,
    progressRouter
);

// testing api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        succcess: true,
        message: "API is working",
    });
});

// unknown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err);
});

// middleware calls
app.use(limiter);
app.use(ErrorMiddleware);
