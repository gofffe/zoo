import axios from "axios";
import { useEffect, useState } from "react";

import { Animal } from "../models/Animal";

import './styles/Animals.css';

export function Animals() {
    let initialValue: Animal[] = [];
    const [animals, setAnimals] = useState(initialValue);

    useEffect(() => {
        axios.get<Animal[]>('https://animals.azurewebsites.net/api/animals').then(response => {
            localStorage.setItem("animals", JSON.stringify(response.data));
            setAnimals(response.data);
        })
    }, []);    

    let animalDiv = animals.map((animal) => {
        return (
        <div key={animal.id} className="animal">
            <h3>{animal.name}</h3>
            <p>{animal.shortDescription}</p>
        </div>
        )
    })

    return (
      <>
        <div className="animals-container">{animalDiv}</div>
      </>
    );
  }
  