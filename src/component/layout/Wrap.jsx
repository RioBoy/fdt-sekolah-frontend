const Wrap = ({ children }) => {
  return (
    <div className="container">
      <div className="page-container">
        <div className="page-container-wp">
          <div className="content">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Wrap;
