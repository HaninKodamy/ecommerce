import React from "react";
import "./index.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function OrderDone({ orderDoneClose }) {

  return (
    <div className="order-modal">
        <FontAwesomeIcon
            icon={faTimes}
            onClick={orderDoneClose}
            className="close-icon1"
        />
        Order Successfully done
    </div>
  );
}

export default OrderDone;
