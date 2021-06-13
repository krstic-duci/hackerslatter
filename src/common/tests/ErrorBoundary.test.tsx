import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorBoundary from "common/ErrorBoundary";

const renderProviders = (ui: React.ReactElement) => render(ui, {});

const ErrorComponent = () => {
  throw new Error("Error happened...");
};

describe("ErrorBoundary class", () => {
  it("should give meaningful error fallback", () => {
    renderProviders(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByTestId("errorHeading")).toBeInTheDocument();
  });
});
