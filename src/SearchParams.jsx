import React from "react";
import { useState, useContext } from "react";
import AdoptedPetContext from "./AdoptedPetContext.js";
import useBreedList from "./useBreedList.js";
import Results from "./Results.jsx";
import fetchSearch from "./fetchSearch.js";
import { useQuery } from "@tanstack/react-query";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

export default function SearchParams() {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const [adoptedPet] = useContext(AdoptedPetContext);

  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);

  // when the requestParams changes it automatically refetches the data. That's why we put the location, animal and breed in one bundle and only changes it when the form submits, so it never re-fetches the data whenever we change the location, animal or breed.

  const res = useQuery(["search", requestParams], fetchSearch);

  // The reason that why we gave the [] if there is nothing is that we wrote a logic in Results that if the pets are null then you should display pet not found. we could've put some loading there but that's our own choice.
  const pets = res.data?.pets ?? [];
  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          // updating the data
          const { location, animal, breed } = e.target.elements;
          setRequestParams({
            location: location.value,
            animal: animal.value,
            breed: breed.value,
          });
        }}
      >
        {console.log(adoptedPet)}
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input name="location" id="location" placeholder="Location" />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            name="animal"
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option value={animal} key={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select id="breed" disabled={!breeds.length} name="breed">
            <option />
            {breeds.map((breed) => (
              <option value={breed} key={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>

      <Results pets={pets} />
    </div>
  );
}
