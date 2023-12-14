import React, { useState } from "react";
import "./utils/App.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import PersonalInfo from "./components/PersonalInfo";
import AcadmicInfo from "./components/AcadmicInfo";
import Review from "./components/Review";
import Stepper from "./components/Stepper";
import image from "./assets/images/image1.jpg";

const App = () => {
  const [currStep, setCurrStep] = useState(0);

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    document: "",
    images: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Enter your full name first.")
      .min(5, "name must be 5 characters long"),
    email: Yup.string().email().required("Enter your email first."),
    phone: Yup.string().required("Enter your phone first."),
    birthDate: Yup.date().required("Enter your birthDate first"),
    document: Yup.mixed().required("please select document file"),
    images: Yup.mixed().required("please select image file"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
      setCurrStep(0);
    },
  });

  const formField = () => {
    switch (currStep) {
      case 0:
        return <PersonalInfo formik={formik} setCurrStep={setCurrStep} />;
      case 1:
        return <AcadmicInfo formik={formik} setCurrStep={setCurrStep} />;
      case 2:
        return <Review formik={formik} setCurrStep={setCurrStep} />;
      default:
        return;
    }
  };

  const handleMove = (event) => {
    switch (event) {
      case "personalInfo":
        formik.values.name &&
          !formik.errors.name &&
          !formik.errors.email &&
          !formik.errors.phone &&
          !formik.errors.birthDate &&
          setCurrStep(1);
        break;
      case "academicInfo":
        formik.values.document &&
          !formik.errors.document &&
          !formik.errors.images &&
          currStep === 1 &&
          setCurrStep(2);
    }
  };

  return (
    <div className="app">
      <img src={image} alt="main" />

      <main>
        <Stepper
          currStep={currStep}
          setCurrStep={setCurrStep}
          handleMove={handleMove}
        />

        <form onSubmit={formik.handleSubmit}>
          {formField()}
          {currStep === 2 && <input type="submit" value="submit" />}
        </form>
      </main>
    </div>
  );
};

export default App;
