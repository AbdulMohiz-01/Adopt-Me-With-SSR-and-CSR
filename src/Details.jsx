import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import fetchPet from "./fetchPet";
import { useQuery } from "@tanstack/react-query";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";
import AdoptedPetContext from "./AdoptedPetContext.js";

const Details = () => {
  const { id } = useParams();
  const [isOpen, toggleModal] = useState(false);
  const results = useQuery(["details", id], fetchPet);
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);
  function selectedImage(img) {
    setAdoptedPet(img);
  }

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🔃</h2>
      </div>
    );
  }
  const pet = results.data.pets[0];

  return (
    <div className="details">
      <Carousel images={pet.images} selectedImage={selectedImage} />
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
        <button onClick={() => toggleModal(true)}>Adopt {pet.name}</button>
        <p>{pet.description}</p>
      </div>
      {isOpen ? (
        <Modal>
          <h1>Would you like to adopt {pet.name}?</h1>
          <div className="buttons">
            <button
              onClick={() => {
                navigate("/");
              }}
            >
              Yes
            </button>
            <button onClick={() => toggleModal(false)}>No</button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};
function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;
