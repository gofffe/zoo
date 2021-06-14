import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { Animal } from "../models/Animal";

import "./styles/Animal.css";

interface IParams {
  id: string;
}

export function OneAnimal() {
  let { id } = useParams<IParams>(); // console.log(id); //varför loggar den id 2 gånger?
  let idAsNumber: number = +id;

  let initialValue: Animal = {id: 0, name: '', latinName: '', yearOfBirth: 0, shortDescription: '', longDescription: '', imageUrl: '', medicine: '', isFed: false, lastFed: new Date()};
  const [animal, setAnimal] = useState(initialValue);

  const [buttonClass, setButtonClass] = useState("button-disabled");
  const [notificationClass, setNotificationClass] = useState("notification");
  const [notification, setNotification] = useState("Jag är mätt och belåten!");

  let fromLS = localStorage.getItem("animals");

  let formattedDate = (new Date(animal.lastFed)).toLocaleString();

  
  useEffect(() => {
    if (fromLS !== null) {
      const animalsLS = JSON.parse(fromLS);
      console.log(animalsLS);

      //Time check for when animal was last fed, update LS
      for (let i = 0; i < animalsLS.length; i++) {
        if (animalsLS[i].id === idAsNumber) {
          let now = new Date();
          let lastFed = new Date(animalsLS[i].lastFed);
          let differenceInMilliSec = now.getTime() - lastFed.getTime();
          let differenceInHours = Math.floor((differenceInMilliSec / (1000*60*60)) % 24);

          if (differenceInHours >= 3) {
            console.log("Djuret behöver mat");
            setButtonClass("button-enabled");
            setNotificationClass("notification-yellow");
            setNotification("Jag är lite hungrig!");

            animalsLS[i].isFed = false;

            localStorage.setItem("animals", JSON.stringify(animalsLS));
          }

          if (differenceInHours >= 4) {
            console.log("Djuret säger till dig att den behöver mat");
            setNotificationClass("notification-red");
            setNotification("Jag är jättehungrig!");
          }
          setAnimal(animalsLS[i]);
        }
      }
    }
  }, [idAsNumber, fromLS]);


  function feedAnimal() {
    console.log("Du matade djuret");
    if (fromLS !== null) {
      const animalsLS = JSON.parse(fromLS);
      
      //Change date and boolean if animal is being fed, update LS
      for (let i = 0; i < animalsLS.length; i++) {
        if (animalsLS[i].id === idAsNumber) {
          setButtonClass("button-disabled");
          setNotificationClass("notification");
          setNotification("Jag är mätt och belåten!");

          animalsLS[i].isFed = true;
          animalsLS[i].lastFed = new Date();

          localStorage.setItem("animals", JSON.stringify(animalsLS));
        }
      }
    }
  }

  return (
    <>
      <div className="animal-container">
        <h3>{animal.name}</h3>
        <div className="image-facts">
          <img src={animal.imageUrl} alt={"Bild på " + animal.name} />
          <div className="facts">
            <p><strong>Latinskt namn:</strong> {animal.latinName}</p>
            <p><strong>Födelseår:</strong> {animal.yearOfBirth}</p>
            <p><strong>Medicin:</strong> {animal.medicine}</p>
            <p><strong>Matad:</strong> {formattedDate}</p>
          </div>
        </div>
        <p className={notificationClass}>{notification}</p>
        <button type="button" className={buttonClass} disabled={animal.isFed === true} onClick={feedAnimal}>Mata mig</button>
        <div className="description">
          <p>{animal.longDescription}</p>
        </div>
      </div>
    </>
  );
}
