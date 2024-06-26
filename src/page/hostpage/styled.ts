import { styled } from "@mui/material";

export const AllBox = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "15%",
}));

export const MiddleBox = styled("div")(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: "20px",
}));

export const ShotBox = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  marginLeft: "20px",
}));
