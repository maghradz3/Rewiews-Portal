import { Grid, styled } from "@mui/material";
import { RouteComponent } from "./Routes";
import { Header } from "./components";
import { useTheme } from "./hooks";

// const StyledGrid = styled(Grid)(() => ({
//   paddingTop: "100px",
//   minHeight: "100vh",
//   width: "100%",
//   paddingBottom: "100px",

//   backgroundColor: "#1a242f",
// }));

function App() {
  const { theme } = useTheme();
  const bgColor = theme === "dark" ? "bg-[#1a242f]" : "bg-[#F0F0F0]";

  return (
    <Grid>
      <Header />
      <Grid className={`${bgColor} pt-5 h-[100vh] `} item>
        <RouteComponent />
      </Grid>
    </Grid>
  );
}

export default App;
