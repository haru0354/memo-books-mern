const Textarea = ({ label, name }) => {
  return (
    <>
      <label htmlFor={label}>{label}</label>
      <textarea name={name} />
    </>
  );
};

export default Textarea;
