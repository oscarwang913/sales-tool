
const generateRows = (rowsCount: number) => {
  return new Array(Number(rowsCount)).fill('').map((e, i) => {
    return {
      serialNumber: '',
      softwareNumber: '',
      hardwareNumber: '',
    }
  })
}

export default generateRows;