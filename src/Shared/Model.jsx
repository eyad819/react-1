import React from 'react';
import '../pages/Singin'
import { Helmet } from 'react-helmet-async';

const Model = ( {colseModel,children}) => {

  return (
    <div className="parent-of-model">
              <Helmet>
          
          <style type="text/css">{`
          
          .parent-of-model{
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgba(0, 0,0, 0.45);
          }
          
          
          
          .model{
            background-color: whitesmoke;
            width: 425px;
            height: 333px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: fixed;
        overflow-y: auto;
          
          margin: 0 0 50px 0;
          
          
        
          
          animation: mymove 0.8 
          }
          
          .model .close i{
            color: #444;
            font-size: 29px;
            position: absolute;
            top: 10px;
            right: 20px;
          }
          
          @keyframes mymove {
            0%   {  scale: 0;transform: translateY(-100vh);}
    
            100% {  scale: 1;transform: translateY(0);}
          } 
          `}</style>
        </Helmet>
    <form className={`model `}>
      <div
        onClick={() => {
          colseModel()
        }}
        className="close"
      >
        <i className="fa-solid fa-xmark"></i>
      </div>
      {children}
  
    </form>
  </div>
  );
}

export default Model;
