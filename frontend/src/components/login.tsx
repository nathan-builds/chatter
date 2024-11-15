import { Box, Button, Card, CardActions, CardContent, CardHeader, Stack, TextField } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const queryClient = useQueryClient();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ username, password });
        const loginMutation = useMutation({
            mutationFn: async () => {
                const response = await fetch('http://localhost:3001/user/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                if (!response.ok) {
                    throw new Error('Login failed');
                }

                return response.json();
            },
            onSuccess: (data) => {
                // Store the token or user data as needed
                queryClient.setQueryData(['user'], data);
                // Could add navigation to chat page here
            },
        });

        loginMutation.mutate();
    };




    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                // Optional: Add a light background
            }}
        >
            <Card sx={{ width: '100%', padding: 2 }}>
                <CardHeader title="Login" />
                <CardContent>
                    <Stack gap={2}>
                        <TextField
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            variant="outlined"
                            fullWidth
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            variant="outlined"
                            fullWidth
                        />
                    </Stack>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                    <Button type="submit" variant="contained" onClick={handleSubmit}>Login</Button>
                </CardActions>
            </Card>
        </Box>
    );
};