import { render, screen } from "@testing-library/react";

import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import App from "../App";

describe("DeathImage", () => {
  it("renders DeathImage Component", async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const deathImage = await screen.findByTestId("death-image");
    expect(deathImage).toBeInTheDocument();
    expect(deathImage).toHaveAttribute("src", "/assets/images/death.jpg");
  });
});
