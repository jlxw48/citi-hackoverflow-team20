import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { TableFooter } from "@material-ui/core";
import BLUE from "../utils/Color";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

function createData(name, price) {
  return { name, price };
}

const rows = [
  createData("Pizza Slice", 4.0),
  createData("Ice cream", 10.3),
  createData("Chicken Bites", 6.0),
  createData("Cupcake", 4.3),
  createData("Pork", 3.9),
];

export default function BasicTable(props) {
  const history = useHistory();
  const [discount, setDiscount] = useState(props.discount);
  const calcTotal = (totalPrice, total) => {
    totalPrice = 0;
    rows.forEach((e) => {
      totalPrice += e.price;
    });
    if (total === true) return totalPrice;
    else return (1 - discount / 100) * totalPrice;
  };
  const foot = [
    createData("Total Before Discount", calcTotal(0, true)),
    createData("Discount", discount),
    createData("Total After Discount", calcTotal(0, false)),
  ];
  const transactionComplete = () => {
    history.push({
      pathname: "/cashier/complete",
      state: { data: foot[foot.length - 1].price.toFixed(2) },
    });
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow
              style={{
                backgroundColor: BLUE,
              }}
            >
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "1em",
                  color: "white",
                  borderRight: "1px solid rgba(224,224,224)",
                }}
              >
                Sale Item
              </TableCell>
              <TableCell
                align="right"
                style={{ fontWeight: "bold", fontSize: "1em", color: "white" }}
              >
                Price ($)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>

                <TableCell
                  align="right"
                  style={{
                    borderLeft: "1px solid rgba(224, 224, 224)",
                  }}
                >
                  {row.price.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            {foot.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row" align="right">
                  {row.name}
                </TableCell>

                <TableCell
                  align="right"
                  style={{
                    fontWeight: "bold",
                    borderLeft: "1px solid rgba(224, 224, 224)",
                  }}
                >
                  {row.name === "Discount"
                    ? row.price.toFixed(2) + "%"
                    : row.price.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableFooter>
        </Table>
      </TableContainer>
      <Button
        style={{
          backgroundColor: BLUE,
          width: "100%",
          marginTop: "5px",
          color: "white",
        }}
        onClick={transactionComplete}
      >
        Confirm
      </Button>
    </>
  );
}
