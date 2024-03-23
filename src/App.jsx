import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import AppLayout from './pages/AppLayout';
import CityList from "./components/CityList";
import { useEffect, useState } from "react";
import CountryList from "./components/CountryList";

const BASE_URL = 'http://localhost:2000'


function App() {
  
  const [cities,setCities] = useState([]);
  // const [countries,setCountries] = useState([]);

  const [isLoading,setIsLoading] = useState(false);

  useEffect(function(){
    async function fetchCities(){
      try{
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        console.log(data);
        setCities(data);
      }
      catch(error){
        alert('There was an error loading data..');
      }
      finally{
        setIsLoading(false); 
      }
    }

    fetchCities();
  },[]);
  
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<p>LIST</p>}></Route>
            <Route path="cities" element={<CityList cities={cities}  isLoading={isLoading}/>}></Route>
            <Route path="countries" element={<CountryList cities={cities}  isLoading={isLoading}/>}></Route>
            <Route path="form" element={<>map</>}></Route>
        </Route>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
    </>
   
   
  );
}

export default App;
