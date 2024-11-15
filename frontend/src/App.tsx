import './App.css';
import { AppBar, Box, Button, Container, CssBaseline, Toolbar, Typography } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

function App() {

    return (
        <>
            <CssBaseline />
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Chatter
                    </Typography>
                    <Button color="inherit" component={Link} to="/login">
                        Login
                    </Button>
                    <Button color="inherit" component={Link} to="/chat">Chat</Button>
                </Toolbar>
            </AppBar>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100vh',
                }}
            >
                <Container 
                    component="main" 
                    maxWidth={false}
                    disableGutters
                    sx={{ 
                        display: 'flex',
                        flexGrow: 1,
                        height: 'calc(100vh - 64px)',
                        mt: 8,
                        p: 0,
                        overflow: 'hidden',
                        width: '100%',
                        maxWidth: '100% !important',
                    }}
                >
                    <Outlet />
                </Container>
            </Box>
        </>
    );
}

export default App;
