window.onload=function() {

  chessBoard = new Board();


 // chessBoard.canMove('b1','c3');
  
  
  var onDrop = function(source, target, piece, newPos, oldPos, orientation) {
    //console.log("Source: " + source);
    //console.log("Target: " + target);
	var  cm = chessBoard.canMove(source,target);
	//console.log("canMove: " + cm);
	if (!cm){
		return 'snapback';
	}

  };
 
  
  
  var cfg = {
    draggable: true,
    //position: 'start',
    onDrop: onDrop
	
  };
  
  var board = ChessBoard('board', cfg);
  
   board.position(chessBoard.getPosition());
   
   
}
