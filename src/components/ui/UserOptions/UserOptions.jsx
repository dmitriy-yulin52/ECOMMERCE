import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import {userActions} from "../../../store/reducers/user/actions";
import {Backdrop, SpeedDial, SpeedDialAction} from "@mui/material";
import './UserOptions.scss'


const styleSpeedDial = { zIndex: "11" }
const styleBackdrop = { zIndex: "10" }


const UserOptions = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);

  const [open, setOpen] = useState(false);
  const history = useNavigate();
  const dispatch = useDispatch();

  const options = [
    { icon: <ListAltIcon />, name: "Заказы", func: orders },
    { icon: <PersonIcon />, name: "Профиль", func: account },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Корзина(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "Выход", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    history.push("/admin/dashboard");
  }

  function orders() {
    history.push("/orders");
  }
  function account() {
    history.push("/account");
  }
  function cart() {
    history.push("/cart");
  }
  function logoutUser() {
    dispatch(userActions.logout());
    alert.success("Вы успешно вышли из системы!");
  }

  const onClickSetOpenHandler = ()=>{
    setOpen(!open)
  }

  return (
    <>
      <Backdrop open={open} style={styleBackdrop} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={onClickSetOpenHandler}
        onOpen={onClickSetOpenHandler}
        style={styleSpeedDial}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserOptions;