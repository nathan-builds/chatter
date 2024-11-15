import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { Login } from '../components/login';
import { SignUp } from '../components/signUp';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export default function LoginOrRegisterPage() {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 600, margin: '0 auto', mt: 4 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    centered
                >
                    <Tab label="Login" />
                    <Tab label="Sign Up" />
                </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
                <Login />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <SignUp />
            </TabPanel>
        </Box>
    );
}
