import React from "react";

const AlertWarningDelete = ({text}) => {
    return (
        swal({
            title: "Êtes-vous sûr?",
            text: text,
            icon: "warning",
            dangerMode: true,
            buttons: {
                cancel: {
                    text: "Retour",
                    value: false,
                    visible: true,
                    className: "",
                    closeModal: true,
                },
                confirm: {
                    text: "Supprimer",
                    value: true,
                    visible: true,
                    className: "",
                    closeModal: true
                },
            }
        })
    );
};

export default AlertWarningDelete;
