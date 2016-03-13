function Board(){
	var BOARD_SIZE = 8;
	
	var board = [
	['r','n','b','q','k','b','n','r'],
	['p','p','p','p','p','p','p','p'],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	['P','P','P','P','P','P','P','P'],
	['R','N','B','Q','K','B','N','R']]
	
	var figures = {};
	figures.knight = new figure([{i:2,j:1},{i:2,j:-1},{i:-2,j:1},{i:-2,j:-1},{i:1,j:2},{i:1,j:-2},{i:-1,j:2},{i:-1,j:-2}],false);
	figures.rook = new figure([{i:1,j:0},{i:-1,j:0},{i:0,j:1},{i:0,j:-1}],true);
	figures.bishop = new figure([{i:1,j:1},{i:-1,j:-1},{i:1,j:-1},{i:-1,j:1}],true);
	figures.queen = new figure([{i:1,j:1},{i:-1,j:-1},{i:1,j:-1},{i:-1,j:1},{i:1,j:0},{i:-1,j:0},{i:0,j:1},{i:0,j:-1}],true);
	figures.king = new figure([{i:1,j:1},{i:-1,j:-1},{i:1,j:-1},{i:-1,j:1},{i:1,j:0},{i:-1,j:0},{i:0,j:1},{i:0,j:-1}],false);
	
	moveToCoor = function (from){
		return {i : -(+from.charAt(1)-8),j : from.toLowerCase().charCodeAt(0)-97};
	}
	
	coorToMove = function (from){
		return   String.fromCharCode(97+from.j)+(8-from.i);		
	}
	
	function isOnBoard(coor){
		if (coor.i < 0 || coor.j < 0 || coor.i > BOARD_SIZE-1 || coor.j > BOARD_SIZE-1) return false;
		return true;
	}
		
	function isOpponentFigure(from,to)	{
		if (board[from.i][from.j] == 0) return false;
		if (board[to.i][to.j] == 0) return false;
		
		var s = board[from.i][from.j].charCodeAt(0);
		var e = board[to.i][to.j].charCodeAt(0);
		
		if ((s < 96 && e > 96)||(s > 96 && e < 96)) return true;
		return false;
	}
		
	function freeCell(coor){
		return board[coor.i][coor.j] == 0 ? true : false;
	}

	this.getLegalMoves = function(from){
		var coor = moveToCoor(from);
		if (freeCell(coor)) return [];
		
		if(board[coor.i][coor.j].toLowerCase() == 'n') return figures.knight.getLegalMoves(from);
		if(board[coor.i][coor.j].toLowerCase() == 'r') return figures.rook.getLegalMoves(from);
		if(board[coor.i][coor.j].toLowerCase() == 'b') return figures.bishop.getLegalMoves(from);
		if(board[coor.i][coor.j].toLowerCase() == 'q') return figures.queen.getLegalMoves(from);
		if(board[coor.i][coor.j].toLowerCase() == 'k') return figures.king.getLegalMoves(from);
		
	}
	
	this.canMove = function(from,to){
		var mv = this.getLegalMoves(from);
		if (mv.join().indexOf(to) >= 0){
			move(from,to);
			return true;
			
		}
		return false;

		
	}
	
	function move(from,to){
		var start = moveToCoor(from);
		var end = moveToCoor(to);
		board[end.i][end.j] = board[start.i][start.j];
		board[start.i][start.j] = 0;
	}
	
	function figure(m,multm){
		this.moves = m.slice();
		this.multiMoves = multm;
		
		this.getLegalMoves = function (from){
			var coor = moveToCoor(from);
			var newCoor = {i:-1,j:-1};
			var lm = [];
			for(var k = 0; k < this.moves.length; k++){
				
				newCoor.i = coor.i + this.moves[k].i;
				newCoor.j = coor.j + this.moves[k].j;
				if (this.multiMoves){
					while(isOnBoard(newCoor) && (freeCell(newCoor)||isOpponentFigure(coor,newCoor)) ){
						lm.push(coorToMove(newCoor));
						
						if(isOpponentFigure(coor,newCoor)){
							break;
						}
						newCoor.i = newCoor.i + this.moves[k].i;
						newCoor.j = newCoor.j + this.moves[k].j;
						
					}
				}
				else {
					if(isOnBoard(newCoor) && (freeCell(newCoor)||isOpponentFigure(coor,newCoor))){						
						lm.push(coorToMove(newCoor));						
					}
				}
			}
			return lm;
		}		
		
	}
	
	this.Drawboard = function (boardID){
	var out = '<h1>'
	for (var i=0; i<8; i++){
	out += '<br>';
	  for (var j=0; j<8; j++){			
			out += board[i][j]+' ';
		}
	  }
	  boardID.innerHTML = out+'</h1>';
	}
	
	
}










