import React, { useState, useEffect } from "react";
import { truncateText } from "./truncateText";
import Products from "./Products";
import "../style.css";

export default function Solution() {
  return (
    <div>
      <Products />
    </div>
  );
}
