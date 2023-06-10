import Header from './components/Header'
import { useState } from 'react';
import Deps from './components/Deps';
import Form2 from './components/Form2';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Submit from './components/Submit';
import { Link } from 'react-router-dom'
import Footer from './components/Footer';
import About from './components/About';

function App() {
  const [addDep, showForm] = useState(true)
  const [rawData, setRawData] = useState([])

  function add (data){
    setRawData([...rawData, data])
  }

  const deleteDep = (index) => {
    console.log(rawData[index])
    const temp = rawData.splice(index, 1)
    setRawData([...rawData])
  }


  return (
    <Router>
      <div className="container">
        <Header /> 
        <Routes>
          <Route path='/' element={
            <>
            {rawData.length > 0 && (
                <Deps data={rawData} onDelete={deleteDep}/> 
            )}

            {addDep && <Form2 onAdd={add}/>}
            {rawData.length > 0 && <Link className='btn' to='/submit'>Submit</Link>}
            </>} />

            <Route path='/submit' element={<Submit rawData={rawData} />} />
            <Route path='/about' element={<About/>} />

        </Routes>
        <Footer/>
        

      </div>
    </Router>
  );
}

export default App;

