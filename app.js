import createError from "http-errors";
import express, { json, urlencoded } from "express";
import { config } from "dotenv";
import fs from "fs";
import { dbConnect } from "./dbConnect.js";
import router from "./Routes/routing.js";

var app = express();
config();
dbConnect();
// view engine setup
// app.set("views", join(__dirname, "views"));
// app.set("view engine", "pug");

//app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));

app.use((req, res, next) => {
  const logLine = `${new Date().toISOString()}:${req.method} ${req.path}\n`;
  fs.promises
    .appendFile("log.txt", logLine)
    .then(() => next())
    .catch((err) => {
      console.log("Error in writing log file ", err);
      next();
    });
});
// const swaggerOptions = {
//   swaggerDefinition: {
//     openapi: "3.0.0",
//     info: {
//       title: "My Notes",
//       description:
//         "This is REST API application created with Exoress. It help to fetch, create, update and delete notes",
//       version: "1.0.0",
//       contact: {
//         name: "Alex Bell",
//         url: "https://www.somealex.com",
//       },
//       servers: ["http://localhost:3000"],
//     },
//   },
//   apis: ["./routes/index.js"],
// };
// const swaggerDocs = swaggerJSDoc(swaggerOptions);
// app.use("/api-docs", serve, setup(swaggerDocs));
// app.use("/", indexRouter);
// app.use("/users", usersRouter);
// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });
app.use('/',router);
const port = process.env.PORT || 3000;
// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

app.listen(port, () => console.log(`Server listening on ${port}`));
export default app;
