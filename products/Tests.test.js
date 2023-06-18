/* eslint-disable jest/valid-expect */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable no-unused-vars */
/* eslint-disable jest/no-identical-title */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom";
import { truncateText } from "./components/truncateText";
import { mockData } from "./mockData";
import Solution from "./components/Solution";
import Products from "./components/Products";

describe("Solution", () => {
  it("Renders the search input field", () => {
    const { getByTestId } = render(<Solution />);
    const searchInput = getByTestId("search");
    expect(searchInput).toBeInTheDocument();
  });
});

describe("Solution", () => {
  it("Updates the search input field value on input change", () => {
    const { getByTestId } = render(<Solution />);
    const searchInput = getByTestId("search");
    fireEvent.change(searchInput, { target: { value: "apple" } });
    expect(searchInput.value).toBe("apple");
  });
});

describe("Solution", () => {
  it("Truncates text correctly", () => {
    const text = "This is a long text that needs to be truncated";
    const length = 10;
    const truncatedText = truncateText(text, length);

    expect(truncatedText).toEqual("This is a ...");
  });
});

describe("Solution", () => {
  it("Displays data fetched from an API", async () => {
    const { getByText, getAllByTestId } = render(
      <Products products={mockData} />
    );
    expect(getByText("iPhone 9")).toBeInTheDocument();
    expect(getByText("iPhone X")).toBeInTheDocument();
  });
});

describe("Solution", () => {
  it("Should filter the product cards based on search input", async () => {
    render(<Solution />);
    render(<Products products={mockData} />);

    // Search input element
    const searchInput = screen.getByTestId("search");

    // Fire a change event on the search input with value "iPhone"
    fireEvent.change(searchInput, { target: { value: "iPhone" } });

    // Get all product cards
    const productCards = await screen.findAllByTestId("product-card");

    // Get the titles of all the product cards
    const productTitles = productCards.map(
      (card) => card.querySelector("h1").textContent
    );

    // Check if all the product cards displayed contain the search keyword in their title, description or price
    const expectedTitles = mockData
      .filter(
        (product) =>
          product.title.toLowerCase().includes("iphone") ||
          product.description.toLowerCase().includes("iphone") ||
          product.price.toString().includes("iphone")
      )
      .map((product) => product.title);

    expect(productTitles).toEqual(expectedTitles);
  });
});

describe("Solution", () => {
  it("Renders the component without errors", () => {
    render(<Solution />);
    expect(screen.getByText("MoonshotX Products"));
  });
});
