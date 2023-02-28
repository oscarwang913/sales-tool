import { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as XLSX from 'xlsx';
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

  const {values, setValues} = formik

  const createRows = () => {
    const totalRows = new Array(Number(rowsCount)).fill('').map((e, i) => {
      return {
        serialNumber: '',
        softwareNumber: '',
        hardwareNumber: '',
      }
    })
    setValues({rows: totalRows});
  }
  const isDisabled = Number(rowsCount) > 20

  const onExport = () => {
    console.log(values);
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(values.rows);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");
    XLSX.utils.book_append_sheet(workbook, worksheet, "ZXC");
    XLSX.writeFile(workbook, "Presidents.xlsx", { compression: true });
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
        />
        <Button variant="contained" onClick={createRows} disabled={isDisabled}>Click</Button>
      </Box>
      {Number(rowsCount) > 0 && <Rows values={values} formik={formik}/>}
      <Button onClick={onExport}>Export Xlxs file</Button>
    </Box>
  )
}

export default App
