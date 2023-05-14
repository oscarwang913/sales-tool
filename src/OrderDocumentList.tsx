import { useState, useEffect } from "react";
import * as R from "ramda";
import { Button, Dialog, DialogTitle } from "@mui/material";
import { documents } from "./utils/constants";
import OrderDocument from "./OrderDocument";


export interface Item {
  title: string;
  isCompleted: boolean;
}

interface Document {
  name: string;
  isCompleted: boolean;
  items: Item[];
}

export interface Order {
  name: string;
  documents: Document[];
}


const ooooo = ['6201077753',
'6201210392',
'6201168028',
'6201358491',
'6201398548',
'6201398545',
'6201398546',
'6201398547',
'6201398549',
'6201398553',
'6201398535',
'6201456251',
'6201492364',
'6201456276',
'6201508444',
'6201508459',
'6201534505',
'6201534506',
'6201534507',
'6201619557',
'6201593954',
'6201593905',
'6201593911',
'6201593928',
'6261732020',
'6261906056',
'6261906055',
'6261906052',
'6261906057',
'6261860130',
'6261867344',
'6261940325',
'6261940310',
'6261940326',
'6261940311',
'6261940305',
'6261860096',
'6261930521',
'6261987987',
'6262012839',
'6262036823',
'6261967064',
'6261967065',
'6261967123',
'6261987960',
'6261987973',
'6261987944',
'6261987988',
'6262012831',
'6261987900',
'6262036847',
'6262036849',
'6261923106',
'6262134965',
'6262134921',
'6261923098',
'6262070967',
'6262166831',
'6262261956',
'6262261957',
'6262261960',
'6262261958',
'6262261959',
'6262261955',
'6261987990',
'6272458304',
'6262186331',
'6262208323',
'6272491947',
'6272511058',
'6272449391',
'6272449376',
'6272511060',
'6272524668',]

const OrderDocuments = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false)
  const [timer, setTimer] = useState(null);
  const handleCreateNewOrder = () => {
    setOrders([
      ...orders,
      {
        name: "",
        documents,
      },
    ]);
  };

  useEffect(() => {
    let items = [];
    for (var key in localStorage) {
      if (key) {
        items.push(JSON.parse(localStorage.getItem(key) || "{}"));
      }
    }

    items = R.filter((item) => R.isNotNil(item), items);

    setOrders([...items]);
  }, []);

  const handleOpenDialog = (value: boolean) => {
    setShouldOpenDialog(value)
  }

  const onClose = () => {
    setShouldOpenDialog(false)
    timer && clearTimeout(timer);
  }

  const testFunc = (arr: string[]) => {
    return arr.map((item: string) => {
      const xx = item.slice(4, 6)
      const yy = item.slice(6, 8)
      const zz = item.slice(8, 10)
      return `1.1${xx}.1${yy}.1${zz}`
    })
  }

  console.log(testFunc(ooooo))

  return (
    <>
      <div style={{display: 'flex'}}>
        {orders &&
          orders.map((item, index) => (
            <OrderDocument 
              key={index} 
              orderProps={item} 
              handleOpenDialog={handleOpenDialog}
              setTimer={setTimer}
            />
          ))}
      </div>
      <div>
        <Button onClick={handleCreateNewOrder}>Create New Order</Button>
      </div>
      <Dialog
        open={shouldOpenDialog}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Saving.....
        </DialogTitle>
      </Dialog>
    </>
  );
};
export default OrderDocuments;
