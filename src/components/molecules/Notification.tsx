import React from "react";

type NotificationProps = {
  message: string;
  type: "success" | "error";
  onClose: () => void;
};

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => (
    <div
        className={`gap-2 px-4 py-2 w-full rounded shadow-lg text-white flex justify-between ${
            type === "success" ? "bg-green-600" : "bg-red-600"
        }`}
        role="alert"
    >
      <span>{message}</span>
      <button className="left-0 text-white font-bold" onClick={onClose} aria-label="Cerrar">
        ×
      </button>
    </div>
);

export default Notification;