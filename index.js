require("dotenv").config();
const express = require("express");
const app = express();

const  PORT =  process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res)=>{
  res.send('The API is running');
})

//app.use(express.static(path.join(__dirname, 'public')))

const usersRouter = require("./routes/users");
const moviesRouter = require("./routes/movies");
const genreRoutes = require('./routes/genres');

app.use("/users", usersRouter);
app.use("/movies", moviesRouter);
app.use('/genres', genreRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on  http://localhost: ${PORT}`);
});
