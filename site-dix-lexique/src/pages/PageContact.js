import React from "react";
import Navigation from "../components/Navigation/Navigation";
import './PageContact.css'
import Footer from "../components/Footer/Footer";

function PageContact(){

    const backTopPage = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return(
        <div>
            <Navigation> </Navigation>

            <div className="contact-banniere">
                <section className="contact-presentation">
                    <div className="contact-text">
                        <h1>Contactez-nous</h1>
                        <p>
                            Vous avez des questions ou souhaitez en savoir plus sur notre test de détection de la dyslexie ? 
                            N'hésitez pas à nous contacter via le formulaire ci-dessous, ou par les moyens de contact listés. 
                            Nous serons ravis de vous aider et de répondre à vos questions.
                        </p>
                    </div>
                </section>
            </div>

            <div className="contact-form-section">
                <h2>Envoyez-nous un message</h2>
                <form className="contact-form">
                    <label>
                        Nom:
                        <input type="text" name="name" required />
                    </label>
                    <label>
                        Email:
                        <input type="email" name="email" required />
                    </label>
                    <label>
                        Message:
                        <textarea name="message" rows="4" required></textarea>
                    </label>
                    <button type="submit" className="btn-primary">Envoyer</button>
                </form>
            </div>

            <div className="contact-info">
                <h2>Informations de contact</h2>
                <p>Email: contact@votreprojet.com</p>
                <p>Téléphone: +33 1 23 45 67 89</p>
                <p>Adresse: 123 Rue Exemple, 33000 Bordeaux, France</p>
            </div>

            <Footer></Footer>
        </div>
    )
}

export default PageContact;
