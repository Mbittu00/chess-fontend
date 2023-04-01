import { useState, useEffect, useContext } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import "./Play.css";
import context from "../context/context";
import { useParams } from "react-router-dom";
let chess = new Chess();

export default function PlayRandomMoveEngine() {
  let params = useParams();
  const { socket, token, game, setGame } = useContext(context);
  //const [chess, setChess] = useState(new Chess());
  let [fen, setFen] = useState(chess.fen());
  const [my, setMy] = useState(game.w == token ? "w" : "b");
  
  useEffect(() => {
    socket.on("played", (res) => {
      setGame(res);
      console.log(res);
    });
  }, [socket]);
  
  useEffect(() => {
    setFen(game.position);
    chess=new Chess(game.position)
    console.log(game.position)
  }, [game]);
  //  let turn = "w";
  function onDrop(sourceSquare, targetSquare) {
    try {
      if (my == game.turn) {
        let gameCopy = chess;
        const move = gameCopy.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: "q", // always promote to a queen for example simplicity
        });

        socket.emit("update", {
          w: game.w,
          b: game.b,
          position: gameCopy.fen(),
          gameId: game.gameId,
          turn: game.turn == "w" ? "b" : "w",
        });
      }

      // setFen(gameCopy.fen());
    } catch (e) {
      console.log(e);
    }
    /*  if (chess.turn() === game.turn) {
    }*/
  }
  //console.log(fen)
  return (
    <div className="Play">
      <center>
        <span>turn {chess.turn() == "w" ? "white" : "black"}</span>
      </center>
      <Chessboard
        position={fen}
        onPieceDrop={onDrop}
        customBoardStyle={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
        }}
        boardOrientation={game.w === token ? "white" : "black"}
      />
    </div>
  );
}
