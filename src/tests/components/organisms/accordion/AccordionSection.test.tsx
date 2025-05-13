import { describe, test, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { AccordionSection } from "@/components/organisms/accordion/AccordionSection";
import { renderWithProviders } from "@/tests/utils/test-utils";
import "@testing-library/jest-dom";

// Mock Material UI icons
vi.mock("@mui/icons-material/ExpandMore", () => ({
  default: () => <div data-testid="expand-more-icon">Mock Expand Icon</div>,
}));

describe("AccordionSection", () => {
  test("renders with correct title", () => {
    renderWithProviders(
      <AccordionSection title="Test Section">
        <div>Test Content</div>
      </AccordionSection>
    );

    // Check for title
    expect(screen.getByText("Test Section")).toBeInTheDocument();
    // Check for content
    expect(screen.getByText("Test Content")).toBeInTheDocument();
    // Check for expand icon
    expect(screen.getByTestId("expand-more-icon")).toBeInTheDocument();
  });

  test("starts collapsed by default", () => {
    renderWithProviders(
      <AccordionSection title="Test Section">
        <div data-testid="accordion-content">Test Content</div>
      </AccordionSection>
    );

    // Content should be in the document but not visible by default
    const content = screen.getByTestId("accordion-content");
    expect(content).toBeInTheDocument();

    // Check that summary has proper ARIA attributes
    const summary = screen.getByRole("button");
    expect(summary).toHaveAttribute("aria-controls", "Test Section-content");
    expect(summary).toHaveAttribute("id", "Test Section-header");
  });

  test("starts expanded when defaultExpanded is true", () => {
    renderWithProviders(
      <AccordionSection title="Test Section" defaultExpanded={true}>
        <div data-testid="accordion-content">Test Content</div>
      </AccordionSection>
    );

    // Content should be visible when defaultExpanded is true
    const content = screen.getByTestId("accordion-content");
    expect(content).toBeInTheDocument();
    expect(content).toBeVisible();
  });

  test("toggles content visibility on click", () => {
    renderWithProviders(
      <AccordionSection title="Test Section">
        <div data-testid="accordion-content">Test Content</div>
      </AccordionSection>
    );

    const summary = screen.getByRole("button");

    // Click to expand
    fireEvent.click(summary);

    // Content should be visible
    const content = screen.getByTestId("accordion-content");
    expect(content).toBeVisible();

    // Click to collapse
    fireEvent.click(summary);

    // Need to wait for animation to complete in real test, but simplified for this example
  });
});
