import React from 'react';
import '../Page.css';
import Navbar from '../../Navbar';
function Cook() {

  return (
    <div>
<Navbar />
      <div className='hero-container'>
        <h1 className="cook_heading">The most common used Cookwares</h1>
        <p className="cook_text">Incase if you want to cook Ethiopian Food</p>
      </div>

      <div class="cards-list-cook">
        <div class="card 1">
          <div class="card_image"> <img src="images/Mitad.jpg" alt="Digital Grill for Injera" />
            <h4 className="card_details_cook">Digital Grill (Ye' Injera Mitad)</h4>
            <p>It  is mostly used to bake injera which is flat pancake like ethiopian main food. This is essential to have

              <a href="https://www.wasselectronics.com/">
                <button aria-label="button" >Buy here</button>
              </a>


            </p>

          </div>
        </div>

        <div class="card 2">
          <div class="card_image">
            <img src="images/sefed.jpg" alt="Sefed to use for baking Injera" />
            <h4 className="card_details_cook">Sefed</h4>
            <p>It  is mostly used to bake injera which is flat pancake like ethiopian main food. This is essential to have
              <a href="https://www.etsy.com/listing/787624634/ethiopian-ceramic-nonstick-cookware?">
                <button aria-label="button">Buy here</button>
              </a>
            </p>

          </div>

        </div>


        <div class="card 3">
          <div class="card_image">
            <img src="images/shekila_dist.jpg" alt="Shekila Dist or Clay Pot" />
            <h4 className="card_details_cook">Clay Cooking Pot (Ye'Shekila Dist)</h4>
            <p>It  is mostly used to bake injera which is flat pancake like ethiopian main food. This is essential to have
              <a href="https://www.etsy.com/listing/787624634/ethiopian-ceramic-nonstick-cookware?gpla=1">
                <button aria-label="button" onclick="btnFunction6()">Buy here</button>
              </a>

            </p>

          </div>

        </div>

      </div>



    </div>
  );
}




export default Cook;