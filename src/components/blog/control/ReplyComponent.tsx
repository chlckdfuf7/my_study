import React from "react";
import { Reply } from "../../../context/BlogTypes";

export interface Props {
    reply: Reply;
}

const ReplyComponent: React.FC<Props> = (props) => {
    const { reply } = props;

    return (
        <div style={{border: "0.5px solid lightgrey", margin: "5px"}}>
            <div style={{borderBottom: "0.3px solid lightgreen"}}>{reply.author}</div>
            <div>{reply.content}</div>
        </div>
    );
};

export default ReplyComponent;