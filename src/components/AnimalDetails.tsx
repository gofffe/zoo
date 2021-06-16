import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Redirect } from "react-router-dom";

import { Animal } from "../models/Animal";

import "./styles/AnimalDetails.scss";

interface IParams {
  id: string;
}

export function AnimalDetails() {
  let { id } = useParams<IParams>();

  let initialValue: Animal = {id: 0, name: '', latinName: '', yearOfBirth: 0, shortDescription: '', longDescription: '', imageUrl: '', medicine: '', isFed: false, lastFed: new Date()};
  const [animal, setAnimal] = useState(initialValue);

  const [buttonClass, setButtonClass] = useState("button-disabled");
  const [notificationClass, setNotificationClass] = useState("notification");
  const [notification, setNotification] = useState("Jag är mätt och belåten!");

  let fromLS: string | null = localStorage.getItem("animals");

  let formattedDate: string = (new Date(animal.lastFed)).toLocaleString();

  
  useEffect(() => {
    if (fromLS) {
      const animalsLS: Animal[] = JSON.parse(fromLS);
 
      for (let i = 0; i < animalsLS.length; i++) {
        if (animalsLS[i].id === +id) {
          let now: Date = new Date();
          let lastFed: Date = new Date(animalsLS[i].lastFed);
          let differenceInMilliSec: number = now.getTime() - lastFed.getTime();
          let differenceInHours: number = Math.floor(differenceInMilliSec / (1000*60*60));
          
          //Time check for when animal was last fed, change boolean, update states and LS
          if (differenceInHours >= 3) {
            setButtonClass("button-enabled");
            setNotificationClass("notification-yellow");
            setNotification("Jag är lite hungrig!");

            animalsLS[i].isFed = false;

            localStorage.setItem("animals", JSON.stringify(animalsLS));
          }
          //Time check for when animal was last fed, update states
          if (differenceInHours >= 4) {
            setNotificationClass("notification-red");
            setNotification("Jag är jättehungrig!");
          }
          setAnimal(animalsLS[i]);
        }
      }
    }
  }, [id, fromLS]);


  function feedAnimal() {
    if (fromLS) {
      const animalsLS: Animal[] = JSON.parse(fromLS);
      
      //Change date and boolean if animal is being fed, update states and LS
      for (let i = 0; i < animalsLS.length; i++) {
        if (animalsLS[i].id === +id) {
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

  if (+id <= 0) {
    return (<Redirect to="/" />);
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
