import { Grid, styled } from "@mui/material";
import { RouteComponent } from "./Routes";
import { Header } from "./components";

const StyledGrid = styled(Grid)(() => ({
  paddingTop: "300px",
  minHeight: "100vh",
  width: "100%",
  paddingBottom: "100px",

  backgroundColor: "#1a242f",
}));

function App() {
  return (
    <div>
      <Header />
      <StyledGrid item>
        <RouteComponent />
      </StyledGrid>
    </div>
  );
}

export default App;
