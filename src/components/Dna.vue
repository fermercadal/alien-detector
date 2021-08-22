<template>
  <div class="dnaTable" v-if="dnaSample" data-table>
    <div
      class="dnaRow"
      v-for="(row, index) in dnaSample"
      :key="index"
      :data-row="index"
    >
      <input
        type="text"
        v-for="(cell, index) in row"
        :key="index"
        :value="cell"
        maxlength="1"
        :data-cell="index"
        data-active="false"
      />
    </div>
  </div>

  <button class="testButton" @click="handleTest()">Test DNA</button>

  <div class="testResults" v-if="!this.pristine">
    <h2>Result:</h2>
    <p v-if="this.testPositive">Alien DNA detected!</p>
    <p v-if="!this.testPositive && !this.pristine">Human DNA</p>

    <ul>
      <li v-if="this.testResults.diagonal">Diagonal Chain: positive</li>
      <li v-if="this.testResults.diagonalInv">Inv Diagonal Chain: positive</li>
      <li v-if="this.testResults.horizontal">Horizontal Chain: positive</li>
      <li v-if="this.testResults.vertical">Vertical Chain: positive</li>
    </ul>
  </div>
</template>

<script>
const testHorizontal = (y, x) => {
  return y[x] === y[x + 1] && y[x] === y[x + 2] && y[x] === y[x + 3];
};

const testVertical = (dna, { x, y }) => {
  return (
    dna[y][x] === dna[y + 1][x] &&
    dna[y][x] === dna[y + 2][x] &&
    dna[y][x] === dna[y + 3][x]
  );
};

const testDiagonal = (dna, { x, y }) => {
  return (
    dna[y][x] === dna[y + 1][x + 1] &&
    dna[y][x] === dna[y + 2][x + 2] &&
    dna[y][x] === dna[y + 3][x + 3]
  );
};

const testDiagonalInv = (dna, { x, y }) => {
  return (
    dna[y][x] === dna[y - 1][x + 1] &&
    dna[y][x] === dna[y - 2][x + 2] &&
    dna[y][x] === dna[y - 3][x + 3]
  );
};

const displayUpdate = (cell, type) => {
  const dnaTable = document.querySelector("[data-table]");
  const rows = dnaTable.querySelectorAll("[data-row]");

  if (type === "horizontal") {
    rows.forEach((row) => {
      if (cell.row == row.getAttribute("data-row")) {
        const cells = row.querySelectorAll("[data-cell]");

        cells[cell.cell].setAttribute("data-active", true);
        cells[cell.cell + 1].setAttribute("data-active", true);
        cells[cell.cell + 2].setAttribute("data-active", true);
        cells[cell.cell + 3].setAttribute("data-active", true);
      }
    });
  }

  if (type === "vertical") {
    rows.forEach((row) => {
      if (cell.row == row.getAttribute("data-row")) {
        const cellsA = rows[cell.row].querySelectorAll("[data-cell]");
        cellsA[cell.cell].setAttribute("data-active", true);

        const cellsB = rows[cell.row + 1].querySelectorAll("[data-cell]");
        cellsB[cell.cell].setAttribute("data-active", true);

        const cellsC = rows[cell.row + 2].querySelectorAll("[data-cell]");
        cellsC[cell.cell].setAttribute("data-active", true);

        const cellsD = rows[cell.row + 3].querySelectorAll("[data-cell]");
        cellsD[cell.cell].setAttribute("data-active", true);
      }
    });
  }

  if (type === "diagonal") {
    rows.forEach((row) => {
      if (cell.row == row.getAttribute("data-row")) {
        const cellsA = rows[cell.row].querySelectorAll("[data-cell]");
        cellsA[cell.cell].setAttribute("data-active", true);

        const cellsB = rows[cell.row + 1].querySelectorAll("[data-cell]");
        cellsB[cell.cell + 1].setAttribute("data-active", true);

        const cellsC = rows[cell.row + 2].querySelectorAll("[data-cell]");
        cellsC[cell.cell + 2].setAttribute("data-active", true);

        const cellsD = rows[cell.row + 3].querySelectorAll("[data-cell]");
        cellsD[cell.cell + 3].setAttribute("data-active", true);
      }
    });
  }

  if (type === "diagonalInv") {
    rows.forEach((row) => {
      if (cell.row == row.getAttribute("data-row")) {
        const cellsA = rows[cell.row].querySelectorAll("[data-cell]");
        cellsA[cell.cell].setAttribute("data-active", true);

        const cellsB = rows[cell.row - 1].querySelectorAll("[data-cell]");
        cellsB[cell.cell + 1].setAttribute("data-active", true);

        const cellsC = rows[cell.row - 2].querySelectorAll("[data-cell]");
        cellsC[cell.cell + 2].setAttribute("data-active", true);

        const cellsD = rows[cell.row - 3].querySelectorAll("[data-cell]");
        cellsD[cell.cell + 3].setAttribute("data-active", true);
      }
    });
  }
};

export default {
  name: "Dna",
  data() {
    return {
      dnaSample: ["QWERTY", "UIOPAS", "DFGHJK", "LZXCVB", "NM1234", "567890"],
      testResults: {
        diagonal: false,
        diagonalInv: false,
        horizontal: false,
        vertical: false,
      },
      pristine: true,
    };
  },
  computed: {
    testPositive() {
      const tests = Object.keys(this.testResults);
      let results = 0;

      tests.forEach((test) => {
        if (this.testResults[test]) {
          results++;
        }
      });

      return results >= 2;
    },
  },
  methods: {
    updateDnaSample() {
      const dnaTable = document.querySelector("[data-table]");
      let newSample = [];

      const rows = dnaTable.querySelectorAll("[data-row]");
      rows.forEach((row) => {
        let updatedRow = "";
        const cells = row.querySelectorAll("[data-cell");
        cells.forEach((cell) => {
          updatedRow = `${updatedRow}${cell.value.toUpperCase()}`;
        });

        newSample.push(updatedRow);
      });

      return newSample;
    },
    testDna(dna) {
      let diagonal = false;
      let diagonalInv = false;
      let horizontal = false;
      let vertical = false;

      dna.forEach(function (row, indexY) {
        Array.from(row).forEach(function (char, indexX) {
          if (indexX <= 2 && testHorizontal(row, indexX)) {
            displayUpdate(
              {
                row: indexY,
                cell: indexX,
              },
              "horizontal"
            );
            horizontal = true;
          }
          if (indexY <= 2 && testVertical(dna, { x: indexX, y: indexY })) {
            displayUpdate(
              {
                row: indexY,
                cell: indexX,
              },
              "vertical"
            );
            vertical = true;
          }
          if (
            indexY <= 2 &&
            indexX <= 2 &&
            testDiagonal(dna, { x: indexX, y: indexY })
          ) {
            displayUpdate(
              {
                row: indexY,
                cell: indexX,
              },
              "diagonal"
            );
            diagonal = true;
          }
          if (
            indexY > 2 &&
            indexX <= 2 &&
            testDiagonalInv(dna, { x: indexX, y: indexY })
          ) {
            displayUpdate(
              {
                row: indexY,
                cell: indexX,
              },
              "diagonalInv"
            );
            diagonalInv = true;
          }
        });
      });

      this.testResults.diagonal = diagonal;
      this.testResults.diagonalInv = diagonalInv;
      this.testResults.horizontal = horizontal;
      this.testResults.vertical = vertical;
    },
    handleTest() {
      this.pristine = false;
      this.dnaSample = this.updateDnaSample();
      this.testDna(Array.from(this.dnaSample));
    },
  },
};
</script>

<style lang="scss">
.dnaTable {
  background: white;
  display: flex;
  flex-flow: column nowrap;
  height: 400px;
  width: 400px;

  .dnaRow {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    height: calc(100% / 6);
    margin-left: -4px;
    margin-right: -4px;

    input {
      background-color: #f1f1f1;
      border: 0;
      border-radius: 4px;
      color: #22577a;
      display: inline-block;
      font-family: "Signika", Helvetica, Arial, sans-serif;
      font-size: 1.4em;
      margin: 4px;
      outline-color: #22577a;
      text-align: center;
      text-transform: uppercase;
      width: calc(100% / 6);
    }

    input[data-active="true"] {
      background: #57cc99;
      color: #fefefe;
    }
  }
}

.testButton {
  background-color: #22577a;
  border: 0;
  color: #fefefe;
  cursor: pointer;
  font-family: "Signika", Helvetica, Arial, sans-serif;
  font-size: 1.3em;
  font-weight: 500;
  margin: 1.5em 0;
  padding: 0.5em 1em;
}

.testResults {
  background-color: #c7f9cc;
  box-sizing: border-box;
  color: #22577a;
  padding: 1em;
  width: 400px;

  h2 {
    display: inline;
    font-family: "Signika", Helvetica, Arial, sans-serif;
    font-size: 1.1em;
    font-weight: 500;
    margin: 0 0.5em 0.5em 0;
  }

  p {
    font-size: 1.2em;
    display: inline;
    margin-bottom: 0;
  }

  ul {
    margin: 1em 0 0 0;
    padding: 0;
    list-style-position: inside;
  }
}
</style>
