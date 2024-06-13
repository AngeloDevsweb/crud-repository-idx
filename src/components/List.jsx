import { useEffect, useState } from "react";
import credentials from "../credential";

import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  getDoc
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
const db = getFirestore(credentials);
const storage = getStorage(credentials);

const List = () => {
  const [list, setList] = useState([]);
  const [client, setClient] = useState(null);
  const [url, setUrl] = useState("");
  const [habilitar, setHabilitar] = useState(false);
  //renderizar la lista de clientes en el componente
  useEffect(() => {
    const getList = async () => {
      const data = await getDocs(collection(db, "clientes"));
      setList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getList();
  }, [list]);

  const deleteClient = async (id) => {
    await deleteDoc(doc(db, "clientes", id));
    alert("Cliente eliminado con exito");
  };

  const getClient = async (id) => {
    const docSnap = await getDoc(doc(db, "clientes", id));
    if (docSnap.exists()) {
      setClient({ ...docSnap.data(), id: docSnap.id });
      setUrl(docSnap.data().foto);
      setHabilitar(true);  // Habilitar el botón de guardar cuando se cargan los datos del cliente
    } else {
      console.log("No such document!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };

  const fileHandler = async (e) => {
    try {
      const archivoI = e.target.files[0];
      const refArchivo = ref(storage, `clientes/${archivoI.name}`);
      await uploadBytes(refArchivo, archivoI);
      const url = await getDownloadURL(refArchivo);
      setUrl(url);
      alert("Imagen cargada con exito");
      setHabilitar(true);
    } catch (error) {
      alert(error);
    }
  };

  const updateClient = async (e) => {
    e.preventDefault();
    try {
      const updatedClient = {
        ...client,
        foto: url,
      };
      await updateDoc(doc(db, "clientes", client.id), updatedClient);
      alert("Cliente actualizado con exito");
      setClient(null);
      setUrl("");
      setHabilitar(false);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {list.map((client) => (
          <div className="col" key={client.id}>
            <div className="shadow-sm rounded m-1">
                <img src={client.foto} width={"100%"} height={250} alt="" />
              <h5 className="mt-3">{client.nombre} <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"  onClick={() => getClient(client.id)}>editar</button></h5>
              <p>Direccion: {client.direccion}</p>
              <p>Telefono: {client.telefono}</p>
              <p>Web: {client.web}</p>
              <p>Email: {client.email}</p>
              <button className="btn btn-danger" onClick={()=>deleteClient(client.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
      
        {/* <!-- Modal --> */}
        {/* Modal */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Actualizar Cliente
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {client && (
                <form onSubmit={updateClient}>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control mt-2 mb-2"
                      id="floatingInput"
                      placeholder="ingresar nombre"
                      name="nombre"
                      onChange={handleChange}
                      value={client.nombre}
                      required
                    />
                    <label htmlFor="floatingInput">Ingresar nombre</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control mt-2 mb-2"
                      id="floatingInput"
                      placeholder="ingresar direccion"
                      name="direccion"
                      onChange={handleChange}
                      value={client.direccion}
                      required
                    />
                    <label htmlFor="floatingInput">Ingresar direccion</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control mt-2 mb-2"
                      id="floatingInput"
                      placeholder="ingresar telefono"
                      name="telefono"
                      onChange={handleChange}
                      value={client.telefono}
                      required
                    />
                    <label htmlFor="floatingInput">Ingresar telefono</label>
                  </div>
                  <div>
                    <label> Elegir foto de perfil</label>
                    <input
                      type="file"
                      id="foto"
                      className="form-control"
                      onChange={fileHandler}
                      
                    />
                  </div>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control mt-2 mb-2"
                      id="floatingInput"
                      placeholder="ingresar web"
                      name="web"
                      onChange={handleChange}
                      value={client.web}
                      required
                    />
                    <label htmlFor="floatingInput">Web</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control mt-2 mb-2"
                      id="floatingInput"
                      placeholder="ingresar email"
                      name="email"
                      onChange={handleChange}
                      value={client.email}
                      required
                    />
                    <label htmlFor="floatingInput">Email</label>
                  </div>
                  <button
                    className={
                      habilitar
                        ? "form-control btn btn-primary"
                        : "form-control btn btn-secondary disabled"
                    }
                    disabled={!habilitar}
                  >
                    {habilitar ? "Actualizar Cliente" : "Llena los campos"}
                  </button>
                </form>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;

