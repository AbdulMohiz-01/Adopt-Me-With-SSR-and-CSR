import React from "react";
import { useState, useContext } from "react";
import useBreedList from "./useBreedList.js";
import Results from "./Results.jsx";
import fetchSearch from "./fetchSearch.js";
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptedPetContext.js";

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
    <div className="my-0 mx-auto w-11/12">
      <form
        className="p-10 mb-10 rounded-lg bg-gray-200 flex flex-col justify-center items-center"
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
          <div className="w-52 h-52">
            <img
              src={adoptedPet}
              alt={adoptedPet.name}
              className="rounded-full"
            />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input
            type="text"
            className="search-input"
            name="location"
            id="location"
            placeholder="Location"
          />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            className="search-input"
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
          <select
            className="search-input grayed-out-disabled"
            id="breed"
            disabled={!breeds.length}
            name="breed"
          >
            <option />
            {breeds.map((breed) => (
              <option value={breed} key={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button className="rounded px-6 py-2 text-white bg-orange-500 hover:opacity-50">
          Submit
        </button>
      </form>

      <Results pets={pets} />
    </div>
  );
}
