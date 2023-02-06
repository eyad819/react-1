import React from 'react';
import Header from "./header";
import Footer from "./Footer";
const Loading = () => {
  return (
    <div>
    <Header />
    <main >
      <div className="loading"></div>
    </main>
    <Footer />
  </div>
  );
}
// style={{marginBottom:"311px",marginTop:"311px"}}
export default Loading;
