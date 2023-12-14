import React from "react";

const Review = ({ formik }) => {
  const { values } = formik;

  const renderImages = () => {
    if (values.images && values.images.length > 0) {
      return (
        <div className="images">
          <p>Images:</p>
          {values.images.map((image, index) => (
            <img
              key={index}
              src={URL.createObjectURL(image)}
              alt={`review ${index + 1}`}
              className="review-img"
            />
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="review-form-data">
      <p>Name: {values.name}</p>
      <p>Email: {values.email}</p>
      <p>Phone: {values.phone}</p>
      <p>DOB: {values.birthDate}</p>
      <p>Document: {values.document.name}</p>
      {renderImages()}
    </div>
  );
};

export default Review;
