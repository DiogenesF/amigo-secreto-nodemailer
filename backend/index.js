const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
connectDB();

const pessoasRouter = require("./routes/pessoas");

app.use(cors());
app.use(express.json({ extended: false }));

app.use("/pessoas", pessoasRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
