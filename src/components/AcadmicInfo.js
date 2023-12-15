import React, { useEffect, useState } from "react";

const AcadmicInfo = ({ formik, setCurrStep }) => {
  const [uploadDoc, setUploadDoc] = useState("");
  const [uploadImg, setUploadImg] = useState("");

  const addDocument = (event) => {
    const docFile = event.target.files[0];
    if (docFile) {
      const docType = [
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ];
      if (docType.includes(docFile.type)) {
        formik.setFieldValue("document", docFile);
        uploadDoc && setUploadDoc(uploadDoc);
      }
    }
  };

  const addImages = (event) => {
    const img = event.target.files;

    if (Object.keys(img).length <= 5) {
      setUploadImg(Object.values(img).map((item) => item));
    } else {
      alert("Only 5 images are allowed");
      event.target.value = null;
    }
  };

  const addMoreImg = (event) => {
    const img = event.target.files[0];
    setUploadImg([...uploadImg, img]);
  };

  const deleteDocument = () => {
    formik.setFieldValue("document", "");
    setUploadDoc(null);
  };

  const deleteImg = () => {
    formik.setFieldValue("images", "");
    setUploadImg(null);
  };

  const removeImgByClick = (items) => {
    if (uploadImg.length === 1) {
      deleteImg();
    } else {
      setUploadImg(uploadImg.filter((item) => item !== items));
    }
  };

  useEffect(() => {
    formik.values.images && setUploadImg(formik.values.images);
    formik.values.document && setUploadDoc(formik.values.document.name);
  }, [formik.values.images, formik.values.document]);

  useEffect(() => {
    formik.setFieldValue("images", uploadImg);
  }, [uploadImg]);

  return (
    <>
      <div className="form-document">
        {uploadDoc ? (
          <div className="uploaded-document">
            File: {uploadDoc}
            <button onClick={deleteDocument}>
              <img src="icons/close.svg" alt="close-icon" />
            </button>
          </div>
        ) : (
          <div className="upload-document">
            Please attach your document here...
            <input
              name="document"
              type="file"
              accept=".doc,.docx,.txt"
              onChange={addDocument}
              onBlur={formik.onBlur}
            />
          </div>
        )}
        {formik.errors.document && formik.touched.document && (
          <span className="error"> {formik.errors.document} </span>
        )}
      </div>

      <div className="form-images-box">
        {uploadImg ? (
          <div className="img-container">
            {uploadImg.map((items, index) => {
              return (
                <div key={index} className="img-wrapper">
                  <img alt="uploaded_image" src={URL.createObjectURL(items)} />
                  <button
                    type="button"
                    id="delete_image"
                    onClick={() => removeImgByClick(items)}
                  >
                    <img src="icons/close.svg" alt="close-icon" />
                  </button>
                </div>
              );
            })}

            <div className="btns">
              {uploadImg.length < 5 && (
                <input
                  type="file"
                  onChange={addMoreImg}
                  accept=".jpeg, .jpg, .png,.webp"
                />
              )}

              {uploadImg.length > 2 && (
                <button type="button" onClick={deleteImg}>
                  Clear all
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="upload-doc">
            Upload your images here...
            <input
              className="upload-input"
              name="images"
              type="file"
              accept=".jpeg, .jpg, .png,.webp"
              onChange={addImages}
              onBlur={formik.onBlur}
              multiple
            />
          </div>
        )}

        {formik.errors.images && formik.touched.images && (
          <span className="error"> {formik.errors.images} </span>
        )}
      </div>

      <div className="toggle-btns">
        <button type="button" onClick={() => setCurrStep(0)}>
          Back
        </button>
        <button
          type="button"
          disabled={
            formik.values.document && formik.values.images ? false : true
          }
          onClick={() => {
            if (formik.values.document && formik.values.images) setCurrStep(2);
          }}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default AcadmicInfo;
