const FormSelectOption = (props) => {
  const {
    id = '',
    value = '',
    label = '',
    name = '',
    extraClass = '',
    extraSelectClass = '',
    children = '',

    required = false,
    disabled = false,
    readOnly = false,

    actions = {
      onChange: () => {},
    },

    other,
  } = props;

  const myId = id || 'select-option-' + name;

  return (
    <div className={'form-group mb-6 ' + extraClass}>
      {label ? (
        <label htmlFor={myId} className="form-label">
          {label}
          <span className="text-base text-red-500">{required ? '*' : ''}</span>
        </label>
      ) : null}

      <select
        id={myId}
        value={value}
        name={name}
        onChange={actions.onChange}
        className={'select select-bordered w-full ' + extraSelectClass}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        {...other}
      >
        {children}
      </select>
    </div>
  );
};

export default FormSelectOption;
