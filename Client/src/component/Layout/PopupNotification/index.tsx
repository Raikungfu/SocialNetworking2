interface PopupProps {
  wrapPopupVariant?: string;
  role?: string;
  information: string;
  message: string;
}

const Popup: React.FC<PopupProps> = (props) => {
  return (
    <>
      <div
        className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
        role="alert"
      >
        <p className="font-bold">{props.information}</p>
        <p className="text-sm">{props.message}</p>
      </div>
    </>
  );
};

export default Popup;
