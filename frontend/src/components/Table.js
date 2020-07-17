import React, { useState, Fragment } from "react";
import axios from "axios";
import EditInput from "./EditInput";

const Table = ({ pessoas, setFlag, flag }) => {
  const [loading, setLoading] = useState(false);
  const [showEditField, setShowEditField] = useState(false);
  const [editId, setEditId] = useState(false);
  const [formEdit, setFormEdit] = useState({ nome: "", email: "" });

  const deleteButton = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5000/pessoas/deletar/${id}`);
      setFlag(!flag);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const editButton = (id, nome, email) => {
    setEditId(id);
    setFormEdit({ nome, email });
    setShowEditField(true);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      {showEditField ? (
        <EditInput
          formEdit={formEdit}
          editId={editId}
          setShowEditField={setShowEditField}
          setFlag={setFlag}
          flag={flag}
        />
      ) : (
        <Fragment>
          <h2 style={{ textAlign: "center" }}>Amigo secreto</h2>
          <h3 style={{ textAlign: "center" }}>Pessoas cadastradas</h3>
          <p style={{ textAlign: "center" }}>
            Ao iniciar o sorteio, cada pessoa cadastrada vai receber em seu
            email o amigo secreto que ela tirou
          </p>

          <p style={{ textAlign: "center" }}>{loading ? "Aguarde..." : null}</p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {pessoas && pessoas.length > 0 ? (
              <table style={{ textAlign: "center" }}>
                <tbody>
                  {pessoas.map((each) => (
                    <tr key={each._id}>
                      <td
                        style={{
                          padding: "10px",
                          border: "solid 2px gray",
                        }}
                      >
                        {each.nome}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          border: "solid 2px gray",
                        }}
                      >
                        <button
                          onClick={() =>
                            editButton(each._id, each.nome, each.email)
                          }
                          type="button"
                          style={{
                            margin: "2px",
                            backgroundColor: "#f0ad4e",
                            color: "black",
                            padding: "10px",
                            borderRadius: "10px",
                            border: "1px solid black",
                          }}
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => deleteButton(each._id)}
                          type="button"
                          style={{
                            margin: "2px",
                            backgroundColor: "red",
                            color: "black",
                            padding: "10px",
                            borderRadius: "10px",
                            border: "1px solid black",
                          }}
                        >
                          Apagar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ textAlign: "center" }}>
                Nenhuma pessoa cadastrada
              </div>
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Table;
