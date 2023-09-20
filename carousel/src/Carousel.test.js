import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("renders without crashing", () => {
  render(
  <Carousel
    photos={TEST_IMAGES}
    title="images for testing"
  />
  );
});

it("matches the snapshot", () => {
  const { asFragment } = render(
  <Carousel
    photos={TEST_IMAGES}
    title="images for testing"
  />
  );
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

it("works when you click on the left arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  // expect the first image to show, and not the third (should move left, not right)
  expect(
    container.querySelector('img[alt="testing image 3"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
});

it("hides the left arrow while on first image", () => {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // expect the left arrow to be hidden (not be there) when on the first image
  const leftArrow = container.querySelector('.bi-arrow-left-circle');
  const rightArrow = container.querySelector('.bi-arrow-right-circle');
  expect(leftArrow.id).toEqual('hide');
  expect(rightArrow.id).toEqual('show');

  // expect the left arrow to reappear upon moving to the second image
  fireEvent.click(rightArrow);
  expect(leftArrow.id).toEqual('show');
});

it("hides the right arrow while on the last image", () => {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // move the carousel two times
  const leftArrow = container.querySelector('.bi-arrow-left-circle');
  const rightArrow = container.querySelector('.bi-arrow-right-circle');
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  // expect the right arrow to be hidden (not be there) when on the last image
  expect(rightArrow.id).toEqual('hide');
  expect(leftArrow.id).toEqual('show');

  // expect the right arrow to reappear upon returning to the second image
  fireEvent.click(leftArrow);
  expect(rightArrow.id).toEqual('show');
});