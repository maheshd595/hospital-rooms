import * as React from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Data from "./Data";

export default function DataPageNavigation() {
  return (
    <Routes>
      <Route path="/" element={<Data />} />
      <Route path="data/uk" element={<Data />} />
      <Route path="aus" element={<Data />} />
      <Route path="swiss" element={<Data />} />
    </Routes>
  );
}
