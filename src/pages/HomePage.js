import React from 'react';
import {
    Container,
    Typography,
    Divider,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import QRCodeScannerComponent from '../components/QRCodeScannerComponent';
import QRCodeManagementComponent from '../components/QRCodeManagementComponent';
import WebRTCComponent from '../components/WebRTCComponent';

const HomePage = () => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [openLoginDialog, setOpenLoginDialog] = React.useState(!isAuthenticated);

    const handleLogin = () => {
        // Simulate successful authentication
        setIsAuthenticated(true);
        setOpenLoginDialog(false);
    };

    return (
        <Container maxWidth="md">
        <Typography variant="h4" component="div" gutterBottom>
            Home Page
        </Typography>

        {/* QR Code Scanner Component */}
        <QRCodeScannerComponent />

        <Divider style={{ margin: '2em 0' }} />

        {/* QR Code Management Component */}
        <QRCodeManagementComponent />

        <Divider style={{ margin: '2em 0' }} />

        {/* WebRTC Component */}
        <WebRTCComponent />

        <Dialog
            open={openLoginDialog}
            onClose={() => setOpenLoginDialog(false)}
            aria-labelledby="login-dialog-title"
            aria-describedby="login-dialog-description"
        >
            <DialogTitle id="login-dialog-title">{"Login"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="login-dialog-description">
                Please log in to access the Home Page.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={() => setOpenLoginDialog(false)}>Cancel</Button>
            <Button onClick={handleLogin} color="primary">
                Login
            </Button>
            </DialogActions>
        </Dialog>
        </Container>
    );
};

export default HomePage;
