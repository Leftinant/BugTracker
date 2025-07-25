import { render, screen, fireEvent } from "@testing-library/react";
import BugForm from "../components/BugForm";

test("displays form and handles submit", async () => {
  const mockAdd = jest.fn();
  render(<BugForm onBugAdded={mockAdd} />);

  fireEvent.change(screen.getByPlaceholderText(/Bug title/i), {
    target: { value: "Test Bug" },
  });
  fireEvent.click(screen.getByText(/Submit/i));

  expect(await screen.findByDisplayValue("")).toBeInTheDocument();
});
