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

  const {values, setValues, resetForm} = formik

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

    const result = values.rows.map((item, index) => {
      let sw = item.softwareNumber.split(' ').sort().map(num => ({sw: num}))
      let hw = item.hardwareNumber.split(' ').sort().map(num => ({hw: num}))
      let arr = []
      for(let i = 0; i < sw.length; i++) {
        arr.push({
          serial: i === 0 ? item.serialNumber : '',
          sw: sw[i] ? sw[i].sw : '',
          hw: hw[i] ? hw[i].hw : '',
        })
      }
      return arr
    })

    const workbook = XLSX.utils.book_new();
    for(let i = 0; i < result.length; i++) {
      const ws = XLSX.utils.json_to_sheet(result[i]);
      XLSX.utils.book_append_sheet(workbook, ws, `Data-${i}`)
    }
    XLSX.writeFile(workbook, "Presidents.xlsx", { compression: true });
  }

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
        <Button variant="contained" onClick={onExport}>Export Xlxs file</Button>
        <Button variant="contained" onClick={resetRows}>Reset rows</Button>
      </Box>
    </Box>
  )
}

export default App
