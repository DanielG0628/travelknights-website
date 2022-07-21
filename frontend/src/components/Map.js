import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import usa from "../map/usaHigh.svg";
import logo from "../images/logo.png";
import { ReactComponent as Svg } from "../map/usaHigh.svg";
import AppBar from "@mui/material/AppBar";
import { useDispatch } from "react-redux";
import Toolbar from "@mui/material/Toolbar";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useRadioGroup } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import svg from "../map/usaHigh.svg";
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';


const theme = createTheme();
var htmlElement = "../map/usaHigh.svg";

//temp object before info is sent
const States = {FL:true, GA:false, NY:true};


export default function Map() {
  //useEffect needed to getElement without NULL result
  useEffect(() => {
    //will update for all states once object is sent
    var FL = document.getElementById("US-FL");
    if (States.FL == true)    
    FL.setAttribute("class", "visited");
  }, []);
  
  
  function sayHello(el) {
    if (el.id != "" && el.id != "USMap") {
      handleClickOpen();
      htmlElement = el.id;
      el.setAttribute("class", "visited");
    }
  }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const Logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  };


  console.log(user);
  return (
    <div>
      <Box onClick={(element) => sayHello(element.target)}>
        <AppBar position="static">
          <Toolbar sx={{ backgroundColor: "#65743a" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Travel Knights
            </Typography>

            <Button
              color="inherit"
              sx={{ textTransform: "none" }}
              onClick={handleOpenUserMenu}
            ></Button>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={Logout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        <Svg />

        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              The State you clicked was {htmlElement}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              This is {htmlElement}'s description!
            </Typography>
          </Box>
        </Fade>
      </Modal>
      </Box>
    </div>
  );
}
