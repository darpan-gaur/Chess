import { useState } from 'react';
import socket from './socket';
import CustomDialog from './Components/CustomDialog';
import { Button, Stack, TextField } from '@mui/material';

const InitGame = ({setRoom, setOrientation, setPlayers}) => {
    const [roomDialogOpen, setRoomDialogOpen] = useState(false);
    const [roomInput, setRoomInput] = useState('');
    const [roomError, setRoomError] = useState('');

    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            sx = {{ py:1, height: "100vh"}}
        >
            <CustomDialog
                open = {roomDialogOpen}
                handleClose = {() => setRoomDialogOpen(false)}
                title = "Select Room to Join"
                contentText = "Enter the room ID to join"
                handleContinue = {() => {
                    // join a room
                    if (!roomInput) return; // if roomId is valid, do nothing
                    socket.emit("joinRoom", {roomId: roomInput}, (r) => {
                        if (r.error) return setRoomError(r.message);
                        console.log( "response:" ,r);
                        setRoom(r?.roomId)
                        setPlayers(r?.players);
                        setOrientation("black");
                        setRoomDialogOpen(false); // close the dialog  
                    })
                }}
            >
                <TextField 
                    autoFocus
                    margin='dense'
                    id = "room"
                    label = "Room ID"
                    name='room'
                    value={roomInput}
                    required
                    onChange = {(e) => setRoomInput(e.target.value)}
                    type = "text"
                    fullWidth
                    variant='standard'
                    error = {Boolean(roomError)}
                    helperText = {!roomError ? 'Enter a room ID' : `Invalid room ID: ${roomError}`}
                />

            </CustomDialog>

            <Button
                variant="contained"
                onClick={() => {
                    socket.emit("createRoom", (r) => {
                        console.log(r);
                        setRoom(r);
                        setOrientation("white");
                    })
                }}
            >
                Start a game
            </Button>

            <Button
                onClick={() => {
                    setRoomDialogOpen(true);
                }}
            >
                Join a game
            </Button>

        </Stack>
  )
}

export default InitGame