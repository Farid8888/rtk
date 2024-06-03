
const LoadingSpinner = (props:{st?:Record<string,string>}) => {
  const {st} = props
  return (
    <div className="spinner-border text-primary" role="status" style={{...st}}>
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
