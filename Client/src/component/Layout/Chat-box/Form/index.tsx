import React, { useRef, useState } from "react";
import { FormProps } from "./types";
import { API_FETCH_FILE } from "../../../../service/UploadFileToFirebase/uploadFile";
import { FormData } from "../../../../type/API";
import Input from "../../Input";
import Button from "../../Button";
const Form: React.FC<FormProps> = (props) => {
  const [formData, setFormData] = useState<FormData>({ "input-file": null });
  const [process, setProcess] = useState<number>(0);
  const [isPost, setIsPost] = useState<boolean>(false);
  const formChat = useRef<HTMLFormElement>(null);

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
      setIsPost(true);
      const { ["input-file"]: inputFile, ...rest } = formData;
      if (inputFile) {
        const res = await API_FETCH_FILE(inputFile as FileList, setProcess);
        props.onSubmitSuccess({
          ["formData"]: rest,
          ["input-file"]: res,
        });
      } else {
        props.onSubmitSuccess(formData);
      }
      setIsPost(false);
      setFormData({ "input-file": null });
      formChat.current?.reset();
    } catch (error) {
      setIsPost(false);
      props.onSubmitFail(error as string);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${props.formVariant || "flex flex-col gap-4"}`}
      key={props.id}
      id={props.id}
      ref={formChat}
    >
      {props.input?.map((input, index) => (
        <Input
          key={index}
          inputVariant={input.inputVariant ?? props.inputVariant}
          wrapInputVariant={input.wrapInputVariant ?? props.wrapInputVariant}
          labelVariant={input.labelVariant ?? props.labelVariant}
          onChange={handleInputChange}
          groupInput={input.groupInput}
          value={input.value}
          children={input.children}
          {...input}
        />
      ))}
      <div className="flex justify-end gap-3">
        <Button
          type="submit"
          className={"px-5 py-2 " + props.buttonVariant}
          id={"summit-btn"}
          label={`${isPost ? "Uploading.... " + process + "%" : "Submit"}`}
        />
      </div>
    </form>
  );
};

export default Form;
