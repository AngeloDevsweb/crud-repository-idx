
import './App.css'
import Formu from './components/Form'
import List from './components/List'

function App() {

  return (
   <div className='container'>
    <div className="row g-1">
    <div className="col-md-4">
      <Formu />
    </div>
    <div className="col-md-8">
      <h2 className='text-center mt-5 mb-4'>Lista de clientes</h2>
      <List />
    </div>
    </div>
   </div>
  )
}

export default App
