import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Animal } from "../models/Animal";

import './styles/Animals.scss';

export function Animals() {
    let initialValue: Animal[] = [];
    const [animals, setAnimals] = useState(initialValue);


    useEffect(() => {
        if (!localStorage.getItem("animals")) {
            axios.get<Animal[]>('https://animals.azurewebsites.net/api/animals').then(response => {
                localStorage.setItem("animals", JSON.stringify(response.data));

                setAnimals(response.data);
            })
        } else {
            const animalsFromLS: Animal[] = JSON.parse(localStorage.getItem("animals") || "[]");

            setAnimals(animalsFromLS);
        }
    }, []);


    let animalContainer = animals.map((animal) => {
        let now: Date = new Date();
        let lastFed: Date = new Date(animal.lastFed);
        let differenceInMilliSec: number = now.getTime() - lastFed.getTime();
        let differenceInHours: number = Math.floor(differenceInMilliSec / (1000*60*60));
        let isStarving: boolean = differenceInHours >= 4;

        return (
            <div key={animal.id} className="animal">
                <Link to={"/animal/" + animal.id} className="link">
                    <h3>{animal.name}</h3>
                    <p>{animal.shortDescription}</p>
                    {isStarving ? <div className="notification">Hungrig!</div> : null}
                </Link>
            </div>
        )
    })

    return (
      <>
        <div className="animals-container">{animalContainer}</div>
      </>
    );
}
  