require("dotenv").config();
const express = require("express");
const app = express();

const  PORT =  process.env.PORT || 5000;

app.get('/', (req, res)=>{
  res.send('The API is running');
})

const usersRouter = require("./routes/users");
//const moviesRouter = require("./routes/movies");

app.use(express.json());

app.use("/users", usersRouter);
//app.use("/movies", moviesRouter);

app.listen(port, () => {
  console.log(`Server listening on  http://localhost: ${PORT}`);
});
