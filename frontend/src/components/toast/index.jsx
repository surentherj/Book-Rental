import React from "react";
import { useSelector, useDispatch } from "react-redux";

import "./toast.scss";

import { deleteAlert } from "../../redux/actions/toast";

import CloseIconSmall from "../icons/close-s";

const Toast = () => {
  const dispatch = useDispatch();
  const { alerts } = useSelector((state) => ({
    alerts: state?.toast?.alerts,
  }));

  return (
    // <Track>
    <div className="alert-wrapper">
      {alerts?.map(
        (alert) =>
          alert.msg && (
            <div key={alert.id} className={`alert alert-${alert.alertType}`}>
              <span
                className="mb-0 font-s"
                dangerouslySetInnerHTML={{
                  __html: alert.msg,
                }}
              ></span>
              <div
                className="close-alert icon-wrap icon-xs"
                onClick={() => {
                  dispatch(deleteAlert(alert.id));
                }}
              >
                <CloseIconSmall fill={"white"} />
              </div>
            </div>
          )
      )}
    </div>
    // </Track>
  );
};

export default Toast;
