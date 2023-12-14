import React, { useEffect, useState } from "react";

const PersonalInfo = ({ formik, setCurrStep }) => {
  const [stepOne, setStepOne] = useState(false);

  useEffect(() => {
    formik.values.name &&
    !formik.errors.name &&
    !formik.errors.email &&
    !formik.errors.phone &&
    !formik.errors.birthDate
      ? setStepOne(true)
      : setStepOne(false);
  });

  return (
    <>
      <label htmlFor="name">
        Name
        <input
          type="text"
          name="name"
          id="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </label>

      {formik.errors.name && formik.touched.name && (
        <span className="error"> {formik.errors.name} </span>
      )}

      <label htmlFor="email">
        Email
        <input
          type="text"
          name="email"
          id="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </label>
      {formik.errors.email && formik.touched.email && (
        <span className="error"> {formik.errors.email} </span>
      )}

      <label htmlFor="phone">
        Phone
        <input
          type="number"
          name="phone"
          id="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </label>

      {formik.errors.phone && formik.touched.phone && (
        <span className="error"> {formik.errors.phone} </span>
      )}

      <label htmlFor="birthDate">
        Birthdate
        <input
          type="date"
          name="birthDate"
          id="birthDate"
          className="form-input"
          value={formik.values.birthDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </label>

      {formik.errors.birthDate && formik.touched.birthDate && (
        <span className="error"> {formik.errors.birthDate} </span>
      )}

      <button
        type="button"
        disabled={!stepOne}
        onClick={() => {
          setCurrStep(1);
        }}
      >
        Next Page
      </button>
    </>
  );
};

export default PersonalInfo;
