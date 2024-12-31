
import React, { useState, useEffect,useRef } from 'react';
import './PresentationProjet.css';
import { getMyParc } from '../../services/api';
import { Link } from 'react-router-dom';



function PresentationParc() {



    const backTopPage = () => {

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }


  return (
    <div>
        
        <div className = "presentation"> 

            <div className="presentation-header">
              
            </div>

            <div className="presentation-projet">
                <div className="presentation-projet-container">
                    <div>
                        <img src = "img/Presentation_projet.jpg" alt="image projet" id="project-image" ></img> 
                    </div>
                        
                    <div>
                        <div className="presentation-projet-section">
                            
                            <section className="section-projet">
                                <h2>DIX-Lexique qu'est ce que c'est ? </h2>
                                <p>Notre projet vise à développer une solution innovante pour la détection de la dyslexie 
                                    à l'aide de l'intelligence artificielle. En combinant des techniques avancées d'apprentissage 
                                    automatique et d'analyse linguistique, notre outil analysera des paramètres tels que les erreurs de lecture, 
                                    de prononciation, et la vitesse de traitement. L'objectif est de fournir un diagnostic rapide et précis, 
                                    facilitant ainsi une intervention précoce et adaptée pour les personnes concernées. Ce projet pourrait bénéficier aux enseignants, 
                                    aux parents, et aux professionnels de la santé en les aidant à repérer plus efficacement les signes de dyslexie, tout en réduisant 
                                    les biais humains dans le diagnostic. </p>
                            </section>
                        
                        </div>
                    </div>  
                </div>
                  
            </div>

 
            <div className="btn-bottom">
                <div className="btn-primary btn-accueil btn-up" onClick={backTopPage}><p>Revenir en haut de page</p></div>
            </div>
        </div>
    </div>
  );
}export default PresentationParc
