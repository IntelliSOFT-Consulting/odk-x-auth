import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import NewUserForm from "../components/NewUserForm";

const NewUser = () => {
  let [registration, setRegistration] = useState({});
  let navigate = useNavigate();
  let [open, setOpen] = useState(false);
  let [message, setMessage] = useState(false);
  const handleFileUploadError = (error) => {
    // Do something...
    console.log(error);
  };

  const handleFilesChange = (files) => {
    // Do something...
    console.log(files[0]);
    setRegistration({ ...registration, passport_photo: files[0] });
  };
  let register = async () => {
    let requiredFields = [
      "first_name",
      "phone",
      "email",
      "password",
      "dob",
      "surname",
      "passport_photo",
      "id_number",
    ];
    for (let i; i < requiredFields.length; i++) {
      if (!(requiredFields[i] in Object.keys(registration))) {
        console.log(`${requiredFields[i]} is missing`);
        setMessage(`${requiredFields[i]} is required`);
        setOpen(!open);
        return;
      }
    }
    let data = await (
      await fetch(`/api/method/fosa.api.auth.create_user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registration),
      })
    ).json();
    if (data.status === "error") {
      setMessage(data.error);
      setOpen(!open);
      return;
    }
    navigate("/login");
    console.log(data);
    return;
  };
  return (
    <AppHeader children={<NewUserForm />} pageHeading="New User Account" />
  );
};

export default NewUser;
