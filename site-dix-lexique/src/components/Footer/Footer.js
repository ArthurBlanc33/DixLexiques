import React, { useState } from 'react';
import './Footer.css';


function Footer() {
 
  return (
    <div>
      
        <div className="footer">

            <div className="footer-block APropos"> 

                <h2> A Propos</h2>
                <div className="footer-bottom">
                    <p> Site réalisé par ....... et ........ pour le projet .... </p>
                </div>
            </div>

            
            <div className="footer-block contact">  

                <h2> Conctact</h2>
                <div className="footer-bottom">
                    <p> +33 0707070710 </p>
                    <p>blablan@ensc.fr</p>
                    <p>blabla@ensc.fr</p>
                </div>
            </div>

            <img id = "logo-ensc" src="/img/Logo_ensc_2021.svg.png" alt="logo_connexion" />

        </div> 
    </div>
  );
}export default Footer