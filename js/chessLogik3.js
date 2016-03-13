"use strict";
class Board{
	
	constructor(){
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
			{i:1,j:0},{i:-1,j:0},{i:0,j:1},{i:0,j:-1}]};
	} 

	
	isOnBoard(from){
		if(from.length >2) return false;
		if(from.toLowerCase().charCodeAt(0) < 97 || from.toLowerCase().charCodeAt(0) > 104) return false;
		if(+from.toLowerCase().charAt(1)< 1  || +from.toLowerCase().charAt(1) > 8)return false;	
		
		return true;
	}
		
	isOpponentFigure(from,to)	{
		if (this.isFreeCell(to)) return false;
		var s = this.figures[from].charCodeAt(0);
		var e = this.figures[to].charCodeAt(0);
		
		if ((s < 96 && e > 96)||(s > 96 && e < 96)) return true;
		return false;
	}
		
	isFreeCell(coor){
		
		return this.figures[coor] === undefined ? true : false;
	}

	getPosition(){
		var out = {};

		var newFigure;
		for (var key in this.figures){
			if (this.figures[key].charCodeAt(0) > 96){
				newFigure = 'b'
			}
			else{
				newFigure = 'w'
			}
			newFigure += this.figures[key].toUpperCase();
			out[key] = newFigure;
		}
		return out;
	}
	

	getMove (from,move){
		//e4  e  = j  4 = i				
		return String.fromCharCode(from.toLowerCase().charCodeAt(0) + move.j)+
				(+from.toLowerCase().charAt(1)+move.i);		
	}
	
	//this.rules['r'].moves[0].i
	//this.rules['r'].multiMoves
	getLegalMoves(from){
		if ( this.isFreeCell(from)) return '';

		var newCoor;
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
			return lm;

	}
	
	canMove (from,to){
		var mv = this.getLegalMoves(from);
		if (mv.indexOf(to) >= 0){
			this.figures[to] = this.figures[from];
			delete this.figures[from];
			return true;
			
		}
		return false;
	}


	

/*
	function figure(n,m,multm){
		this.moves = m;//.slice();
		this.multiMoves = multm;
		this.name = n;
		
		
	
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
	}	*/
}




