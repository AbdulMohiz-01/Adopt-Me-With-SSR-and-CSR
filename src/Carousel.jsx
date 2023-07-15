import React, { useState } from "react";

const Carousel = ({ images, selectedImage }) => {
  const [active, setActive] = useState(0);
  selectedImage(images[active]);
  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center pt">
      <img
        src={images[active]}
        alt="animal"
        className="w-1/5 h-1/5 items-center justify-center shadow-lg pt-4 "
      />
      <div className="flex flex-row gap-4 w-24 h-24 p-0 m-0 justify-center items-center">
        {images.map((photo, index) => (
          // eslint-disable-next-line
          <img
            key={photo}
            src={photo}
            className={
              index === active
                ? "opacity-70 rounded-full"
                : "rounded-full hover:opacity-70"
            }
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
