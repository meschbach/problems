const exampleInput = [
	[0,0,0,0,1,1,0],
	[0,0,0,1,0,0,0],
	[1,1,0,0,0,0,0],
	[1,0,0,0,1,1,1],
];

function extractMatrixValue(matrix,row,column) {
	const rows = matrix.length;
	const columns = matrix[0].length;

	if( row < 0 || row >= rows ){ return 1; }
	if( column < 0 || column >= columns ){ return 1; }
	return matrix[row][column];
}

function columnIterator(matrix,row,column){
	const current = () => extractMatrixValue(matrix,row,column);
 	return {
		current,
		next: function (){
			column++;
			return current();
		},
	    clone: function (){
			return columnIterator(matrix,row, column);
	    },
	    previous: function (){
			column--;
			return current();
	    }
	};
}

function rowIterator(matrix, row, column){
	const current = () => extractMatrixValue(matrix,row,column);
	return {
		current,
		next: function (){
			row++;
			return current();
		},
		clone: function (){
			return rowIterator(matrix,row,column);
		},
		previous: function (){
			row--;
			return current();
		}
	};
}

function startsWordInDirection(it){
	if( it.current() !== 0 ){ return false; }
	if( it.clone().previous() != 1 ){ return false; }
	if( it.next() != 0 ){ return false; }
	return true;
}

function cellStartsWord(matrix,row,column){
	const colIt = columnIterator(matrix,row,column);
	if( startsWordInDirection(colIt.clone())) return true;
	const rowIt = rowIterator(matrix, row, column );
	if( startsWordInDirection(rowIt.clone())) return true;
	return false;
}

function numberCrossWordPuzzle(grid){
	//setup output
	const output = [];
	const rows = grid.length;
	const columns = grid[0].length;
	for( let i = 0; i < rows; i++){
		output.push(Array(columns));
	}

	let wordIndex = 1;
	for( let r = 0; r < rows; r++){
		for( let c = 0; c < columns; c++){
			const value = cellStartsWord(grid,r,c) ? wordIndex++ : 0;
			output[r][c] = value;
		}
	}
	return output;
}

const input1 = [[0,0,0]];
renderCrossWordMatrix(input1);

const input2 = [[0,0,1,0]];
renderCrossWordMatrix(input2);

const input3 = [[0,0,0,1,0,0]];
renderCrossWordMatrix(input3);

function newMatrix(rows, columns) {
	const output = [];
	for( let i = 0; i < rows; i++){
		output.push(Array(columns));
	}
	return output;
}

function transposeMatrix(input){
	const newColumnCount = input.length;
	const newRowCount = input[0].length;

	const output = newMatrix(newRowCount,newColumnCount);
	for( let r = 0; r < input.length; r++){
		for( let c = 0; c < input[0].length; c++){
			output[c][r] = input[r][c];
		}
	}
	return output;
}

renderCrossWordMatrix(transposeMatrix(input1));
renderCrossWordMatrix(transposeMatrix(input2));
renderCrossWordMatrix(transposeMatrix(input3));

const matrixInput = [
	[1,0,0,0,],
	[0,1,0,0,],
	[0,0,0,1,]
];
renderCrossWordMatrix(matrixInput);

function renderCrossWordMatrix(mask){
	const numbered = numberCrossWordPuzzle(mask);
	for( let r = 0; r < mask.length; r++){
		for( let c = 0; c < mask[0].length; c++){
			let output;
			if(mask[r][c] === 1) {
				output = "X";
			}else {
				output = numbered[r][c];
			}
			process.stdout.write(" " + output + " ");
		}
		process.stdout.write("\n");
	}
	process.stdout.write("\n");
}
