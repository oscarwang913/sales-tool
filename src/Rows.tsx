import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FieldArray, FormikProvider } from 'formik';
import TextField from '@mui/material/TextField';


const Rows = ({ values, formik }: any) => {
  const { setFieldValue } = formik

  const onChange = (event: any, index: any, fieldName: string) => {
    setFieldValue(`rows[${index}].${fieldName}`, event.target.value)
  }
  
  return (
    <FormikProvider value={formik}>
      <FieldArray
        name="rows"
        render={(arrayHelpers) => values?.rows?.length ? (
          <>
            {values.rows?.map((row: any, index: number) => (
              <Box key={index}>
                <Box>{index}</Box>
                <TextField 
                  value={row.serialNumber}
                  placeholder='serialNumber'
                  name={`rows.${index}.serialNumber`}
                  onChange={(e:any) => onChange(e, index, 'serialNumber')}
                />
                <TextField 
                  value={row.softwareNumber}
                  placeholder='softwareNumber'
                  name={`rows.${index}.softwareNumber`}
                  onChange={(e:any) => onChange(e, index, 'softwareNumber')}
                />
                <TextField 
                  value={row.hardwareNumber}
                  placeholder='hardwareNumber'
                  name={`rows.${index}.hardwareNumber`}
                  onChange={(e:any) => onChange(e, index, 'hardwareNumber')}
                />
              </Box>
            ))}
            <Button 
              onClick={() => arrayHelpers.push({
                serialNumber: '',
                softwareNumber: '',
                hardwareNumber: '',
              })}
              variant="contained"
            >
              Add One Row
            </Button>
          </>
        )
        :
        <></>
      }
      />
    </FormikProvider>
  )
}

export default Rows