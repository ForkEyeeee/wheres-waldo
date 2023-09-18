import { render, screen } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import PopOverMenu from "../src/components/PopOverMenu";

describe("Image", () => {
  it("renders Image Component", () => {
    render(<PopOverMenu />);
    expect(screen.getByRole("pop-menu")).toBeInTheDocument();
  });
});
