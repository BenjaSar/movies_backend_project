const express = require("express");
const app = express();
let port = 5000;

const usuariosRouter = require("./routes/users");
const moviesRouter = require("./routes/movies");

app.use(express.json());

app.use("/usuarios", usuariosRouter);
app.use("/movies", moviesRouter);

app.listen(port, () => {
  console.log(`Servidor ejecutandose en el puerto ${port}`);
});
