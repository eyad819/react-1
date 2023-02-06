import Loading from "../comp/loading";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";

import Header from '../comp/header';
import Footer from '../comp/Footer';
import MainContent from '../comp/MainContent';
import { Helmet  } from 'react-helmet-async';
import {  useEffect} from 'react';
import { useNavigate } from "react-router-dom";
const About = () => {
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();
  useEffect(() => {
    if(!user && !loading){
      navigate("/");
    }
    if (user) {
      if (!user.emailVerified) {
        navigate("/");
      
      }
    }
  });
  if (loading) {
    return <Loading />;
  }
  if (user) {
  
    if (user.emailVerified) {
      return (
        <>
             <Helmet>
            <title>About Page</title>
          </Helmet>
        <Header />
        
        <main style={{ height: "calc(100vh - 133px)" }}>
      <MainContent  pageName="About Page"  /> 
    </main>  
        <Footer />
      </>
      );
    }
  }
  return (
    <>
         <Helmet>
        <title>About Page</title>
      </Helmet>
    <Header />
    
    <main style={{ height: "calc(100vh - 133px)" }}>
      <MainContent  pageName="About Page"  /> 
    </main>  
    <Footer />
  </>
  );
}

export default About;
