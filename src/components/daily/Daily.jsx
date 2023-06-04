import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Card, CardContent, IconButton, Table, TableBody, TableCell, TableContainer, TableRow, Tooltip, Typography } from "@mui/material";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import useToast from "../../hooks/useToast";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import useGetDailyTransaction from "../../store/useGetDailyTransaction";
import useAccount from "../../store/account";

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        ...sx,
      }}
      {...other}
    />
  );
}

const Daily = ({ date, setDate }) => {
  const [rows, setRows] = useState([]);
  const { setToast } = useToast();
  const { token } = useAccount();
  const { dailyTx, getDailyTransaction } = useGetDailyTransaction();

  const zerofill = useCallback((value, fillCount) => {
    let result = value;

    if (typeof value === "number") result = value.toString();
    return result.padStart(fillCount, "0");
  }, []);

  useEffect(() => {
    getDailyTransaction(date, token);
  }, [date]);

  useEffect(() => {
    const transactionList = [];
    if (dailyTx) {
      setRows(dailyTx.DailyTnxsList);
    }
  }, [dailyTx]);

  const copyText = (e, text) => {
    e.stopPropagation();
    setToast("Copied to clipboard");
    navigator.clipboard.writeText(text);
  };

  const handleBack = () => {
    let time = new Date(date);
    let beforeTime = new Date(time.setDate(time.getDate() - 1));
    const currentMonth = beforeTime.getMonth() + 1;
    const conversionMonth = zerofill(currentMonth, 2);
    const currentDate = beforeTime.getDate();
    const conversionDate = zerofill(currentDate, 2);
    const requestString = `${beforeTime.getFullYear()}-${conversionMonth}-${conversionDate}`;
    setDate(requestString);
  };

  const handleNext = () => {
    let time = new Date(date);
    let beforeTime = new Date(time.setDate(time.getDate() + 1));
    const currentMonth = beforeTime.getMonth() + 1;
    const conversionMonth = zerofill(currentMonth, 2);
    const currentDate = beforeTime.getDate();
    const conversionDate = zerofill(currentDate, 2);
    const requestString = `${beforeTime.getFullYear()}-${conversionMonth}-${conversionDate}`;
    setDate(requestString);
  };

  const handleClose = () => {
    setDate("");
  };

  return (
    <>
      <Card sx={{ width: "100%", overflow: "hidden" }}>
        <CardContent>
          <Typography variant="h6" color="textSecondary" fontWeight="bold">
            <Box display="flex" sx={{ justifyContent: "space-between" }}>
              <Item></Item>
              <Item>
                <Button size="small" onClick={handleBack}>
                  <KeyboardArrowLeft />
                </Button>
                {date} Transaction Status
                <Button size="small" onClick={handleNext}>
                  <KeyboardArrowRight />
                </Button>
              </Item>
              <Item>
                <Button size="small" onClick={handleClose} sx={{ color: "#000" }}>
                  <CloseIcon />
                </Button>
              </Item>
            </Box>
          </Typography>
          <TableContainer sx={{ mt: 1, maxHeight: 630 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                {rows &&
                  rows.map((row, index) => (
                    <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <>
                        <TableCell component="th" scope="row">
                          <SyncAltIcon />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.transactionHash.slice(0, 8)}...{row.transactionHash.slice(-7)}
                          <Tooltip title="Copy to clipboard">
                            <IconButton size="small" aria-label="copy text" onClick={(e) => copyText(e, row.transactionHash)} sx={{ ml: "4px" }}>
                              <ContentCopyIcon style={{ fontSize: "14px" }} />
                            </IconButton>
                          </Tooltip>
                          <br /> {row.timeStamp}
                        </TableCell>
                        <TableCell align="left">Method : {row.method}</TableCell>
                        <TableCell align="right">
                          <span>Fee: {row.gasUsed} ETH</span>
                        </TableCell>
                      </>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </>
  );
};

export default Daily;
