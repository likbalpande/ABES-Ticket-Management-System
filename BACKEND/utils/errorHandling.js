const handleGenericServerError = (res) => {
    res.status(500).json({
        status: "fail",
        message: "Internal Server error",
    });
};

export const handleError = (funcName, err, res) => {
    handleGenericServerError(res);
    const genericMessage = err?._message;
    const specificMessage = Object.values(err?.errors || {})
        .map(({ properties }) => properties?.message)
        .join("\n--> ");
    if (genericMessage || specificMessage) {
        console.log("----------------------------");
        console.log("Generic: ");
        console.log("-->", genericMessage);
        console.log("Specific:");
        console.log("-->", specificMessage);
        console.log("----------------------------");
    } else {
        console.log("- - - - - - - - - - - - -");
        console.log("❌", err);
        console.log("- - - - - - - - - - - - -");
    }
};
