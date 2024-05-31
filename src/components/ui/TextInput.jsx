const TextInput = ({ label, placeholder, name }) => {
    return (
      <>
        <label className="label-title" htmlFor={label}>{label}</label>
        <input type="text" name={name} placeholder={placeholder} />
      </>
    );
  };
  
  export default TextInput;