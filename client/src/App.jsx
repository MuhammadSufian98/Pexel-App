import { useState } from "react";
import Header from "./Components/Header-Footer/header";
import Footer from "./Components/Header-Footer/footer";
import MainPage from "./Components/MainPage/MainPage";
import FavoriteImages from "./Components/FavoritePage/FavoriteImages";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/favorite" element={<FavoriteImges />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
