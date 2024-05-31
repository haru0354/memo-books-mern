import TextareaAutosize from "react-textarea-autosize";

const Textarea = ({ label, name, placeholder = "テキストを入力してください" }) => {
  return (
    <>
      <label htmlFor={label}>{label}</label>
      <TextareaAutosize name={name} placeholder={placeholder} minRows={6} />
    </>
  );
};

export default Textarea;
