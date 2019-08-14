const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const logger = require("./middlewere/logger");
const members = require("./members");

const app = express();

//init middlewere
//app.use(logger); // <-- logging the url to terminal form midllwere

// handlebars middlewere
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// body parser middlewere
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// hompage route
app.get("/", (req, res) =>
  res.render("index", {
    title: "Members App",
    members
  })
);

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// members API routes
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on ${PORT}`));
