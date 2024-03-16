const errorHandler = async (req, res, err) => {
    // switch (err.name) {
    //     case "Not Found":
    //         res.status(404).json({name: err.name, message: err.message})
    //         break;

    //     default:
    //         res.status(500).json({message: "Internal Server Error"})
    //         break;
    // }

    if (err.name === "Not Found") {
        res.status(404).json({name: err.name, message: err.message})
    }
    else {
        res.status(500).json({message: "Internal Server Error"})

    }
};

export default errorHandler;

