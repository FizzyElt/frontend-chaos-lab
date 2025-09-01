import { css } from "styled-system/css";

export const card = css({
  padding: "1rem",
  width: "300px",
  display: "flex",
  flexDirection: "column",
  rowGap: "10px",
});

export const centerBlock = css.raw({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  rowGap: "10px",
  border: "2px solid",
  borderColor: "gray.10",
  borderRadius: "sm",
  padding: "10px",
});

export const center = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  rowGap: "10px",
});

export const logo = css.raw({
  height: "6em",
  padding: "1.5em",
  willChange: "filter",
  transition: "filter 300ms",
});
