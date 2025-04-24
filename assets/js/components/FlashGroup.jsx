import React, { useState, useEffect } from "react";
import Flash from "./Flash";

export default function FlashGroup({ flash }) {
  const [flashes, setFlashes] = useState({});

  // Process flash messages from props
  useEffect(() => {
    if (flash) {
      const newFlashes = { ...flashes };

      // Process info flashes
      if (flash.info) {
        newFlashes.info = {
          title: "Success!",
          message: flash.info,
          show: true,
        };
      }

      // Process error flashes
      if (flash.error) {
        newFlashes.error = {
          title: "Error!",
          message: flash.error,
          show: true,
        };
      }

      // Process warning flashes
      if (flash.warning) {
        newFlashes.warning = {
          title: "Warning",
          message: flash.warning,
          show: true,
        };
      }

      setFlashes(newFlashes);
    }
  }, [flash]);

  const handleCloseFlash = (type) => {
    setFlashes((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        show: false,
      },
    }));
  };

  return (
    <div id="flash-group">
      {/* Info Flash */}
      {flashes.info && (
        <Flash
          type="info"
          title={flashes.info.title}
          message={flashes.info.message}
          show={flashes.info.show}
          onClose={() => handleCloseFlash("info")}
          id="flash-info"
        />
      )}

      {/* Error Flash */}
      {flashes.error && (
        <Flash
          type="error"
          title={flashes.error.title}
          message={flashes.error.message}
          show={flashes.error.show}
          onClose={() => handleCloseFlash("error")}
          id="flash-error"
        />
      )}

      {/* Warning Flash */}
      {flashes.warning && (
        <Flash
          type="warning"
          title={flashes.warning.title}
          message={flashes.warning.message}
          show={flashes.warning.show}
          onClose={() => handleCloseFlash("warning")}
          id="flash-warning"
        />
      )}
    </div>
  );
}
