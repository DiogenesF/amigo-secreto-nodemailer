import React, { useState } from "react";
import axios from "axios";

const StartButton = ({ pessoas }) => {
  const [messageSuccess, setMessageSuccess] = useState("");
  let sorteio = JSON.parse(JSON.stringify(pessoas));
  const handleClick = async () => {
    if (pessoas.length === 0) {
      console.log("Nenhum participante");
    } else if (pessoas.length === 1) {
      console.log("Apenas um participante");
    } else {
      let i = 0;
      const numbersOut = [];

      while (i < pessoas.length) {
        const valor = Math.floor(Math.random() * pessoas.length);

        if (valor === i || numbersOut.includes(valor)) {
          continue;
        }
        sorteio[i].amigo = pessoas[valor].nome;
        numbersOut.push(valor);
        i++;
      }
    }
    await axios.put("http://localhost:5000/pessoas/amigos", sorteio);
    setMessageSuccess(
      "O sorteio ja foi realizado, um email está sendo enviado aos participantes"
    );
    setTimeout(() => {
      setMessageSuccess("");
    }, 3000);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <button
        onClick={() => handleClick()}
        type="button"
        style={{
          margin: "2px",
          backgroundColor: "green",
          color: "black",
          padding: "10px",
          borderRadius: "10px",
          border: "1px solid black",
        }}
      >
        Iniciar sorteio
      </button>
      {messageSuccess.length > 0 ? (
        <div
          style={{
            margin: "auto",
            width: "60%",
            padding: "10px",
            textAlign: "center",
            backgroundColor: "green",
            color: "white",
          }}
        >
          {messageSuccess}
        </div>
      ) : null}
      <div style={{ textAlign: "center" }}></div>
    </div>
  );
};

export default StartButton;
