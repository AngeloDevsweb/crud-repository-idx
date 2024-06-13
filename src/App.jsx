
import './App.css'
import Formu from './components/Form'

function App() {

  return (
   <div className='container'>
    <div className="row g-1">
    <div className="col-md-4">
      <Formu />
    </div>
    <div className="col-md-8">
      <h2 className='text-center'>Lista de clientes</h2>
    </div>
    </div>
   </div>
  )
}

export default App
