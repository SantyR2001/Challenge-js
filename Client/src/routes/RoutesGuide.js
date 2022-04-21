import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../views/Home/index";

export default function Router(){
    return(
    <BrowserRouter>
        <Routes>
            <Route path="/" exact element={ <Home/> }/>
        </Routes>
    </BrowserRouter>
    )
}