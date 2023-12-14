import React from "react";

const Stepper = ({ currStep, setCurrStep, handleMove }) => {
  return (
    <div className="stepper">
      <button
        onClick={() => currStep > 0 && setCurrStep(0)}
        className={currStep >= 0 ? "filled" : null}
      >
        <img src="/icons/person.svg" alt="personal-details" />
      </button>

      <span className={`row ${currStep > 0 ? "row-bg" : null}`}></span>

      <button
        onClick={() => handleMove("personalInfo")}
        className={currStep >= 1 ? "filled" : null}
      >
        <img src="/icons/assignment.svg" alt="acadmic-information" />
      </button>

      <span className={`row ${currStep > 1 ? "row-bg" : null}`}></span>

      <button
        onClick={() => handleMove("academicInfo")}
        className={currStep >= 2 ? "filled" : null}
      >
        <img src="/icons/review.svg" alt="review" />
      </button>
    </div>
  );
};

export default Stepper;
