import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { Container, TextField } from "@mui/material";
import socket from "./socket";
import CustomDialog from "./Components/CustomDialog";
import InitGame from "./InitGame";

import HomePage from "./Pages/HomePage";
import Game from "./Pages/Game/Game";


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <HomePage />,
//   },
//   {
//     path: "/game",
//     element: <Game />,
//   }
// ]);

function App() {
  const [username, setUsername] = useState('');
  const [usernameSubmitted, setUsernameSubmitted] = useState(false);

  const [room, setRoom] = useState("")
  const [orientation, setOrientation] = useState("")
  const [players, setPlayers] = useState([])

  // reset the state for initializing a new game
  const cleanup = useCallback( () => {
    setRoom("");
    setOrientation("");
    setPlayers("");
  }, [])

  useEffect( () => {
    socket.on('opponentJoined', (roomData) => {
      console.log('roomData:', roomData);
      setPlayers(roomData.players)
    })
  }, [])

  return (
    // <div className="app">
    <Container>
      
        < CustomDialog
          open = {!usernameSubmitted} // if username is not submitted, open the dialog
          handleClose = { () => setUsernameSubmitted(true)}
          title = "Enter your username"
          contentText = "Please enter your username to continue"
          handleContinue = {() => {
            if (!username) return;
            socket.emit('username', username);
            setUsernameSubmitted(true);
          }}
        >
        
          <TextField 
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            name="username"
            value={username}
            requiered
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            fullWidth
            variant="standard"
          />

        </CustomDialog>
        {/* <Game /> */}
        {room ? (
          <Game 
            room = {room}
            orientation = {orientation}
            players = {players}
            username = {username}
            // cleanup when game is over
            cleanup = {cleanup}
          />
        ) : (
          <InitGame 
            setRoom = {setRoom}
            setOrientation = {setOrientation}
            setPlayers = {setPlayers}
          />
        )}
    </Container>
    // </div>
  )
}

export default App
