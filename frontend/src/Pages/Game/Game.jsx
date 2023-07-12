import React, { useCallback, useEffect, useMemo, useState } from 'react'
import './game.scss'
import {Chess} from 'chess.js'
import {Chessboard} from 'react-chessboard'
import CustomDialog from '../../Components/CustomDialog'
import socket from '../../socket'

const Game = ({players, room, orientation, cleanup}) => {
    const chess = useMemo(() => new Chess(), [])
    const [fen, setFen] = useState(chess.fen())
    const [over, setOver] = useState("")

    const makeAMove = useCallback(
        (move) => {
            try {   
                const result = chess.move(move);
                setFen(chess.fen());

                console.log("over, checkmate", chess.isGameOver(), chess.isCheckmate());

                if (chess.isGameOver()) {   // check if move led to game over
                    if (chess.isCheckmate()) {  // check if game over is due to checkmate
                        setOver(
                            `Checkmate! ${chess.turn() === "w" ? "Black" : "White"} wins!`
                        )
                    }
                    else if (chess.isDraw()) {  // check if game over is due to draw    
                        setOver("Draw!")
                    }
                    else {
                        setOver("Game over!")
                    }
                }

                return result;
            }
            catch (err) {
                return null;
            }
        }, [chess]
    )

    function onDrop(sourceSquare, targetSquare) {
        // don't allow other player moves
        if (chess.turn() !== orientation[0]) return false;

        // don't allow moves if opponent has not joined
        if (players.length < 2) return false;

        const moveData = {
            from: sourceSquare,
            to: targetSquare,
            color: chess.turn(),
            promotion: "q",
        }

        const move = makeAMove(moveData);
    
        // illegal move
        if (move === null) return false;
        
        socket.emit('move', {
            move,
            room,
        })

        return true;    
      }

    useEffect(() => {
        socket.on('move', (move) => {
            makeAMove(move);
        })
    }, [makeAMove])

    useEffect(() => {
        socket.on('playerDisconnected', (player) => {
            setOver (`${player.username} has disconnected!`)
        })
    }, [])

    useEffect ( () => {
        socket.on('closeRoom', ({roomId}) => {
            if (roomId === room) {
                cleanup();
            }
        })
    }, [room, cleanup])

    return (
        <div className="game">
            <div className="borad">
                <Chessboard 
                    position={fen}
                    onPieceDrop={onDrop}
                    boardOrientation={orientation}
                    // boardWidth={560}
                />
            </div>

            <CustomDialog 
                open = {Boolean(over)}
                title = {over}
                contextText = {over}
                handleContinue = {() => {
                    // setOver("")
                    socket.emit('closeRoom', {roomId: room})
                    cleanup();
                }}
            />
        </div>
    )
}

export default Game