import { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import exportWorkbook from './utils/exportWorkBook'
import generateRows from './utils/generateRows';
import './App.css'

import Rows from './Rows';

export interface RowsData {
  serialNumber: string,
  softwareNumber: string,
  hardwareNumber: string,
}

interface FormikInitialValue {
  rows: RowsData[]
}

function App() {
  const [rowsCount, setRowsCount] = useState<string>("")
  const handleRowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsCount(e.target.value);
  }

  const formik = useFormik<FormikInitialValue>({
    initialValues: {
      rows: []
    },
    validateOnChange: false,
    onSubmit: values => {},
  });

  const {values, setValues, resetForm} = formik

  const createRows = () => {
    const totalRows = generateRows(Number(rowsCount))
    setValues({rows: totalRows});
  }
  const isDisabled = Number(rowsCount) > 20

  const resetRows = () => {
    resetForm()
  }

  return (
    <Box className="App"> 
      <Box className="rowsCountInput">
        <TextField 
          id="outlined-basic"
          variant="outlined"
          placeholder='How much row do you need?'
          value={rowsCount}
          onChange={handleRowsChange}
          type="number"
          fullWidth
        />
        <Button variant="contained" onClick={createRows} disabled={isDisabled}>Click</Button>
      </Box>
      {Number(rowsCount) > 0 && <Rows values={values} formik={formik}/>}
      <Box className="button-group">
        <Button variant="contained" onClick={() => exportWorkbook(values?.rows)}>Export Xlxs file</Button>
        <Button variant="contained" onClick={resetRows}>Reset rows</Button>
      </Box>
    </Box>
  )
}

export default App
