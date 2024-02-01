export const eventChange = (event = () => {}) => {
  const target = event.target;
  let isChecked = null;
  const value = target?.type === 'number' ? Number(target.value) : target.value;
  const name = target.name;

  if (target?.type === 'checkbox') {
    isChecked = target.checked ? 1 : 0;
  }

  return { name, value, isChecked };
};
