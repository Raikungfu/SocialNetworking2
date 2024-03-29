import React, { useRef, useState } from "react";
import { NewPostFormProps } from "./types";
import Input from "../Input";
import Button from "../Button";
import Textarea from "../Textarea/Textarea";
import { H3 } from "../Text/H3";
import { API_FETCH_FILE } from "../../../service/UploadFileToFirebase/uploadFile";
import { FormDataPost } from "../../../type/API";
import FileListView from "../FileList";
import { createRoot } from "react-dom/client";

const NewPostForm: React.FC<NewPostFormProps> = (props) => {
  const [formData, setFormData] = useState<FormDataPost>({
    "input-file": null,
  });
  const API_FETCH_FORM = props.apiFetchForm;
  const [process, setProcess] = useState<number>(0);
  const [isPost, setIsPost] = useState<boolean>(false);
  const formPost = useRef<HTMLFormElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;
    setFormData({ ...formData, [name]: name === "input-file" ? files : value });
    if (files && name === "input-file") {
      const rootElement = document.getElementById("showListFilesPost");
      if (rootElement) {
        const root = createRoot(rootElement);
        root.render(
          <FileListView
            children={files}
            onListFilesChanged={(data: FileList) =>
              setFormData({ ...formData, ["input-file"]: data })
            }
            wrapVariant={"w-full h-40 flex overflow-x-auto gap-2"}
          />
        );
      }
    }
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
      setIsPost(true);
      const { ["input-file"]: inputFile, ...rest } = formData;
      if (inputFile) {
        const res = await API_FETCH_FILE(inputFile as FileList, setProcess);
        const response = await API_FETCH_FORM({
          ["formData"]: rest,
          ["input-file"]: res,
        });
        props.onSubmitSuccess(response);
      } else {
        const response = await API_FETCH_FORM({ ["formData"]: formData });
        props.onSubmitSuccess(response);
      }
      setIsPost(false);
      setFormData({ "input-file": null });
      formPost.current?.reset();
    } catch (error) {
      setIsPost(false);
      props.onSubmitFail(error as string);
    }
  };

  return (
    <form
      key={props.id}
      id={props.id}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
      ref={formPost}
    >
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
      <div id="showListFilesPost"></div>
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

export default NewPostForm;
