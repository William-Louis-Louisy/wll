import React from "react";

export default function LabCellWrapper({
  children,
  bgColor,
}: {
  children: React.ReactNode;
  bgColor?: string;
}) {
  return (
    <div
      className="flex items-center justify-center aspect-square"
      style={bgColor ? { backgroundColor: bgColor } : undefined}
    >
      {children}
    </div>
  );
}
