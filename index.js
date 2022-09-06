const gameboard = (() => {
  const node = (a, distance = null, pre = null) => {
    const moves = [];
    function addMove(m) {
      moves.push(m);
    }
    function getMoves() {
      return moves;
    }
  
    return { coord: a, addMove, getMoves, moves, distance, pre };
  };
  
  function buildLevels(root, count = 1) {
    count -= 1;
    root.getMoves().forEach(e => {
      const moves = possMoves(e.coord);
      moves.forEach(move => {
        e.addMove(node(move, e.distance + 1, e));
      })
      if (count > 0) buildLevels(e, count);
    }); 
  }
  
  function buildRoot(a) {
    const root = node(a);
    const moves = possMoves(a);
    moves.forEach(e => {
      root.addMove(node(e, 1, root));
    });
    return root;
  }
  
  function possMoves(a) {
    const [x, y] = a;
    const arr = [
      [x + 2, y + 1],
      [x + 2, y - 1],
      [x - 2, y + 1],
      [x - 2, y - 1],
      [x + 1, y + 2],
      [x + 1, y - 2],
      [x - 1, y + 2],
      [x - 1, y - 2], 
    ]
    const fArr = arr.filter(moveValid);
    return fArr;
  }
  
  function moveValid(a) {
    const [x, y] = a;
    if (x < 0 || x > 7) return false;
    if (y < 0 || y > 7) return false;
    return true;
  }

  return { buildRoot, buildLevels };
})();

const knight = (() => {
  let root;

  function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
  }

  function bfs(coord) {
    let queue = [];
    queue.push(root);
    while (queue.length > 0) {
      const cur = queue.shift();
      if (arrayEquals(cur.coord, coord)) {
        return cur;
      }
      cur.getMoves().forEach(e => queue.push(e));
    }
  }

  function getPath(node) {
    const arr = [];
    let tmp = node;
    while (tmp.pre) {
      arr.push(tmp.coord);
      tmp = tmp.pre;
    }
    return arr.reverse();
  }

  function knightMoves(a, b) {
    root = gameboard.buildRoot(a);
    gameboard.buildLevels(root, 5);
    const node = bfs(b);
    const path = getPath(node);
    const pathStr = path.join('\n');
    const msg = 
      `You made it in ${path.length} moves! Here's your path:\n${a}\n${pathStr}`;
    console.log(msg);
  }

  return { knightMoves };
})();

knight.knightMoves([0,0], [1, 2]);
knight.knightMoves([3,3], [7, 6]);
knight.knightMoves([0,0], [7, 7]);
