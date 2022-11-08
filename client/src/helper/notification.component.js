import React, { useEffect, useState } from "react";
export const AlertNotification = ({
    title = "",
    message = "",
    time = 0,
    onReset,
    type = "",
}) => {
    const [disappearMessage, setDisappearMessage] = useState(time);
    setTimeout(() => {
        setDisappearMessage(0);
        onReset(0);
    }, time);
    useEffect(() => {
        console.log(disappearMessage, message);
    }, [disappearMessage]);
    return (
        <>
            {disappearMessage && (
                <p style={type === "alert" ? { color: "red" } : {}}>
                    {title} {message}
                </p>
            )}
        </>
    );
};
