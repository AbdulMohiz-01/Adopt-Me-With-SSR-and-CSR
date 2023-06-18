import React, { useState } from "react";

const Carousel = ({ images, selectedImage }) => {
  const [active, setActive] = useState(0);
  selectedImage(images[active]);
  return (
    <div className="carousel">
      <img src={images[active]} alt="animal" />
      <div className="carousel-smaller">
        {images.map((photo, index) => (
          // eslint-disable-next-line
          <img
            key={photo}
            src={photo}
            className={index === active ? "active" : ""}
            alt="animal thumbnail"
            onClick={() => {
              setActive(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

Carousel.defaultProps = {
  images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
};

export default Carousel;
