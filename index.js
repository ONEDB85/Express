import express from "express";
import favicon from "serve-favicon";
import path from "path";

const app = express();
const Port = 3000;
import data from "./data/data.json";

app.use(express.static("public"));

//method to use JSON
//app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

//this is for images folder on path images
app.use("/images", express.static("images"));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.get(
  "/",
  (req, res) =>
    //get data first from database(MongoDB)
    res.json(data)
  // res.send(`a get request with / route on port ${Port}`)
);

//JSON data
//{"hello": "JSON is cool"}
//hello=URLEncoded+is+cool

app.post("/newItem", (req, res) => {
  //get data first
  console.log(req.body);
  res.send(req.body);
});

app.get(
  "/item/:id",
  (req, res, next) => {
    //this is the the middleware that pulls the data
    console.log(req.params.id);
    let user = Number(req.params.id);
    console.log(user);
    console.log(data[user]);
    //middleware that uses the req object
    console.log(`Request from: ${req.originalUrl}`);
    console.log(`Request from: ${req.method}`);
    //everything above is middleware
    res.send(data[user]);
    next();
  },
  (req, res) => console.log("Did you get the right data?")
);

app
  .route("/item")
  .get((req, res) => {
    throw new Error();
    //res.download('images/rocket.jpg')
    //res.redirect('http://www.linkedin.com')
    //res.end()
    //res.send(`a get request with /item route on port ${Port}`)
  })
  .put((req, res) =>
    res.send(`a put request with /newItem route on port ${Port}`)
  )

  .delete((req, res) =>
    res.send(`a delete request with /item route on port ${Port}`)
  );

//Error handling function
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(`Red alert! Red Alert!: ${err.stack}`);
});

app.listen(Port, () => {
  console.log(`Your server is running on port ${Port}`);
  // console.log(data);
});
