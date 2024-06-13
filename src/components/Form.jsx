import credentials from '../../src/credential'
import {getFirestore, collection, addDoc} from 'firebase/firestore'
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'

const db = getFirestore(credentials)
const storage = getStorage(credentials)


import { useState } from "react";

const Form = () => {  
  const cliente = {
    nombre:'',
    direccion:'',
    telefono: '',
    web:'',
    email: '',
    
  }
  const [client, setClient] = useState(cliente);
  const [url, setUrl]=useState("")
  const [habilitar, setHabilitar] = useState(false)

    const handleChange = (e)=>{
      const {name, value} = e.target;
      setClient({...client, [name]: value})
    }

    const fileHandler = async(e)=>{
      try {
        //detectar el archivo
        const archivoI = e.target.files[0];
        //cargar en el storage
        const refArchivo = ref(storage, `clientes/${archivoI.name}`)
        await uploadBytes(refArchivo, archivoI)
        //obtener la url de la imagen
        const url = await getDownloadURL(refArchivo)
        setUrl(url)
        alert("Imagen cargada con exito")
        setHabilitar(true)
      } catch (error) {
        alert(error)
      }
    }
    const saveClient = async(e)=>{
        e.preventDefault();
       try {
        const newClient = {
          nombre: client.nombre,
          direccion: client.direccion,
          telefono: client.telefono,
          web: client.web,
          email: client.email,
          foto: url
        }
        await addDoc(collection(db, "clientes"), newClient)
        alert("Cliente registrado con exito")
        setClient(cliente)
        e.target.foto.value = ""
        setHabilitar(false)
       } catch (error) {
        alert(error)
       }
    }

  return (
    <div>
      <div className="shadow-sm rounded mt-5">
        <h4 className="text-center">Registro de cliente</h4>
        <form className="p-4" onSubmit={saveClient}>
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
              placeholder="ingresar nombre"
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
              placeholder="ingresar nombre"
              name="telefono"
              onChange={handleChange}
              value={client.telefono}
              required
            />
            <label htmlFor="floatingInput">Ingresar telefono</label>
          </div>
          <div>
            <label> Elegir foto de perfil</label>
            <input type="file"  id="foto" className="form-control" onChange={fileHandler}  required />
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
              placeholder="ingresar nombre"
              name="email"
              onChange={handleChange}
              value={client.email}
            />
            <label htmlFor="floatingInput">Email</label>
          </div>
          <button className= {habilitar ? "form-control btn btn-primary" : "form-control btn btn-secondary disabled"}>{habilitar ? "Guardar Producto" : "Llena los campos"}</button>
        </form>
      </div>
    </div>
  );
};

export default Form;
