const Filter = ({ handlerFilter, filter }) => {
  return (
    <div>
      <label htmlFor="filter">filter shown with:</label>
      <input type="text" onChange={handlerFilter} value={filter} />
    </div>
  );
};

export default Filter;
