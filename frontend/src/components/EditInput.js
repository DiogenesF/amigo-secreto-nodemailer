import React, { useState } from "react";
import axios from "axios";

const EditInput = ({
  formEdit: { nome, email },
  editId,
  setShowEditField,
  setFlag,
  flag,
}) => {
  const [formData, setFormData] = useState({
    nome,
    email,
  });
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/pessoas/editar/${editId}`,
        formData
      );
      setFlag(!flag);
      setTimeout(() => {
        setSuccessMsg("Editado com sucesso");
      }, 3000);
      setShowEditField(false);
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data);
      setInterval(() => {
        setError("");
      }, 5000);
    }
  };

  const handleBack = () => {
    setShowEditField(false);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div style={{ textAlign: "center" }}>
          <h3>Editar pessoa</h3>
        </div>
        {successMsg.length > 0 ? (
          <div
            style={{
              margin: "auto",
              width: "60%",
              padding: "10px",
              backgroundColor: "green",
              color: "white",
            }}
          >
            {successMsg}
          </div>
        ) : null}
        {error.length > 0 ? (
          <div
            style={{
              margin: "auto",
              width: "60%",
              padding: "10px",
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
          <button style={{ margin: "0px 2px" }} type="submit">
            Editar
          </button>
          <button style={{ margin: "0px 2px" }} onClick={() => handleBack()}>
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditInput;
