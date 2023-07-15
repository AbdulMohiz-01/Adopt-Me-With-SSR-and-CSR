import { useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import fetchPet from "./fetchPet";
import { useQuery } from "@tanstack/react-query";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";
import AdoptedPetContext from "./AdoptedPetContext.js";
import Loading from "./Loading";

const Details = () => {
  const { id } = useParams();
  const [isOpen, toggleModal] = useState(false);
  const results = useQuery(["details", id], fetchPet);
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);
  const [selectedImage, setSelectedImage] = useState("");
  function selectedImagefunc(img) {
    setSelectedImage(img);
  }

  if (results.isLoading) {
    return <Loading />;
  }
  const pet = results.data.pets[0];

  return (
    <div className="flex justify-center items-center m-0 p-0">
      <div className="w-10/12 pl-4 pb-4 pr-4 pt-1 m-0 bg-slate-200 shadow-2xl rounded-xl">
        <div>
          <Link
            to="/"
            className="text-3xl text-slate-500 font-bold transition-colors hover:text-slate-700"
          >
            &larr;
          </Link>
        </div>

        <Carousel images={pet.images} selectedImage={selectedImagefunc} />
        <div className="flex flex-col justify-center items-center gap-2">
          <h1 className="text-5xl text-gray-900 font-extrabold relative">
            {pet.name}
          </h1>
          <h2 className="text-lg text-gray-500">{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
          <button
            className="bg-gradient-to-t from-red-500 via-orange-500 to-yellow-300 p-2 rounded-lg shadow-lg text-white font-bold cursor-pointer"
            onClick={() => toggleModal(true)}
          >
            Adopt {pet.name}
          </button>
          <p className="mb-3 pl-4 pr-4 text-lg ">{pet.description}</p>
        </div>
        {isOpen ? (
          <Modal>
            <h1 className="text-lg font-bold">
              Would you like to adopt {pet.name}?
            </h1>
            <div className="flex gap-2 justify-center items-center p-4">
              <button
                className="pl-4 pr-4 bg-blue-500 text-lg rounded-lg shadow-lg text-white font-bold cursor-pointer"
                onClick={() => {
                  setAdoptedPet(selectedImage);
                  navigate("/");
                }}
              >
                Yes
              </button>
              <button
                className="pl-4 pr-4 bg-red-500 text-lg rounded-lg shadow-lg text-white font-bold cursor-pointer"
                onClick={() => toggleModal(false)}
              >
                No
              </button>
            </div>
          </Modal>
        ) : null}
      </div>
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
