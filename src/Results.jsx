import Pet from "./Pet.jsx";

const Results = ({ pets }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 p-4">
      {!pets.length ? (
        <h1 className="p-4 w-full border-2 border-red-500 rounded-lg bg-red-200 bg-opacity-75 text-2xl text-red-500 text-bold">
          No Pets Found
        </h1>
      ) : (
        pets.map((pet) => {
          return (
            <Pet
              animal={pet.animal}
              key={pet.id}
              name={pet.name}
              breed={pet.breed}
              images={pet.images}
              location={`${pet.city}, ${pet.state}`}
              id={pet.id}
            />
          );
        })
      )}
    </div>
  );
};

export default Results;
