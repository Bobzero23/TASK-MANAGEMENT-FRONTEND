import { ThemeProvider } from "@emotion/react";
import { darkTheme } from "./theme/DarkTheme";
import Navbar from "./page/navbar/Navbar";
import Home from "./home/Home";
import Auth from "./page/auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTasks } from "./reduxToolkit/TaskSlice";
import { getUserProfile } from "./reduxToolkit/AuthSlice";
import { Box } from "@mui/material";

function App() {
  const { task, auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks({}));
    dispatch(getUserProfile(auth.jwt || localStorage.getItem("jwt")));
  }, [auth.jwt]);

  return (
    <ThemeProvider theme={darkTheme}>
      {auth.user ? (
        <Box width="100%" sx={{ width: "100%" }}>
          <Navbar />
          <Home />
        </Box>
      ) : (
        <Auth />
      )}
    </ThemeProvider>
  );
}

export default App;
