const InputField = ({ text, value, eventHandler }) => {
  console.log("Entered InputField component:", text, "with value", value);

  return (
    <div>
      {text}: <input value={value} onChange={eventHandler} />
    </div>
  );
};

const Form = ({ submitText, submitCallback, inputFields }) => {
  console.log("Entered Form component with:", submitText, "and", inputFields);
  return (
    <form onSubmit={submitCallback}>
      {/* Rendering all the input fields here */}
      {inputFields.map((inputField) => (
        <InputField
          key={inputField.id}
          text={inputField.name}
          value={inputField.value}
          eventHandler={inputField.eventHandler}
        />
      ))}

      <div>
        <button type="submit">{submitText}</button>
      </div>
    </form>
  );
};

export default Form;
