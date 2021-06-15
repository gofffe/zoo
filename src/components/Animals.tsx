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
                console.log("Hämtat från API");
            })
        } else {
            const animalsFromLS = JSON.parse(localStorage.getItem("animals") || "[]");

            setAnimals(animalsFromLS);
            console.log("Hämtat från LS");
        }
    }, []);


    let animalDiv = animals.map((animal) => {
        let now = new Date();
        let lastFed = new Date(animal.lastFed);
        let differenceInMilliSec = now.getTime() - lastFed.getTime(); //
        let differenceInHours = Math.floor(differenceInMilliSec / (1000*60*60));
        let isStarving = differenceInHours >= 4;

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
        <div className="animals-container">{animalDiv}</div>
      </>
    );
}
  