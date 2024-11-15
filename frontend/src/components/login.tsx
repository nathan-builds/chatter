import { Box, Button, Card, CardActions, CardContent, CardHeader, Stack, TextField } from '@mui/material';

export const Login = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f5f5f5' // Optional: Add a light background
            }}
        >
            <Card sx={{ width: '50%', padding: 2 }}>
                <CardHeader title="Login"/>
                <CardContent>
                    <Stack gap={2}>
                        <TextField label="Email" variant="outlined" fullWidth/>
                        <TextField label="Password" variant="outlined" fullWidth/>
                    </Stack>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                    <Button variant="contained">Login</Button>
                </CardActions>
            </Card>
        </Box>
    );
};