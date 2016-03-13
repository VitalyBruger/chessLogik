function Board(){
	var BOARD_SIZE = 8;
	

	var figures = {};
	/*figures.knight = new figure([{i:2,j:1},{i:2,j:-1},{i:-2,j:1},{i:-2,j:-1},{i:1,j:2},{i:1,j:-2},{i:-1,j:2},{i:-1,j:-2}],false);
	figures.rook = new figure([{i:1,j:0},{i:-1,j:0},{i:0,j:1},{i:0,j:-1}],true);
	figures.bishop = new figure([{i:1,j:1},{i:-1,j:-1},{i:1,j:-1},{i:-1,j:1}],true);
	figures.queen = new figure([{i:1,j:1},{i:-1,j:-1},{i:1,j:-1},{i:-1,j:1},{i:1,j:0},{i:-1,j:0},{i:0,j:1},{i:0,j:-1}],true);
	figures.king = new figure([{i:1,j:1},{i:-1,j:-1},{i:1,j:-1},{i:-1,j:1},{i:1,j:0},{i:-1,j:0},{i:0,j:1},{i:0,j:-1}],false);
	*/
	figures['a1'] = new figure('R',[{i:1,j:0},{i:-1,j:0},{i:0,j:1},{i:0,j:-1}],true);
	figures['h1'] = new figure('R',[{i:1,j:0},{i:-1,j:0},{i:0,j:1},{i:0,j:-1}],true);
	figures['b1'] = new figure('N',[{i:2,j:1},{i:2,j:-1},{i:-2,j:1},{i:-2,j:-1},{i:1,j:2},{i:1,j:-2},{i:-1,j:2},{i:-1,j:-2}],false);
	figures['g1'] = new figure('N',[{i:2,j:1},{i:2,j:-1},{i:-2,j:1},{i:-2,j:-1},{i:1,j:2},{i:1,j:-2},{i:-1,j:2},{i:-1,j:-2}],false);
	figures['c1'] = new figure('B',[{i:1,j:1},{i:-1,j:-1},{i:1,j:-1},{i:-1,j:1}],true);
	figures['f1'] = new figure('B',[{i:1,j:1},{i:-1,j:-1},{i:1,j:-1},{i:-1,j:1}],true);
	figures['d1'] = new figure('Q',[{i:1,j:1},{i:-1,j:-1},{i:1,j:-1},{i:-1,j:1},{i:1,j:0},{i:-1,j:0},{i:0,j:1},{i:0,j:-1}],true);
	figures['e1'] = new figure('K',[{i:1,j:1},{i:-1,j:-1},{i:1,j:-1},{i:-1,j:1},{i:1,j:0},{i:-1,j:0},{i:0,j:1},{i:0,j:-1}],false);

	figures['a8'] = new figure('r',[{i:1,j:0},{i:-1,j:0},{i:0,j:1},{i:0,j:-1}],true);
	figures['h8'] = new figure('r',[{i:1,j:0},{i:-1,j:0},{i:0,j:1},{i:0,j:-1}],true);
	figures['b8'] = new figure('n',[{i:2,j:1},{i:2,j:-1},{i:-2,j:1},{i:-2,j:-1},{i:1,j:2},{i:1,j:-2},{i:-1,j:2},{i:-1,j:-2}],false);
	figures['g8'] = new figure('n',[{i:2,j:1},{i:2,j:-1},{i:-2,j:1},{i:-2,j:-1},{i:1,j:2},{i:1,j:-2},{i:-1,j:2},{i:-1,j:-2}],false);
	figures['c8'] = new figure('b',[{i:1,j:1},{i:-1,j:-1},{i:1,j:-1},{i:-1,j:1}],true);
	figures['f8'] = new figure('b',[{i:1,j:1},{i:-1,j:-1},{i:1,j:-1},{i:-1,j:1}],true);
	figures['d8'] = new figure('q',[{i:1,j:1},{i:-1,j:-1},{i:1,j:-1},{i:-1,j:1},{i:1,j:0},{i:-1,j:0},{i:0,j:1},{i:0,j:-1}],true);
	figures['e8'] = new figure('k',[{i:1,j:1},{i:-1,j:-1},{i:1,j:-1},{i:-1,j:1},{i:1,j:0},{i:-1,j:0},{i:0,j:1},{i:0,j:-1}],false);
	
	
	function isOnBoard(from){
		if(from.length >2) return false;
		if(from.toLowerCase().charCodeAt(0) < 97 || from.toLowerCase().charCodeAt(0) > 104) return false;
		if(+from.toLowerCase().charAt(1)< 1  || +from.toLowerCase().charAt(1) > BOARD_SIZE)return false;	
		
		return true;
	}
		
	function isOpponentFigure(from,to)	{
		if (isFreeCell(to)) return false;
		var s = figures[from].name.charCodeAt(0);
		var e = figures[to].name.charCodeAt(0);
		
		if ((s < 96 && e > 96)||(s > 96 && e < 96)) return true;
		return false;
	}
		
	function isFreeCell(coor){
		
		return figures[coor] === undefined ? true : false;
	}

	this.getPosition = function(){
		var out = {};

		var newFigure;
		for (var key in figures){
			if (figures[key].name.charCodeAt(0) > 96){
				newFigure = 'b'
			}
			else{
				newFigure = 'w'
			}
			newFigure += figures[key].name.toUpperCase();
			out[key] = newFigure;
		}
		return out;
	}
	
	this.getLegalMoves = function(from){
		if ( !isFreeCell(from))
			return figures[from].getLegalMoves(from);
		else
			alert('empty');
	}
	
	this.canMove = function(from,to){
		var mv = this.getLegalMoves(from);
		if (mv.indexOf(to) >= 0){
			figures[to] = figures[from];
			delete figures[from];
			return true;
			
		}
		return false;
	}
	
	function figure(n,m,multm){
		this.moves = m;//.slice();
		this.multiMoves = multm;
		this.name = n;
		
		getMove = function (from,move){
			//e4  e  = j  4 = i				
			return String.fromCharCode(from.toLowerCase().charCodeAt(0) + move.j)+
				(+from.toLowerCase().charAt(1)+move.i);		
		}
		
	
		this.getLegalMoves = function (from){

			var newCoor;
			var lm = '';
			for(var k = 0; k < this.moves.length; k++){				
				newCoor = getMove(from,this.moves[k]);
				if (this.multiMoves){
					while(isOnBoard(newCoor) && (isFreeCell(newCoor)||isOpponentFigure(from,newCoor)) ){
						lm += newCoor;
						if(isOpponentFigure(from,newCoor)){
							break;
						}
						newCoor = getMove(newCoor,this.moves[k]);						
					}
				}
				else {
					if(isOnBoard(newCoor) && (isFreeCell(newCoor)||isOpponentFigure(from,newCoor))){						
						lm += newCoor;
					}
				}
			}
			return lm;
		}			
	}	
}




