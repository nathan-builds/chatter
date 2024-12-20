import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChatPage } from './pages/chatPage.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginOrRegisterPage from './pages/loginOrRegisterPage.tsx';
import { AuthProvider } from '../context/authContext.tsx';
import { ChatProvider } from '../context/chatContext.tsx';
const queryClient = new QueryClient();


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <ChatProvider>

                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<App />}>
                                <Route path="login" element={<LoginOrRegisterPage />} />
                                <Route path="chat" element={<ChatPage />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>

                </ChatProvider>
            </AuthProvider>
        </QueryClientProvider>
    </StrictMode>
);
