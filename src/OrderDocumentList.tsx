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
