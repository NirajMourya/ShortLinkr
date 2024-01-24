import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home/Home'
import ContactUs from './components/ContactUs/ContactUs'
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <BrowserRouter>
       <Toaster 
        position='top-right'
        toastOptions={{
          duration: 3000,
        }}
      />
     <Header/>
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/contactus' element={<ContactUs />}/>
     </Routes>
     <Footer/>
    </BrowserRouter>
  );
}

export default App;