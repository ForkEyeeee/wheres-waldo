import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PopOverMenu from "../components/PopOverMenu";

describe("PopOverMenu", () => {
  it("renders PopOverMenu Component", () => {
    const allCharacters = ["Waldo", "Sonic The Hedgehog", "Death"];
    render(<PopOverMenu allCharacters={allCharacters} />);
    expect(screen.getByRole("pop-menu")).toBeInTheDocument();
  });
});
