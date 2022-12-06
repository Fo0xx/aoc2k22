import { readFileSync } from "fs";

const lines = readFileSync("./src/day_5/input.txt", { encoding: "utf-8" }) // read day??.txt content
	.replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
	.trimEnd(); // Remove ending whitespace

const [rawStacks, rawMoves] = lines.split("\n\n").map((x) => x.split("\n"));

const parsedStacks = rawStacks.map((line) =>
	[...line].filter((value, index) => index % 4 === 1)
);

const indexes = parsedStacks.pop();

const stacks = {};

for (const line of parsedStacks) {
	for (let i = 0; i < line.length; i++) {
		if (line[i] !== " ") {
			// Add line[i] to the stack indexes[i]
			if (!stacks[indexes[i]]) {
				stacks[indexes[i]] = [];
			}
			stacks[indexes[i]].unshift(line[i]);
		}
	}
}

const moves = [];
for (const move of rawMoves) {
	const match = /move (\d+) from (\d+) to (\d+)/g.exec(move);
	moves.push({
		count: parseInt(match[1]),
		from: parseInt(match[2]),
		to: parseInt(match[3]),
	});
}

export const run = async () => {

	const localStacks = JSON.parse(JSON.stringify(stacks));
  for (const move of moves) {
    for (let i = 0; i < move.count; i++) {
      const crate = localStacks[move.from].pop();
      localStacks[move.to].push(crate);
    }
  }
  console.log(
    indexes
      .map((value) => {
        const stack = localStacks[value];
        return stack[stack.length - 1];
      })
      .join("")
  );
}
