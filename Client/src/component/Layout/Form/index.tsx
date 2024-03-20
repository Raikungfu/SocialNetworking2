import React, { useState } from "react";
import { FormProps } from "./types";
import Input from "../Input";
import GroupButton from "../GroupElement/GroupButton";

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
    <form
      onSubmit={handleSubmit}
      className={`${props.formClassName || "flex flex-col gap-4"}`}
    >
      {props.input?.map((input, index) => (
        <Input
          key={index}
          inputVariant={input.inputVariant ?? props.inputVariant}
          wrapInputVariant={input.wrapInputVariant ?? props.wrapInputVariant}
          labelVariant={input.labelVariant ?? props.labelVariant}
          onChange={(event) => {
            handleInputChange(event);
            input.keyDown && input.keyDown();
          }}
          groupInput={input.groupInput}
          value={input.value}
          {...input}
        />
      ))}
      {props.groupBtn && (
        <GroupButton
          id={props.groupBtn.id}
          buttons={props.groupBtn.buttons}
          variant={`${props.groupBtn.variant || "flex justify-end gap-3"}`}
        />
      )}
    </form>
  );
};

export default Form;
