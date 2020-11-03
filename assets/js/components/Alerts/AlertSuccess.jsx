import React from "react";
import swal from "@sweetalert/with-react";

const AlerSuccess = ({text}) => {
    return (
        swal(text, `Bravo !`, "success")
    );
};

export default AlerSuccess;
