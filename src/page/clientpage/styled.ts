import { styled } from "@mui/material";

export const AllBox = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#33CCFF",
  width: "100%",
  height: "90vh"
}));

export const MiddleBox = styled("div")(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "2px",
  marginTop: "2px"
}));

export const ShotBox = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  padding: "10px"
}));
