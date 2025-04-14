const ServerErrorMessage = ({ message }: { message?: string }) => {
    return <div className="error-message">{message || "An error occurred. Please try again later."}</div>;
};

export default ServerErrorMessage;
