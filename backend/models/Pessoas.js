const mongoose = require("mongoose");

const PessoasSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  amigo: {
    type: String,
  },
});

module.exports = Pessoas = mongoose.model("pessoas", PessoasSchema);
