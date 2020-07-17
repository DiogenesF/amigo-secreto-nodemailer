import React, { useState } from "react";
import axios from "axios";

const CreateInput = ({ setFlag, flag }) => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
  });
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/pessoas/criar", formData);
      setFlag(!flag);
      setFormData({ nome: "", email: "" });
    } catch (error) {
      setError(error.response.data);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div style={{ textAlign: "center" }}>
          <h3>Criar nova pessoa</h3>
        </div>

        {error.length > 0 ? (
          <div
            style={{
              margin: "auto",
              width: "60%",
              padding: "10px",
              textAlign: "center",
              backgroundColor: "red",
              color: "white",
            }}
          >
            {error}
          </div>
        ) : null}

        <div style={{ marginRight: "120px" }}>
          <div style={{ textAlign: "center" }}>
            <label
              style={{
                display: "inline-block",
                width: "100px",
                textAlign: "right",
                margin: "10px",
              }}
              htmlFor="nome"
            >
              Nome:{" "}
            </label>
            <input
              value={formData.nome}
              onChange={(e) => onChange(e)}
              style={{ padding: "5px" }}
              id="nome"
              name="nome"
              type="text"
              required
            ></input>
          </div>
          <div style={{ textAlign: "center" }}>
            <label
              style={{
                display: "inline-block",
                width: "100px",
                textAlign: "right",
                margin: "10px",
              }}
              htmlFor="email"
            >
              Email:{" "}
            </label>

            <input
              value={formData.email}
              onChange={(e) => onChange(e)}
              style={{ padding: "5px" }}
              id="email"
              name="email"
              type="email"
              required
            ></input>
          </div>
        </div>
        <div style={{ textAlign: "center", padding: "10px" }}>
          <button>Criar</button>
        </div>
      </form>
    </div>
  );
};

export default CreateInput;
