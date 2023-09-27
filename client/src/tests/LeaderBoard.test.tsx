import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import LeaderBoard from "../components/LeaderBoard";

describe("LeaderBoard", () => {
  it("renders LeaderBoard Component", () => {
    render(
      <BrowserRouter>
        <LeaderBoard />
      </BrowserRouter>
    );
    expect(screen.getByText("Leaderboard")).toBeInTheDocument();
  });
});
