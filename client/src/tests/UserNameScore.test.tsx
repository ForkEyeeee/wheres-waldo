import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import UserNameScore from "../components/UserNameScore";

describe("UserNameScore", () => {
  it("renders UserNameScore Component", async () => {
    const children = ["user", "00:00:00"];
    render(<UserNameScore>{children}</UserNameScore>);
    expect(screen.getByText("user")).toBeInTheDocument();
    expect(screen.getByText("00:00:00")).toBeInTheDocument();
  });
});
