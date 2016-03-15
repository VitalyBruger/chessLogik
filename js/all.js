/*Skip to content
This repository  
Search
Pull requests
Issues
Gist
 @VitalyBruger
 Watch 3
  Star 0
  Fork 0 BLukash/Some-pieses-of-chess-code
 Code  Issues 0  Pull requests 0  Wiki  Pulse  Graphs
Branch: master Find file Copy pathSome-pieses-of-chess-code/codeTry2.js
9fcf6d2  3 hours ago
@BLukash BLukash Common file with code 2 commit
1 contributor
RawBlameHistory     305 lines (293 sloc)  8.63 KB
'use strict';
var boardInfo = require('./pieces2.json');*/
'use strict';
class Piece {
  constructor (board,color, position) {
    this.color = color;
    this.position = position;
    this.board = board;
  }
  move () {
    throw new Error('this method move () shoul be inmplemented in child class');
  }
  canMove () {
    throw new Error('this method canMove () shoul be inmplemented in child class');
  }
  getMoves () {
    throw new Error('this method getMoves () shoul be inmplemented in child class');
  }
}

class Rook extends Piece {
  constructor(board,color, position) {
    super(board,color, position)
  }
}

class Knight extends Piece {
  constructor(board,color, position) {
    super(board,color, position);
    this.moves = [{i:2,j:1},{i:2,j:-1},{i:-2,j:1},{i:-2,j:-1},
      {i:1,j:2},{i:1,j:-2},{i:-1,j:2},{i:-1,j:-2}];
  }
  canMove(to){
    if (!this.board.isOnBoard(this.board.reverseTrans(to))) return false;
    if (this.board.isOpponentPiece(this.position,this.board.reverseTrans(to))) return true;
    if (this.board.isFreeCell(this.board.reverseTrans(to))) return true;
    return false;
  }

  getMoves(){
    //if ( this.board.isFreeCell(this.position)) return '';

    var coor = this.board.transform(this.position);
    var lm = [];
    var newCoor ={};

    for(var k = 0; k < this.moves.length; k++){       
        newCoor.i = coor.i+this.moves[k].i;    
        newCoor.j = coor.j+this.moves[k].j;  
        if (this.canMove(newCoor)){
          lm.push(this.board.reverseTrans(newCoor));
        }
      }
      return lm;

  }
}

class Bishop extends Piece {
  constructor(board,color, position) {
    super(board,color, position);

  }

  move (to) {
    //а єсть лі ту в гетМувс?
    //рєтурн тру
    //переставляєм
  }
  canMove (direction) {
    console.log(this.position + 'thisposition');
    console.log(direction + ' direc1')
    var direction = this.board.reverseTrans(direction);
    console.log(direction + ' direc2')
    if (this.board.isOnBoard(direction)) {
      if (this.board.isFreeCell(direction)) {
        return true;
      }
      else if (this.board.isOpponentPiece(this.position, direction)) {
        return true;
      }
    }
    return false;
  }

  getMoves () {
    var coordinates = this.board.transform(this.position);
    var straightRight = {};
    var straightLeft = {};
    var downRight = {};
    var downLeft = {};
    var i = 1;
    var j = 1;
    var k = 1;
    var l = 1;
    straightRight.j = coordinates.j+1;
    straightRight.i = coordinates.i+1;
    straightLeft.j = coordinates.j-1;
    straightLeft.i = coordinates.i+1;
    downRight.j = coordinates.j+1;
    downRight.i = coordinates.i-1;
    downLeft.j = coordinates.j-1;
    downLeft.i = coordinates.i-1;
    var possibleMoves = [];
    while (this.canMove(straightRight)) {
      straightR= this.board.reverseTrans(straightRight);
      possibleMoves.push(straightR);
      i++;
      straightRight.j = coordinates.j+i;
      straightRight.i = coordinates.i+i;
    }
    while (this.canMove(straightLeft)) {
      straightL = this.board.reverseTrans(straightLeft);
      possibleMoves.push(straightL);
      j++;
      straightLeft.j = coordinates.j-j;
      straightLeft.i = coordinates.i+j;
    }
    while (this.canMove(downRight)) {
      downR = this.board.reverseTrans(downRight);
      possibleMoves.push(downR);
      k++;
      downRight.j = coordinates.j+k;
      downRight.i = coordinates.i-k;
    }
    while (this.canMove(downLeft)) {
      downL = this.board.reverseTrans(downLeft);
      possibleMoves.push(downL);
      l++;
      downLeft.j = coordinates.j-l;
      downLeft.i = coordinates.i-l;
    }
    return possibleMoves;
  }
}

class Queen extends Piece {
  constructor(board,color, position) {
    super(board,color, position)
  }
  move (to) {
    //а єсть лі ту в гетМувс?
    //рєтурн тру
    //переставляєм
  }
  canMove (direction) {
    var direction = this.board.reverseTrans(direction);
    if (this.board.isOnBoard(direction)) {
      if (this.board.isFreeCell(direction)) {
        return true;
      }
      else if (isOpponentPiece(this.position,direction)) {
        return true;
      }
    }
    return false;
  }

  getMoves () {
    var cordinates = this.board.transform(this.position);
    var straightRight = {};
    var straightLeft = {};
    var downRight = {};
    var downLeft = {};
    var straight = {};
    var left = {};
    var right = {};
    var down = {};
    var i = 1;
    var j = 1;
    var k = 1;
    var l = 1;
    var o = 1;
    var p = 1;
    var r = 1;
    var s = 1;
    straightRight.j = coordinates.j+1;
    straightRight.i = coordinates.i+1;
    straightLeft.j = coordinates.j-1;
    straightLeft.i = coordinates.i+1;
    downRight.j = coordinates.j+1;
    downRight.i = coordinates.i-1;
    downLeft.j = coordinates.j-1;
    downLeft.i = coordinates.i-1;
    straight.j = coordinates.j;
    straight.i = coordinates.i+1;
    left.j = coordinates.j-1;
    left.i = coordinates.i;
    right.j = coordinates.j+1;
    right.i = coordinates.i;
    down.j = coordinates.j;
    down.i = coordinates.i-1;
    possibleMoves = [];
    while (this.canMove(straight)) {
      var str = this.board.reverseTrans(straight);
      possibleMoves.push(str);
      o++;
      straight.j = coordinates.j;
      straight.i = coordinates.i+o;
    }
    while (this.canMove(left)) {
      var lf = this.board.reverseTrans(left);
      possibleMoves.push(lf);
      p++;
      left.j = coordinates.j-p;
      left.i = coordinates.i;
    }
    while (this.canMove(straight)) {
      var ri = this.board.reverseTrans(right);
      possibleMoves.push(ri);
      r++;
      right.j = coordinates.j+r;
      right.i = coordinates.i;
    }
    while (this.canMove(down)) {
      var dow = this.board.reverseTrans(down);
      possibleMoves.push(dow);
      s++;
      down.j = coordinates.j;
      down.i = coordinates.i-1;
    }
    while (this.canMove(straightRight)) {
      var straightR = this.board.reverseTrans(straightRight);
      possibleMoves.push(straightR);
      i++;
      straightRight.j = coordinates.j+i;
      straightRight.i = coordinates.i+i;
    }
    while (this.canMove(straightLeft)) {
      var straightL = this.board.reverseTrans(straightLeft);
      possibleMoves.push(straightL);
      j++;
      straightLeft.j = coordinates.j-j;
      straightLeft.i = coordinates.i+j;
    }
    while (this.canMove(downRight)) {
      var downR = this.board.reverseTrans(downRight);
      possibleMoves.push(downR);
      k++;
      downRight.j = coordinates.j+k;
      downRight.i = coordinates.i-k;
    }
    while (this.canMove(downLeft)) {
      var downL = this.board.reverseTrans(downLeft);
      possibleMoves.push(downL);
      l++;
      downLeft.j = coordinates.j-l;
      downLeft.i = coordinates.i-l;
    }
    return possibleMoves;
  }
}

class King extends Piece {
  constructor(board,color, position) {
    super(color, position)
  }
}

class Pawn extends Piece {
  constructor(board,color, position) {
    super(board,color, position)
  }

  canMove(straight,to){
    if(straight){
       if (this.board.isOnBoard(this.board.reverseTrans(to)) && 
        this.board.isFreeCell(this.board.reverseTrans(to))  ) 
          return true;
        else
          return false;
    }
    else{
      if (!this.board.isOnBoard(this.board.reverseTrans(to))) return false;
      if (this.board.isOpponentPiece(this.position,this.board.reverseTrans(to))) return true;
    }
    return false;

  }
  getMoves(){
    //if ( this.board.isFreeCell(this.position)) return '';

    var coor = this.board.transform(this.position);
    var direction;
    var start;
    if (this.color == 'white'){
      direction = -1;
      start = 6;
    }
    else{
      direction = 1;
      start = 1; 
    }


    var lm = [];
    var newCoor ={};
    
    newCoor.i = coor.i + direction;    
    newCoor.j = coor.j; 
    if (this.canMove(true,newCoor)){
        lm.push(this.board.reverseTrans(newCoor));
        if(coor.i == start){
          newCoor.i += direction;  
           if (this.canMove(true,newCoor)){
            lm.push(this.board.reverseTrans(newCoor));
          }
        }
    }    

  

    newCoor.i = coor.i + direction;    
    newCoor.j = coor.j-1; 
    if (this.canMove(false,newCoor)){
        lm.push(this.board.reverseTrans(newCoor));
      }
    newCoor.i = coor.i + direction;    
    newCoor.j = coor.j+1; 
    
    if (this.canMove(false,newCoor)){
        lm.push(this.board.reverseTrans(newCoor));
     }
   
      return lm;

  }
}
class Board {
  constructor(boardInfo) {
    this.boardInfo = boardInfo;
    this.pieces = {'a1':new Rook (this,'white', 'A1'), 'b1':new Knight(this,'white', 'b1'),
    'c1': new Bishop (this,'white', 'C1'), 'd1': new Queen (this,'white', 'D1'),
    'e1': new King (this,'white', 'E1'), 'f1': new Bishop (this,'white', 'F1'),
     'g1': new Knight (this,'white', 'G1'),'h1': new Rook (this,'white', 'H1'),
    'h2': new Pawn (this,'white', 'H2'),'g2': new Pawn (this,'white', 'G2'),
    'f2': new Pawn (this,'white', 'F2'),'e2': new Pawn (this,'white', 'E2'),'d2': new Pawn (this,'white', 'D2'),
    'c2': new Pawn (this,'white', 'C2'), 'b3': new Pawn (this,'white', 'b3'),'a6': new Pawn (this,'white', 'a6'),
    'a7': new Pawn (this,'black', 'A7'), 'b7': new Pawn (this,'black', 'b7'),'c7': new Pawn (this,'black', 'C7'),
    'd7': new Pawn (this,'black', 'D7'), 'e7': new Pawn (this,'black', 'E7'),'f7': new Pawn (this,'black', 'F7'),
    'g7': new Pawn (this,'black', 'G7'),'h7': new Pawn (this,'black', 'H7'),'h8': new Rook (this,'black', 'H8'),
    'g8': new Knight (this,'black', 'G8'),'f8': new Bishop (this,'black', 'F8'),'e8': new King (this,'black', 'E8'),
    'd8': new Queen (this,'black', 'D8'), 'c8': new Bishop (this,'black', 'C8'), 'b8': new Knight (this,'black', 'B8'),
    'a8': new Rook (this,'black', 'A8')}
  }

  move (form, to) {
    this.pieces[form].move(to);
  }
  getMoves (form) {
      return this.pieces[form].getMoves();
    }

  isOnBoard (coord/*e4*/) {
    console.log(coord+' ghgiyuguiyguigh')
    var coords = this.transform(coord);
    if ((coords.i >= 0 && coords.i <= 7)&&(coords.j >= 0 && coords.j <= 7)) {
      return true;
    }
    return false;
  }
  isFreeCell (coord /*e4*/) {
    if (this.pieces[coord] === undefined) {
      return true;
    }
    return false;
  }
  isOpponentPiece (form, to/*e4*/) {
    console.log(form + ' bullshit' );
    console.log(this.pieces[form].color + ' color of smth')
    if (this.isFreeCell(to)) {
      return false;
    }
    else if (this.pieces[form].color === this.pieces[to].color) {
      return false;
    }
    return true;
  }
  //вертає об*єкт i, j

   
  transform (coord) {
    var newCoords = {};
    console.log(coord+' swfszgfszfsrzgf');
    newCoords.i = -(+coord[1] - 8);
    newCoords.j = coord.toLowerCase().charCodeAt(0)-97;
    return newCoords;
  }
  reverseTrans (coord) {
    var newCoords;
    newCoords = String.fromCharCode(coord.j+97) + (8-coord.i);
    return newCoords;
  }
}

var board = new Board();
var test;
var form = 'b7';
test = board.getMoves(form.toLowerCase());
console.log(test);
//Status API Training Shop Blog About
//© 2016 GitHub, Inc. Terms Privacy Security Contact Help