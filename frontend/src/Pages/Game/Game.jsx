import React, { useCallback, useMemo, useState } from 'react'
import './game.scss'
import {Chess} from 'chess.js'
import {Chessboard} from 'react-chessboard'
import customDialog from '../../Components/customDialog'

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
        const moveData = {
            from: sourceSquare,
            to: targetSquare,
            color: chess.turn(),
            // promotion: "q",
        }

        const move = makeAMove(moveData);
    
        // illegal move
        if (move === null) return false;
     
        return true;
      }

    return (
        <div className="game">
            <div className="borad">
                <Chessboard 
                    position={fen}
                    onPieceDrop={onDrop}
                    boardWidth={560}
                />
            </div>

            <customDialog 
                open = {Boolean(over)}
                title = {over}
                contextText = {over}
                handleContinue = {() => {
                    setOver("")
                }}
            />
        </div>
    )
}

export default Game