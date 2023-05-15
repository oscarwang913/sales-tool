import { useState } from "react";
import * as R from "ramda";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Button,
} from "@mui/material";
import "./OrderDocument.css";
import { titles } from "./utils/constants";
import { Order, Item } from "./OrderDocumentList";

const OrderDocument = ({
  orderProps,
  handleOpenDialog,
  setTimer,
}: {
  setTimer: any;
  orderProps: Order;
  handleOpenDialog: (value: boolean) => void;
}) => {
  const [order, setOrder] = useState(orderProps);

  const handleCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    docItem: Item | null,
    docName: string | null
  ) => {
    const { name } = e.target;
    let newOrderDocuments = [...order?.documents];
    if (titles.includes(name.toLowerCase())) {
      newOrderDocuments = newOrderDocuments.map((doc) => {
        if (doc.name.toLowerCase() === name.toLowerCase()) {
          if (doc?.isCompleted) {
            const newItems = doc?.items?.map((item) => ({
              ...item,
              isCompleted: false,
            }));
            return {
              ...doc,
              isCompleted: false,
              items: newItems,
            };
          } else {
            const newItems = doc?.items?.map((item) => ({
              ...item,
              isCompleted: true,
            }));
            return {
              ...doc,
              isCompleted: true,
              items: newItems,
            };
          }
        }
        return doc;
      });
    } else {
      newOrderDocuments = newOrderDocuments.map((doc) => {
        const newItems = doc?.items?.map((item) => {
          if (item?.title === docItem?.title) {
            console.log(item?.isCompleted);
            return {
              ...item,
              isCompleted: !item?.isCompleted,
            };
          }
          return item;
        });
        return {
          ...doc,
          items: newItems,
        };
      });
      newOrderDocuments = newOrderDocuments.map((doc) => {
        if (doc.name.toLowerCase() === docName?.toLowerCase()) {
          if (
            doc?.items?.some((item) => !item?.isCompleted) &&
            doc?.isCompleted
          ) {
            return {
              ...doc,
              isCompleted: false,
            };
          } else if (
            doc?.items?.every((item) => item?.isCompleted) &&
            !doc?.isCompleted
          ) {
            return {
              ...doc,
              isCompleted: true,
            };
          }
        }
        return doc;
      });
    }
    setOrder({ ...order, documents: newOrderDocuments });
  };

  const handleSave = () => {
    handleOpenDialog(true);
    localStorage.setItem(order?.name, JSON.stringify(order));
    setTimer(setTimeout(() => {
      handleOpenDialog(false);
    }, 900));
  };

  return (
    <div>
      {!R.isEmpty(order) && (
        <>
          <h1>Order document</h1>
          <div>
            <label htmlFor="">Order Name</label>
            <input
              type="text"
              value={order?.name}
              onChange={(e) => setOrder({ ...order, name: e.target.value })}
            />
          </div>
          <div>
            {order?.documents.map((doc) => (
              <FormGroup key={doc?.name}>
                <FormControlLabel
                  key={doc?.name}
                  control={
                    <Checkbox
                      name={doc?.name.toLowerCase()}
                      checked={doc?.isCompleted}
                      onChange={(e) => handleCheck(e, null, null)}
                      color="success"
                    />
                  }
                  label={
                    <Typography>{`${doc?.name
                      .charAt(0)
                      .toUpperCase()}${doc?.name.slice(1)}`}</Typography>
                  }
                />
                {doc?.items.map((item) => (
                  <div key={item?.title} className="test">
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={item?.title.toLowerCase()}
                          checked={item.isCompleted}
                          onChange={(e) => handleCheck(e, item, doc?.name)}
                        />
                      }
                      label={item?.title}
                    />
                  </div>
                ))}
              </FormGroup>
            ))}
          </div>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!order?.name}
          >
            Save
          </Button>
        </>
      )}
    </div>
  );
};
export default OrderDocument;
