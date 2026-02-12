export default function Preloader(props) {
  return (
    <div className="preloader" style={{opacity:props.opacity?props.opacity:1}}>
      <div className="loading-container">
        <div className="loading"></div>
        <div id="loading-icon">
          <img src="/images/logo.png" alt="Loading" />
        </div>
      </div>
    </div>
  );
}
