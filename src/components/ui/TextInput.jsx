const TextInput = ({ label, placeholder, name }) => {
    return (
      <>
        <label htmlFor={label}>{label}</label>
        <input type="text" name={name} placeholder={placeholder} />
      </>
    );
  };
  
  export default TextInput;