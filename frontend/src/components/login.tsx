import { Box, Button, Card, CardActions, CardContent, CardHeader, Stack, TextField } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const auth = useAuth();

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
            auth.login({ id: data.id, username: data.username }, data.token);
            navigate('/chat');
        },
    });



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ username, password });
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