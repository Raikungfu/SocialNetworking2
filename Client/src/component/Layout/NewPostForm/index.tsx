import React, { useState } from "react";
import { NewPostFormProps } from "./types";
import Input from "../Input";
import Button from "../Button";
import Textarea from "../Textarea/Textarea";
import { H3 } from "../Text/H3";

const NewPostForm: React.FC<NewPostFormProps> = (props) => {
  const [formData, setFormData] = useState({});
  const API_FETCH_FORM = props.apiFetchForm;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
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
      <H3 variant={props.titleVariant} content={props.title || ""} />
      {props.textarea ? (
        <>
          <Textarea {...props.textarea} onChange={handleTextareaChange} />
        </>
      ) : null}
      {props.input ? (
        <div className={props.wrapInputVariant}>
          {props.input?.map((input, index) => (
            <Input
              key={index}
              inputVariant={input.inputVariant ?? props.inputVariant}
              wrapInputVariant={
                input.wrapInputVariant ?? props.wrapInputVariant
              }
              labelVariant={input.labelVariant ?? props.labelVariant}
              onChange={handleInputChange}
              groupInput={input.groupInput}
              {...input}
            />
          ))}
        </div>
      ) : (
        <></>
      )}

      <div className="flex justify-end gap-3">
        <Button
          type="submit"
          className={"px-5 py-2 " + props.buttonVariant}
          id={"summit-btn"}
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default NewPostForm;
