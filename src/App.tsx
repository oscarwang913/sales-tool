import { Routes, Route } from "react-router-dom"
import ExcelTool from './ExcelTool';
import OrderDocument from './OrderDocument';
import OrderDocumentList from './OrderDocumentList';
import Home from './Home'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/excel-tool" element={ <ExcelTool /> } />
        <Route path="/orders" element={ <OrderDocumentList/> } />
      </Routes>
    </div>
  )
}

export default App
