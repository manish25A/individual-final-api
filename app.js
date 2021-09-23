const express = require("express");
const morgan = require("morgan");
const connectDB = require("./bin/database");
const cookieParser = require("cookie-parser");
const path = require("path");
const colors = require("colors");
const dotenv = require("dotenv");
const cors = require("cors");
const createError = require("http-errors");
const helmet = require("helmet");
const csrf = require("csurf");
const expressSanitier = require("express-sanitizer");
const { xss } = require("express-xss-sanitizer");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const contentSecurityPolicy = require("helmet-csp");
dotenv.config({
  path: "./bin/config.env",
});
var csrfProtection = csrf({ cookie: true });
// Connect to mongoDB database
connectDB();
//static
const cartRoute = require("./routes/cartRoute");

// Load routes files
const customerRoute = require("./routes/customerRoute");
const productRoute = require("./routes/productRoute");
const vendorRoute = require("./routes/vendorRoute");

// initialize out app variable with express
const app = express();
app.use(express.static(path.join(__dirname, "public")));

//logger
app.use(morgan("dev"));
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

//using cors for react
// app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(
  express.urlencoded({
    urlencoded: true,
    extended: false,
  })
);
app.use(xss());
app.use(cookieParser());
app.use(helmet());
app.use(cors(corsOptions));
app.use(expressSanitier());
app.use("/customer/auth/", csrfProtection, customerRoute);
app.use("/product", csrfProtection, productRoute);
app.use("/vendor/auth/", csrfProtection, vendorRoute);
app.use("/cart/", csrfProtection, cartRoute);

app.use(
  contentSecurityPolicy({
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'", "default.example"],
      scriptSrc: ["'self'", "js.example.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
    reportOnly: false,
  })
);
app.set("trust proxy", 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

//  apply to all requests
app.use(limiter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// To remove data, use:
app.use(mongoSanitize());

// Or, to replace prohibited characters with _, use:
app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);
// error handler
app.use(function (err, req, res, next) {
  if (err.code !== "EBADCSRFTOKEN") return next(err);

  // handle CSRF token errors here
  res.status(403);
  res.send("form tampered with");
});
module.exports = app;
