import './App.css';
import { AppBar, Box, Button, Container, CssBaseline, Toolbar, Typography } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

function App() {

    return (
        <>
            <CssBaseline/>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Chatter
                    </Typography>
                    <Button color="inherit" component={Link} to="/login">
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    mt: 8 // Offset for fixed AppBar height
                }}
            >
                <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
                    <Outlet/>
                </Container>
                {/*<Box component="footer" sx={{ py: 2, textAlign: 'center', bgcolor: 'grey.200' }}>*/}
                {/*    <Typography variant="body2">© {new Date().getFullYear()} My App</Typography>*/}
                {/*</Box>*/}
            </Box>
        </>
    );
}

export default App;
