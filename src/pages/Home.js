import React, { useContext } from "react";
import Carouselavis from "../components/carousel/CarouselAvis";
import Formcontact from "../components/Form/FormContact";
import { UserContext } from "../context/userContext";
import "./Home.css";

function Home() {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="public-home">
      <div className="welcome-banner"></div>
      <div className="section-row">
        <div className="content-image1"></div>
        <div className="content-text1">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut orci
            mauris, pulvinar nec quam non, egestas scelerisque leo. Vivamus
            consectetur ante id sem imperdiet ornare eget mollis velit. Ut porta
            nisi non sodales vehicula. Integer in ante cursus, aliquam ipsum
            vel, tincidunt magna. In posuere eu nibh sit amet ultricies. Aenean
            hendrerit ut turpis at semper. Pellentesque lacinia dolor eget
            molestie consectetur. Vivamus a quam quis magna tincidunt
            condimentum. Orci varius natoque penatibus et magnis dis.
          </p>
        </div>
      </div>

      <div className="section-column">
        <div className="title-image">
          <div className="title">
            <h1>
              Notre <br></br>équipe
            </h1>
          </div>
          <div className="content-image2"></div>
        </div>
        <div className="content-text2">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut orci
            mauris, pulvinar nec quam non, egestas scelerisque leo. Vivamus
            consectetur ante id sem imperdiet ornare eget mollis velit. Ut porta
            nisi non sodales vehicula. Integer in ante cursus, aliquam ipsum
            vel, tincidunt magna. In posuere eu nibh sit amet ultricies. Aenean
            hendrerit ut turpis at semper.
          </p>
        </div>
      </div>

      <Carouselavis />
      <Formcontact />


      {/* <h1 className="display-3 text-center">{currentUser ? "Bienvenu ! " : "Bonjour, veuillez vous inscrire ou vous connecter 👋"} </h1> */}
    </div>
  );
}

export default Home;
