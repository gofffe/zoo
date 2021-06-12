import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { Animal } from "../models/Animal";

import "./styles/Animal.css";

interface IParams {
  id: string;
}

export function OneAnimal() {
  let { id } = useParams<IParams>(); // console.log(id); //varför loggar den id 2 gånger?
  let idParamAsNr: number = +id;

  let initialValue: Animal = {id: 0, name: '', latinName: '', yearOfBirth: 0, shortDescription: '', longDescription: '', imageUrl: '', medicine: '', isFed: false, lastFed: new Date()};
  const [animal, setAnimal] = useState(initialValue);

  let fromLS = localStorage.getItem("animals");

  useEffect(() => {
    if (fromLS !== null) {
      const animals = JSON.parse(fromLS);
      
      for (let i = 0; i < animals.length; i++) {
        if (animals[i].id === idParamAsNr) {
          setAnimal(animals[i]);
        }
      }
    }    
  }, [idParamAsNr, fromLS]);

  let formattedDate = (new Date(animal.lastFed)).toLocaleString();

  return (
    <>
      <div className="animal-container">
        <h3>{animal.name}</h3>
        <div className="image-facts">
          <img src={animal.imageUrl} alt={"Bild på" + animal.name} />
          <div className="facts">
            <p><strong>Latin:</strong> {animal.latinName}</p>
            <p><strong>Född:</strong> {animal.yearOfBirth}</p>
            <p><strong>Medicin:</strong> {animal.medicine}</p>
            <p><strong>Åt senast:</strong> {formattedDate}</p>
          </div>
        </div>
        <button type="button">Mata mig</button>
        <div className="description">
          <p>{animal.longDescription}</p>
        </div>
      </div>
    </>
  );
}
