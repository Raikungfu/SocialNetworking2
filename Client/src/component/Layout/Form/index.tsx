import React, { useState } from "react";
import { FormProps } from "./types";
import Input from "../Input";
import Button from "../Button";

const Form: React.FC<FormProps> = (props) => {
  const [formData, setFormData] = useState({});
  const API_FETCH_FORM = props.apiFetchForm;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.type === "checkbox" || event.target.type === "radio") {
      setFormData({ ...formData, [event.target.name]: event.target.id });
    } else {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await API_FETCH_FORM(formData);
      props.onSubmitSuccess(response);
    } catch (error) {
      props.onSubmitFail(error as string);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {props.input?.map((input, index) => (
        <Input
          key={index}
          inputVariant={input.inputVariant ?? props.inputVariant}
          wrapInputVariant={input.wrapInputVariant ?? props.wrapInputVariant}
          labelVariant={input.labelVariant ?? props.labelVariant}
          onChange={handleInputChange}
          groupInput={input.groupInput}
          value={input.value}
          {...input}
        />
      ))}
      <div className="flex justify-end gap-3">
        <Button
          variant="summit-button"
          type="submit"
          className="px-5 py-2 "
          id={"summit-btn"}
        >
          Submit
        </Button>
        <Button
          variant="summit-button"
          type="reset"
          className="px-5 py-2 bg-red-100 border-red-300 text-red-900 shadow-lg shadow-red-400 hover:border-red-500"
          id={"reset-btn"}
        >
          Reset
        </Button>
      </div>
    </form>
  );
};

export default Form;
