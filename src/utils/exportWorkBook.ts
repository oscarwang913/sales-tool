import * as XLSX from 'xlsx';
import { RowsData } from '../ExcelTool';
const exportWorkbook = (values: RowsData[]) => {
  const result = values.map((item) => {
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
  XLSX.writeFile(workbook, "serialNumber.xlsx", { compression: true });
}

export default exportWorkbook;