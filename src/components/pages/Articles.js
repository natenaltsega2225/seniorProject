import React from 'react';
import '../Navbar';
import './Articles.css'

import Navbar from '../Navbar';


function Articles() {
  return (
    <div>
      <Navbar />
      <div className='hero-container'>

        <h1 className="artl_heading">Featured Articles</h1>
        <p className="artl_text">what do people say about Ethiopian food ?</p>

      </div>



      <div className="card-artl">
        <img src="images/blog_one.png" alt="food blof by wild junket"></img>


        <p>
          <a href="https://www.wildjunket.com/traditional-ethiopian-food-guide/">
            <button aria-label="Read More Button ">Read More</button>
          </a>
        </p>


      </div>

      <div className="card-artl_2">
        <img src="images/blog_two.png" alt="food blog by migratology"></img>
        <a href="https://migrationology.com/ethiopian-food-guide/">
          <button aria-label="Read More button ">Read More</button>
        </a>


      </div>



      <div>
        <footer className="articles"> © EthioFood 2021</footer>
      </div>











    </div>



  );


}



export default Articles;