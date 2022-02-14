
const errMsgContainer = {
  width: "100%",
  overflow: "hidden",
  height: "80vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const errMsg = {
  color: "#f23427",
  margin: "30px auto",
  maxWidth: "800px",
};

const ShowError = () => {
  return (
    <div style={errMsgContainer}>
      <div className="text-center">
        <h5 style={errMsg}>
          Oops! Unknown Error Occured, please try refreshing page after some
          time!
        </h5>
      </div>
    </div>
  );
};

export default ShowError;
