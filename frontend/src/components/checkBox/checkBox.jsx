
const CheckBox = (props) => {
  const { label, id, name, isChecked = false, category, onClick } = props;
  return (
    <div className='form-checkbox'>
      <input
        className='check_box check_regular check_default'
        type='checkbox'
        id={id}
        name={name}
        value={name}
        checked={isChecked}
        onChange={() => onClick(category, id, !isChecked)}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
export default CheckBox;
