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
import QRCodeScannerComponent from '../components/QRCodeScanner';
import QRCodeManagementComponent from '../components/QRManagement';
import WebRTCComponent from '../components/WebRTC';
import { useAuth } from '../AuthContext';
const HomePage = () => {
    const { isAuthenticated } = useAuth();
    const { setAuthStatus } = useAuth();
    const [openLoginDialog, setOpenLoginDialog] = React.useState(!isAuthenticated);

    const handleLogin = () => {
        // Simulate successful authentication
        setAuthStatus(true);
        setOpenLoginDialog(false);
    };

    return (
        <Container maxWidth="md">
        <Typography variant="h4" component="div" gutterBottom style={{margin: ' 0 4em ',justifyContent:'center'}}>
               Welcome User
        </Typography>


        <br></br>
        {/* QR Code Management Component */}
        <QRCodeManagementComponent />

        <Divider style={{ margin: '5em 0' }} />

                {/* QR Code Scanner Component */}
                <QRCodeScannerComponent />
        <Divider style={{ margin: '5em 0' }} />



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
