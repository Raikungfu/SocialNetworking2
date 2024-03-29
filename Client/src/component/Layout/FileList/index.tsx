import DescriptionIcon from "@mui/icons-material/Description";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";

interface FileListProps {
  children?: FileList;
  onListFilesChanged?: (fileList: FileList) => void;
  wrapVariant: string;
}

const FileListView: React.FC<FileListProps> = (props) => {
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (props.children) {
      setFiles([...props.children]);
    }
  }, [props.children]);

  const renderFile = (file: File) => {
    if (file.type.startsWith("image")) {
      return (
        <img className="h-full" src={URL.createObjectURL(file)} alt="image" />
      );
    } else if (file.type.startsWith("video")) {
      return (
        <video className="h-full" src={URL.createObjectURL(file)} controls />
      );
    } else {
      return <DescriptionIcon className="h-full" />;
    }
  };

  const removeFile = (index: number) => {
    try {
      const newFiles = [...files];
      newFiles.splice(index, 1);
      setFiles(newFiles);
      if (props.onListFilesChanged) {
        props.onListFilesChanged(newFiles as unknown as FileList);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    files.length > 0 && (
      <div className={props.wrapVariant}>
        {files.map((file, index) => (
          <div key={index} className="shrink-0 relative">
            <CloseIcon
              className="absolute top-1 right-1 p-1 bg-red-500 rounded-full cursor-pointer"
              onClick={() => removeFile(index)}
            />
            {renderFile(file)}
          </div>
        ))}
      </div>
    )
  );
};

export default FileListView;
