import React from 'react';
import './../Page.css'

import Navbar from '../../Navbar';


function Ingredients() {

  return (
    <div>
<Navbar />
      <div className='hero-container'>

        <h1 className="ing_heading">Common Spices used in Ethiopion Foods</h1>
        <p className="ing_text">Some of them are hot !</p>
        <div className='hero-btns'>

        </div>
      </div>

      <div class="cards-list-ing">

        <div class="card 1">
          <div class="card_image"> <img src="images/Berbere.jpg" alt="Berbere" />
            <h5 className='card_details_ing'> Berbere</h5>


            <p className='card_details_ing'>Berbere is the most popular spice for Ethiopian cooking (hot and spicy). It is a blend of spices: Paprika, Cayenne, Fenugreek, Cinnamon, Clove,Ginger, Turmeric, korerima and more. It is used for making Sega wot (beef stew), Doro wot (chicken stew), Kik wot (red lintel stew), Awaze sauce... </p>

          </div>

        </div>

        <div class="card 2">
          <div class="card_image">
            <img src="images/teff.jpg" alt="Teff flour" />
            <h5 className='card_details_ing'>Teff</h5>
            <p className='card_details_ing'>Teff (white) is a special Ethiopian cereal grain used to make Injera (Ethiopian flat bread). </p>



          </div>
        </div>

        <div class="card 3">
          <div class="card_image">
            <img src="images/mitten_shiro.jpg"  alt="Collard Green"/>
            <h5 className='card_details_ing'> Mitten Shiro</h5>
            <p className='card_details_ing'>Mitten Shiro is seasoned chickpea flour used for making a popular Ethiopian dish called Shiro. It can also be used to add flavor and thicken a pot roast. Ingredients: Berbere, onions powder, ginger powder, garlic powder.</p>


          </div>

        </div>

      </div>



      <div class="cards-list-ing">
        <div class="card 1">
          <div class="card_image"> <img src="images/mitmita.jpg" alt="Mitmita Spice" />
            <h5 className='card_details_ing'>Mitimita </h5>
            <p className='card_details_ing'>Mitmita is hot spice bend made of chili peppers,
              garlic, cardamom, salt, white cumin,
              white cumin and more used for making traditional dish Kitfo.</p>
          </div>


        </div>

        <div class="card 2">
          <div class="card_image">
            <img src="images/Tibs_Kimem.png" alt="Tibs Spice" />
            <h5 className='card_details_ing'>Tibs Kimem</h5>
            <p className='card_details_ing'>Tips kimem is our own exclusive blend of spices (Korerima, Koseret, Beso bela, rosemary, garlic and more)
              which can be used to cook traditional Ethiopian sauteed beef, chicken, lamb or fish tips dishes. It can also be used as a dry rub spice
              for many non traditional for oven or grill cooked dishes.</p>

          </div>

        </div>


        <div class="card 3">
          <div class="card_image">
            <img src="images/wot_kimem.jpg" alt="Wot Kimem" />
            <h5 className='card_details_ing'> Wotkimem</h5>
            <p className='card_details_ing'>Wot Kimem also known as Mekelesha is a special blend of 7 spices used to give the extra finishing flavor for most Ethiopian red wot (stew) dishes. Korerima, cumin,
              cloves, black pepper, ginger, cinnamon and timiz.</p>

          </div>

        </div>

      </div>
      <div></div>

      <h5 className='hero-container-bottom'>Want to know where to find them ?</h5>
      <div>
        <a href="https://ethiopianspices.com/collections/ethiopian-spices/products/shiro-mitten">
          <button className="btn_ing">Learn More</button>
        </a>
      </div>



      <div>
        <footer> © EthioFood 2021</footer>
      </div>

    </div>

  );
}




export default Ingredients;