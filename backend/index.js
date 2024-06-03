import express from "express";
import cors from "cors"
import { mongodbConnection } from "./db/db.js";
import { config } from "dotenv"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload"
import UserRouter from "./router/UserRouter.js"
import { errorMiddleware } from "./middleware/errorMiddleWare.js";

const app = express();
config({ path: "./config/config.env" })

const PORT = 3000;

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    method: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200
}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload({ useTempFile: true, tempFileDir: "/tmp/" }))

mongodbConnection();


//route
app.use("/api/v1", UserRouter)

app.get("/", (req, res) => {
    res.status(200).json("hello world")
})

app.listen(PORT, () => {
    console.log("listening on port " + PORT);
})

app.use(errorMiddleware)