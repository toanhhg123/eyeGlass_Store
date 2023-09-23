import { Button } from "@mui/material";
import React, { useEffect, useRef } from "react";

const ButtonUpload = ({ onUploadSuccess }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dh9pmxjme",
        uploadPreset: "zysubchn",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          onUploadSuccess(result.info.secure_url);
        }
      },
    );
  }, [onUploadSuccess]);

  return (
    <Button onClick={() => widgetRef.current.open()} variant="contained">
      upload
    </Button>
  );
};

export default ButtonUpload;
