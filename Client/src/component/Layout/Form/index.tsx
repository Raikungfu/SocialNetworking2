import React, { useState } from "react";
import { FormProps } from "./types";
import Input from "../Input";
import { API_LOG_USER } from "../../../service/UserAuth/fetchUserAuth";

const Form: React.FC<FormProps> = (props) => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      props.onSubmitSuccess(await API_LOG_USER(formData));
    } catch (error) {
      props.onSubmitFail(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {props.input?.map((input, index) => (
        <Input key={index} onChange={handleInputChange} {...input} />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
