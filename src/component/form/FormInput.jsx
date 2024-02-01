const FormInput = (props) => {
  const {
    id = '',
    value = '',
    extraClass = '',
    label = '',
    name = '',
    extraInputClass = '',
    type = 'text',
    placeholder = 'Type here',
    autoComplete = 'off',

    required = false,
    disabled = false,
    readOnly = false,

    actions = {
      onChange: () => {},
    },
    other,
  } = props;

  const idInput = id || 'text-input-' + name;

  return (
    <div className={'form-group mb-6 ' + extraClass}>
      {label ? (
        <label htmlFor={idInput} className="form-label">
          {label}
          <span className="text-base text-red-500">{required ? '*' : ''}</span>
        </label>
      ) : null}

      <input
        id={idInput}
        type={type}
        value={value}
        name={name}
        onChange={actions.onChange}
        className={'input input-bordered w-full ' + extraInputClass}
        disabled={disabled}
        autoComplete={autoComplete}
        placeholder={placeholder}
        readOnly={readOnly}
        required={required}
        {...other}
      />
    </div>
  );
};

export default FormInput;
