import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "../components/Footer";

describe("Footer", () => {
  it("renders Footer Component", () => {
    render(<Footer />);
    const footerImg = screen.getByRole("img");
    const footerText = screen.getByText("ForkEyeee");
    expect(footerImg).toBeVisible();
    expect(footerText).toBeVisible();
  });
});
