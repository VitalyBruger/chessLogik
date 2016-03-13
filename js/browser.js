window.onload=function() {

  chessBoard = new Board();
  
  var onDrop = function(source, target, piece, newPos, oldPos, orientation) {
    if (!chessBoard.canMove(source,target)){
      return 'snapback';
    }

  };
 
  
  var cfg = {
    draggable: true,
    
    onDrop: onDrop
  };
  
  var board = ChessBoard('board', cfg);
  
  board.position(chessBoard.getPosition());
    
}
