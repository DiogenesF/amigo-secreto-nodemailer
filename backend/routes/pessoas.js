const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const Pessoas = require("../models/Pessoas");

//@route    /pessoas
//@desc     get all records in Pessoas
router.get("/", async (req, res) => {
  try {
    const pessoas = await Pessoas.find();

    res.json(pessoas);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error!");
  }
});

//@route    /pessoas/criar
//@desc     create new record in Pessoas
router.post("/criar", async (req, res) => {
  const { nome, email } = req.body;

  try {
    const verifica = await validarRegistroCriar(nome, email, res);
    if (verifica !== true) {
      return res.status(400).send(verifica);
    }

    pessoa = new Pessoas({
      nome,
      email,
    });

    await pessoa.save();
    res.json(pessoa);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error!");
  }
});
//@route    pessoas/editar/:id
//@desc     edit a record in Pessoas
router.put("/editar/:id", async (req, res) => {
  try {
    const { nome, email } = req.body;
    const verifica = await validarRegistroEditar(
      nome,
      email,
      req.params.id,
      res
    );

    if (verifica !== true) {
      return res.status(400).send(verifica);
    }
    const pessoa = await Pessoas.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    res.json(pessoa);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

//@route    pessoas/deletar/:id
//@desc     delete a record in Pessoas
router.delete("/deletar/:id", async (req, res) => {
  try {
    await Pessoas.findOneAndRemove({ _id: req.params.id });

    res.json({ msg: "Excluido com sucesso" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

//@route    pessoas/amigos/
//@desc     Add the amigo field to each record
router.put("/amigos", async (req, res) => {
  try {
    const pessoas = await Pessoas.find();

    req.body.map((each_obj) => {
      sendEmail(each_obj.email, each_obj.amigo);
      for (let i = 0; i < pessoas.length; i++) {
        if (each_obj.nome === pessoas[i].nome) {
          pessoas[i].amigo = each_obj.amigo;
          pessoas[i].save();
          break;
        }
      }
    });

    res.send("Emails enviados com sucesso!");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

//function to send the email
async function sendEmail(email, amigo) {
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "",
        pass: "",
      },
    });

    let info = await transporter.sendMail({
      from: "",
      to: email,
      subject: "Seu amigo secreto",
      text: amigo,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.log(err);
  }
}

//Functions that help checking the fields to create/edit
const verificarNome = async (nome, res) => {
  try {
    const existe = await Pessoas.findOne({ nome });
    if (existe) {
      return "Esse nome já está em uso";
    }
    return true;
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error!");
  }
};

const verificarEmail = async (email, res) => {
  try {
    const existe = await Pessoas.findOne({ email });
    if (existe) {
      return "Esse email já está em uso";
    }
    return true;
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error!");
  }
};

const validarRegistroEditar = async (nome, email, id, res) => {
  try {
    let pessoa = await Pessoas.findOne({ _id: id });

    if (pessoa.email === email && pessoa.nome === nome) {
      return true;
    } else if (pessoa.email === email && pessoa.nome !== nome) {
      return verificarNome(nome, res);
    } else if (pessoa.email !== email && pessoa.nome === nome) {
      return verificarEmail(email, res);
    } else {
      const emailcheck = verificarEmail(email, res);
      const nomecheck = verificarNome(nome, res);
      if (emailcheck === true && nomecheck === true) {
        return true;
      } else if (emailcheck === true && nomecheck !== true) {
        return nomecheck;
      } else {
        return emailcheck;
      }
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error!");
  }
};

const validarRegistroCriar = async (nome, email, res) => {
  try {
    let pessoa = await Pessoas.findOne({ email });
    if (pessoa) {
      if (pessoa.nome === nome) {
        return "Esse nome e email já estão em uso";
      }
      return "Esse email já está em uso";
    }
    return verificarNome(nome, res);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error!");
  }
};

module.exports = router;
