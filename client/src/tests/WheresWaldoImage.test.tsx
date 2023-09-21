import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { vi } from "vitest";

import WheresWaldoImage from "../components/WheresWaldoBackground";

describe("WheresWaldoImage", () => {
  it("renders WheresWaldoImage Component and handles click", () => {
    const handleClick = vi.fn();
    handleClick("hello", 1);
    render(<WheresWaldoImage handleClick={handleClick} />);
    const waldoImage = screen.getByRole("pop-menu");
    expect(waldoImage).toHaveAttribute(
      "src",
      "/public/assets/images/simple.jpg"
    );
    expect(vi.isMockFunction(handleClick)).toBe(true);
    expect(handleClick.mock.calls[0]).toEqual(["hello", 1]);
  });
});
