import { render, screen } from "@testing-library/react";
import BugList from "../components/BugList";
import * as api from "../api";

jest.mock("../api");

test("renders bugs from API", async () => {
  api.getBugs.mockResolvedValue([
    { _id: "1", title: "Test Bug", description: "", status: "open" },
  ]);

  render(<BugList />);
  expect(await screen.findByText("Test Bug")).toBeInTheDocument();
});
