export default class Node {
  Node(col, row, isStart, isEnd, isWall) {
    this.col = col; //x
    this.row = row; //y
    this.isStart = isStart;
    this.isEnd = isEnd;
    this.isWall = isWall;
    this.visted = false;
    this.gScore = Infinity;
    this.fScore = Infinity;
    this.parent = null;
  }

  setWall(b) {
    this.isWall = b;
  }

  setStart(b) {
    this.isStart = b;
  }

  setEnd(b) {
    this.isEnd = b;
  }
}
