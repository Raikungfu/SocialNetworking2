import React, { useRef, useState } from "react";
import { FormProps } from "./types";
import { API_FETCH_FILE } from "../../../../service/UploadFileToFirebase/uploadFile";
import { FormDataChat } from "../../../../type/API";
import Input from "../../Input";
import Button from "../../Button";
import FileListView from "../../FileList";
import { createRoot } from "react-dom/client";
import { v4 as uuidv4 } from "uuid";

const Form: React.FC<FormProps> = (props) => {
  const [formData, setFormData] = useState<Array<FormDataChat>>([]);
  const [process, setProcess] = useState<number>(0);
  const [isPost, setIsPost] = useState<boolean>(false);
  const formChat = useRef<HTMLFormElement>(null);
  props.onReset && props.onReset(formChat);
  const idShowListFile = uuidv4();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;
    setFormData({
      ...formData,
      [name]: name.endsWith("file-input") ? files : value,
    });
    const rootElement = document.getElementById(
      `listFileInputChatChange-${idShowListFile}`
    );
    if (files && rootElement && name.endsWith("file-input")) {
      const root = createRoot(rootElement);
      root.render(
        <FileListView
          children={files}
          onListFilesChanged={(data: FileList) =>
            setFormData({ ...formData, [name]: data })
          }
          wrapVariant={"w-full h-40 flex overflow-x-auto gap-2"}
        />
      );
    }
    props.onInputChange && props.onInputChange();
    props.onChange && props.onChange(event);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      let inputFile;
      let content;
      setIsPost(true);
      for (const [key, value] of Object.entries(formData)) {
        if (key.endsWith("file-input")) inputFile = value;
        else content = value as string;
      }
      if (inputFile) {
        const res = await API_FETCH_FILE(inputFile as FileList, setProcess);
        props.onSubmitSuccess({
          content: content,
          "chat-attach-file-input": res,
        });
      } else {
        props.onSubmitSuccess({ content });
      }
      setIsPost(false);
      setFormData([]);
      formChat.current?.reset();
    } catch (error) {
      setIsPost(false);
      props.onSubmitFail(error as string);
    }
  };

  return (
    <div className={` flex flex-col w-full`}>
      <div id={`listFileInputChatChange-${idShowListFile}`}></div>
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
            name={input.name}
            {...input}
          />
        ))}

        <div className="flex justify-end gap-3">
          <Button
            type="submit"
            className={"px-5 py-2 " + props.buttonVariant}
            id={"summit-btn"}
            label={`${
              isPost
                ? "Uploading.... " + process + "%"
                : props.buttonLabel || "Submit"
            }`}
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
