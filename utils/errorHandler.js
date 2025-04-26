const errorHandler = (err, res) => {
    console.error("Error:", err.message || "Internal Server Error"); // Log error
    /**
      if (err.name === "ValidationError") {
        return res.status(400).json({ message: err.message });
    } else if (err.name === "MongoError" && err.code === 11000) {
        return res.status(409).json({ message: "Duplicate key error" });
    } else if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid ID format" });
    } else {
        return res.status(500).json({ message: err.message || "Internal Server Error" });
    } **/
};
export default errorHandler;
// This function handles errors in a consistent manner across the application. It logs the error message and sends an appropriate response to the client. The commented-out section provides examples of how to handle specific error types, such as validation errors, duplicate key errors, and invalid ID formats. You can uncomment and modify these sections based on your application's requirements.