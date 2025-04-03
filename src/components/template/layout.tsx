import { Header } from "@components/organisms";
import { Footer } from "@components/organisms";
import { Box, Stack } from "@mui/material";

type LayoutProps = {
    children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => (
    <Stack direction="column" height="100%">
        <Header />
        <Box component="main" sx={{ flex: 1, overflow: "auto", padding: "2rem" }}>
            {children}
        </Box>
        <Footer />
    </Stack>
)

export { Layout };