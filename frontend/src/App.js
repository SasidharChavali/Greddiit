import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "Pages/HomePage";
import LoginPage from "Pages/LoginPage";
import Profile from "Pages/ProfilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import UserOpenedSubGred from "Pages/UserOpenedSubGred";
import MySubGred from "Pages/MySubGred";
import AllSubGred from "Pages/AllSubGred"
//import Navbar from "Pages/Navbar";
import OpenedSubGred from "Pages/OpenedSubGred";
import Savedposts from "Pages/SavedPosts";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  const { picturePath } = useSelector((state) => state.user) ?? {};

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <Profile /> : <Navigate to="/" />}
            />
            <Route
              path="/mysubgreddiits"
              element={isAuth ? <MySubGred picturePath={picturePath}/> : <Navigate to="/" />}
            />
            <Route
              path="/mysubgreddiits/:subgredId"
              element={isAuth ? <UserOpenedSubGred/> : <Navigate to="/" />}
            />
            <Route
              path="/allsubgreddiits"
              element={isAuth ? <AllSubGred/> : <Navigate to="/" />}
            />
            <Route
              path="/allsubgreddiits/:subgredId"
              element={isAuth ? <OpenedSubGred picturePath={picturePath}/> : <Navigate to="/" />}
            />
            <Route exact path="/savedposts" element={<Savedposts />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
