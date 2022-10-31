import React, { useState, useEffect } from 'react';
import './Page.css';
import './../Navbar'
import Navbar from './../Navbar';
// import fire  from './subpages/Config/fire'
import { Link } from "react-router-dom";
import { db } from '../../fireConfig';
import { collection, addDoc } from "firebase/firestore"; 


const Home = () => {


  return (

    <div>
       <Navbar />

      <div className='hero-container' aria-label="Welcome message">

        <h1 className="home_heading">Welcome To the Ethiopian Food Guide</h1>
        <p className="home_text">The right place to learn about Ethiopian Foods</p>


      </div>

      <div class="cards-list-home">
        <div class="card 1">
          <div class="card_image"> <img src="images/injera_roll.jpg" alt="Injera" />

            <Link to="/Recipies">

              <button aria-label="Food button">Recipes </button>
            </Link>
          </div>

        </div>

        <div class="card 2">
          <div class="card_image">
            <img src="images/spices.jpg" alt="Ingredients" />

            <Link to="/Ingredients">

              <button aria-label="Ingredients button"> Ingredients </button>
            </Link>


          </div>
        </div>

        <div class="card 3">
          <div class="card_image">
            <img src="images/cookware.jpg" alt="Cookware" />

            <Link to="/Cook" >

              <button aria-label="Cook button"> Cook </button>
            </Link>
          </div>

        </div>


      </div>

      <div>

        <div className='hero-container_about'>

          <h2>About</h2>
          <p> A bit about  Ethiopian Food and Culture </p>

        </div>
        <p className='hero-container_text'>
          Ethiopia is located in the eastern part of Africa and is rich in diversified culture, religion, food, and
          archeological sites.
          Ethiopia is also one of the countries next to Liberia which was not colonized by any European country.
          This helps Ethiopia to keep its heritage, languages, calendar, and food until the present day.
          Ethiopia comprises eighty nations and nationalities of ethnic groups, with their unique languages and
          tradition.
          It is also the birthplace of humankind Lucy. "Lucy" is the nickname for one of the most well-known human
          ancestor fossils.
          Ethiopia has nine world heritage sites recognized and protected by UNESCO.
          Ethiopians don’t need any utensils, they use their hands to eat. Everyone gathers around the table and digs
          into a communal platter that is shared with each other.
          The food that is consumed mainly in the country is injera.
          It is a pancake-like flat bread and it's made from Teff flour.
          Ethiopian food is well flavored with a mixture of different spices and herbs, not extremely spicy in heat,
          but rather very well seasoned.
          Ethiopians don’t eat pork so most of the food comes from chicken, lamb, or beef.
          They also have a nice variety of vegan foods.Every Wednesday and Friday, people who follow the Ethiopian
          Orthodox faith fast from using dairy products.
          So, foods like Shiro wat, misir wat, Salata (salad) are the main vegan foods.
          On the other hand, foods like Doro wat (chicken stew), key wet (beef stew ), Gomen be siga ( beef with
          collard greens ), and Kitfo (raw minced beef) are the foods consumed other than Wednesdays and Fridays.
          Unlike the other states in the US, we don’t have an Ethiopian restaurant in Mississippi.
          This means a lot of Mississpean don’t know what Ethiopian food looks or tastes like.
          This is because there is a small number of Ethiopians living in Mississippi.
          That makes it challenging for the Mississippians to find an Ethiopian restaurant and to try the food.
          Even though there might be few people who had experience somewhere else, they won’t be able to have that
          again.
          There were previous attempts to create awareness about Ethiopian food. One of them was the “Gursha” app and
          it is only available in Google play store so ios users don’t have access to it.
          Then, this web app will be helpful for both ios and android users .

        </p>
      </div>



      <div>
        <footer> © EthioFood 2021</footer>
      </div>


    </div>



  );
}



export default Home;