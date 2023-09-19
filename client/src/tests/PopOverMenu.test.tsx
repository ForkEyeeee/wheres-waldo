import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PopOverMenu from "../components/PopOverMenu";

describe("PopOverMenu", () => {
  it("renders PopOverMenu Component", () => {
    render(<PopOverMenu />);
    expect(screen.getByRole("pop-menu")).toBeInTheDocument();
  });
});
