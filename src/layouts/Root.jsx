import React, { useContext, useEffect } from 'react'
import NavBar from './Navbar'
import { Outlet, useLocation } from 'react-router'
import { Bounce, ToastContainer } from 'react-toastify'
import Footer from './Footer'
import { authContext } from './AuthProvider/AuthProvider'
import Loading from './Loading'
import AOS from 'aos';
import 'aos/dist/aos.css';

function Root() {
  useEffect(() => {
    AOS.init({
      duration: 800, // Animation duration in ms
      once: true,    // Whether animation should happen only once while scrolling down
      easing: 'ease-out-cubic',
    });
  }, []);
  const {loading} = useContext(authContext);
  if(loading){
    return <Loading></Loading>
  }
  return (
    <div>
        <NavBar></NavBar>
        <Outlet></Outlet>
        <Footer></Footer>
        <ToastContainer
         position='top-center' 
         autoClose={3000} 
         theme='dark'
         hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Bounce}
         ></ToastContainer>
    </div>
  )
}

export default Root