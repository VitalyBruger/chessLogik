"use strict";
class Piece{
	
	constructor(name,board,color,position,multiMoves,moves){
		this.name = name;
		this.board = board;
		this.color = color;
		this.position = position;
		this.moves = moves;
		this.multiMoves = multiMoves;
	}

	getMoves(){
		if ( this.board.isFreeCell(this.position)) return '';

		var newCoor;
		var lm = '';
		

		for(var k = 0; k < this.moves.length; k++){				
				newCoor = this.board.getMove(this.position,this.moves[k]);
				if (this.multiMoves){
					while(this.board.isOnBoard(newCoor) && 
						(this.board.isFreeCell(newCoor)||this.board.isOpponentFigure(this.position,newCoor)) ){
						lm += newCoor;
						if(this.board.isOpponentFigure(this.position,newCoor)){
							break;
						}
						newCoor = this.board.getMove(newCoor,this.moves[k]);					
					}
				}
				else {
					if(this.board.isOnBoard(newCoor) && 
						(this.board.isFreeCell(newCoor)||this.board.isOpponentFigure(this.position,newCoor))){						
						lm += newCoor;
					}
				}
			}
			return lm;
	}
}

class Rook extends Piece {
  	constructor(board,color,position){
		super('R',board,color,position,true,[{i:1,j:0},{i:-1,j:0},{i:0,j:1},{i:0,j:-1}]);
		this.board = board;
		this.color = color;
		this.position = position;
  	}
}

class Knight extends Piece {
  	constructor(board,color,position){
		super('N',board,color,position,false,[{i:2,j:1},{i:2,j:-1},{i:-2,j:1},{i:-2,j:-1},
			{i:1,j:2},{i:1,j:-2},{i:-1,j:2},{i:-1,j:-2}]);
		this.board = board;
		this.color = color;
		this.position = position;
  	}
}

class Bishop extends Piece {
  	constructor(board,color,position){
		super('B',board,color,position,true,[{i:1,j:1},{i:-1,j:-1},{i:1,j:-1},{i:-1,j:1}]);
		this.board = board;
		this.color = color;
		this.position = position;
  	}
}

class Queen extends Piece {
  	constructor(board,color,position){
		super('Q',board,color,position,true,[{i:1,j:1},{i:-1,j:-1},{i:1,j:-1},{i:-1,j:1},
			{i:1,j:0},{i:-1,j:0},{i:0,j:1},{i:0,j:-1}]);
		this.board = board;
		this.color = color;
		this.position = position;
  	}
}

class King extends Piece {
  	constructor(board,color,position){
		super('K',board,color,position,false,[{i:1,j:1},{i:-1,j:-1},{i:1,j:-1},{i:-1,j:1},
			{i:1,j:0},{i:-1,j:0},{i:0,j:1},{i:0,j:-1}]);
		this.board = board;
		this.color = color;
		this.position = position;
  	}
}
class Board{
	
	constructor(){
		this.pieces ={};
		this.pieces ['a1'] = new Rook(this,'w','a1');
		this.pieces ['h1'] = new Rook(this,'w','h1');
		this.pieces ['b1'] = new Knight(this,'w','b1');
		this.pieces ['g1'] = new Knight(this,'w','g1');
		this.pieces ['c1'] = new Bishop(this,'w','c1');
		this.pieces ['f1'] = new Bishop(this,'w','f1');
		this.pieces ['d1'] = new Queen(this,'w','c1');
		this.pieces ['e1'] = new King(this,'w','f1');

		this.pieces ['a8'] = new Rook(this,'b','a8');
		this.pieces ['h8'] = new Rook(this,'b','h8');
		this.pieces ['b8'] = new Knight(this,'b','b8');
		this.pieces ['g8'] = new Knight(this,'b','g8');
		this.pieces ['c8'] = new Bishop(this,'b','c8');
		this.pieces ['f8'] = new Bishop(this,'b','f8');
		this.pieces ['d8'] = new Queen(this,'b','c8');
		this.pieces ['e8'] = new King(this,'b','f8');
/*
		this.figures = {};	
		this.figures['a1'] = 'R';
		this.figures['h1'] = 'R';
		this.figures['b1'] = 'N';
		this.figures['g1'] = 'N';
		this.figures['c1'] = 'B';
		this.figures['f1'] = 'B';
		this.figures['d1'] = 'Q';
		this.figures['e1'] = 'K';
                       
		this.figures['a8'] = 'r';
		this.figures['h8'] = 'r';
		this.figures['b8'] = 'n';
		this.figures['g8'] = 'n';
		this.figures['c8'] = 'b';
		this.figures['f8'] = 'b';
		this.figures['d8'] = 'q';
		this.figures['e8'] = 'k';

		this.rules ={};
		this.rules['r'] = {multiMoves:true,
			moves:[{i:1,j:0},{i:-1,j:0},{i:0,j:1},{i:0,j:-1}]};
		this.rules['n'] = {multiMoves:false,
			moves:[{i:2,j:1},{i:2,j:-1},{i:-2,j:1},{i:-2,j:-1},
			{i:1,j:2},{i:1,j:-2},{i:-1,j:2},{i:-1,j:-2}]};
		this.rules['b'] = {multiMoves:true,
			moves:[{i:1,j:1},{i:-1,j:-1},{i:1,j:-1},{i:-1,j:1}]};
		this.rules['q'] = {multiMoves:true,
			moves:[{i:1,j:1},{i:-1,j:-1},{i:1,j:-1},{i:-1,j:1},
			{i:1,j:0},{i:-1,j:0},{i:0,j:1},{i:0,j:-1}]};
		this.rules['k'] = {multiMoves:false,
			moves:[{i:1,j:1},{i:-1,j:-1},{i:1,j:-1},{i:-1,j:1},
			{i:1,j:0},{i:-1,j:0},{i:0,j:1},{i:0,j:-1}]};*/
	} 

	
	isOnBoard(from){
		if(from.length >2) return false;
		if(from.toLowerCase().charCodeAt(0) < 97 || from.toLowerCase().charCodeAt(0) > 104) return false;
		if(+from.toLowerCase().charAt(1)< 1  || +from.toLowerCase().charAt(1) > 8)return false;	
		
		return true;
	}
		
	isOpponentFigure(from,to)	{
		if (this.isFreeCell(to)) return false;
		if (this.pieces[from].color != this.pieces[to].color) return true;
		return false;

		/*if (this.isFreeCell(to)) return false;
		var s = this.figures[from].charCodeAt(0);
		var e = this.figures[to].charCodeAt(0);
		
		if ((s < 96 && e > 96)||(s > 96 && e < 96)) return true;
		return false;*/
	}
		
	isFreeCell(coor){
		
		return this.pieces[coor] === undefined ? true : false;
	}

	getPosition(){
		var out = {};

		for (var key in this.pieces){
			out[key] = this.pieces[key].color+this.pieces[key].name; 	
		}
		return out;
	}
	

	getMove (from,move){
		//e4  e  = j  4 = i				
		return String.fromCharCode(from.toLowerCase().charCodeAt(0) + move.j)+
				(+from.toLowerCase().charAt(1)+move.i);		
	}
	
	getMoves(from){
		//if ( this.isFreeCell(from)) return '';
		return this.pieces[from].getMoves();
		/*var newCoor;
		var lm = '';
		var keyFigure = this.figures[from].toLowerCase();

		for(var k = 0; k < this.rules[keyFigure].moves.length; k++){				
				newCoor = this.getMove(from,this.rules[keyFigure].moves[k]);
				if (this.rules[keyFigure].multiMoves){
					while(this.isOnBoard(newCoor) && 
						(this.isFreeCell(newCoor)||this.isOpponentFigure(from,newCoor)) ){
						lm += newCoor;
						if(this.isOpponentFigure(from,newCoor)){
							break;
						}
						newCoor = this.getMove(newCoor,this.rules[keyFigure].moves[k]);					
					}
				}
				else {
					if(this.isOnBoard(newCoor) && 
						(this.isFreeCell(newCoor)||this.isOpponentFigure(from,newCoor))){						
						lm += newCoor;
					}
				}
			}
			return lm;*/
	}
	
	canMove (from,to){
		var mv = this.getMoves(from);
		if (mv.indexOf(to) >= 0){
			this.pieces[to] = this.pieces[from];
			this.pieces[to].position = to;
			delete this.pieces[from];
			return true;
		}
		return false;
	}
}




