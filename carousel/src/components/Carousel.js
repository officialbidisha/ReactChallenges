import "./Carousel.css";
import { useEffect, useRef, useState } from "react";
const Carousel = ({ cardDetails }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);
  const previousHandler = (e) => {
    if (activeIndex === 0) {
      setActiveIndex(cardDetails.length - 1);
      return;
    }
    setActiveIndex((prev) => prev - 1);
  };
  const nextHandler = (e) => {
    if (activeIndex === cardDetails.length - 1) {
      setActiveIndex(0);
      return;
    }
    setActiveIndex((prev) => prev + 1);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
        console.log(activeIndex);
      nextHandler();
    }, 3000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [activeIndex]);

  return (
    <div className="container">
      {cardDetails.map((card) => {
        return (
          activeIndex === card.id && (
            <div
              key={card.id}
              className={`inner ${
                activeIndex === card.id ? "visible" : "hidden"
              }`}
            >
              <img
                src={card.avatar}
                alt="trigger_image"
                className="image"
              ></img>
            </div>
          )
        );
      })}
      <div className="button_container">
        <button className="prev" onClick={previousHandler}>
          Prev
        </button>
        <button className="next" onClick={nextHandler}>
          Next
        </button>
      </div>
    </div>
  );
};
export default Carousel;
