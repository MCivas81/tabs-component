import React from "react";
import { BadgeProps } from "./Tabs.types";
import "./Tabs.scss";

const Badge: React.FC<BadgeProps> = ({ label, variant = "neutral" }) => {
  return <span className={`badge badge--${variant}`}>{label}</span>;
};

export default Badge;