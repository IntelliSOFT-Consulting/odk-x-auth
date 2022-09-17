import { Modal, TextInput } from "carbon-components-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const SystemAlert = ({ options }) => {
  const navigate = useNavigate();
  console.log(options);
  return (
    <Modal
      open
      alert={true}
      danger={options.danger}
      modalHeading={options.modalHeading}
      modalLabel={options.modalLabel || ""}
      primaryButtonText={options.primaryButtonText}
      secondaryButtonText={options.secondaryButtonText}
      onRequestClose={options.onRequestClose}
      onRequestSubmit={options.onRequestSubmit}

    >
      <p style={{ marginBottom: "1rem" }}>{options.content}</p>
    </Modal>
  );
};

export default SystemAlert;
