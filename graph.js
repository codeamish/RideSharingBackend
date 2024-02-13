const adj = [
    [[1,10],[4,5]], // A --B,E
    [[0,10],[5,1],[3,8]], // B --A,F,D
    [[7,3],[5,3]], // C --F,H
    [[1,8],[4,2],[7,10]], // D --B,E,H
    [[0,5],[3,2]], // E --A,D
    [[1,1],[2,3],[6,4]], // F --B,C,G
    [[5,4],[7,4]], // G --F,H
    [[2,3],[3,10],[6,4]] // H --C,D,G 
]

export default adj; // export adjacency list