import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PaidIcon from "@mui/icons-material/Paid";
import { Button, Toolbar, AppBar, Tooltip, Box } from "@mui/material";
import LOGO from "../../assets/img/logo.png";
import useAccount from "../../store/account";
import useGetRequest from "../../store/useGetMethod";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#f2f7fb",
      darker: "#053e85",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

const AppHeader = () => {
  const { account, logOut } = useAccount();
  const { getAccountBalance } = useGetRequest();
  const [balance, setBalance] = useState("");

  const getBalance = async () => {
    const balance = await getAccountBalance(account);
    setBalance(balance);
  };

  useEffect(() => {
    if (account) {
      getBalance();
    }
  }, [account, balance]);

  const navigate = useNavigate();
  const moveToHome = () => navigate("/");

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: "var(--mainColor-Nav)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Tooltip title="dashboard">
            <Button variant="text" size="small" onClick={moveToHome} style={{ color: "white", fontWeight: "bold", marginLeft: "13px", fontSize: "15px" }}>
              <img src={LOGO} className="filter-white" alt="near pocket logo" width="75px" style={{ paddingRight: "10px" }} />
            </Button>
          </Tooltip>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", fontSize: "14px" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {account && (
              <>
                <AccountBalanceWalletIcon
                  sx={{
                    fontSize: "23px",
                    marginRight: "4px",
                    marginTop: "4px",
                  }}
                />
                <span style={{ fontSize: "17px" }}>
                  <span style={{ fontWeight: "bold" }}>address</span> : {account.slice(0, 8)}...{account.slice(-7)}
                </span>
              </>
            )}
            {account && (
              <>
                <PaidIcon
                  sx={{
                    fontSize: "23px",
                    marginLeft: "10px",
                    marginRight: "4px",
                    marginTop: "4px",
                  }}
                />
                <span style={{ fontSize: "17px" }}>
                  <span style={{ fontWeight: "bold" }}>balance</span> : {balance.slice(0, 8)}... ETH
                </span>
              </>
            )}
          </Box>
          {account && (
            <Button
              onClick={logOut}
              variant="contained"
              size="small"
              sx={{
                fontSize: "9px",
                marginLeft: "15px",
                marginRight: "13px",
                fontWeight: "bold",
              }}
              theme={theme}
            >
              logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
