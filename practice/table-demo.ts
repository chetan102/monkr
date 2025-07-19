import Table from 'cli-table3';

const table = new Table({
  head: ['Name', 'Age'],
  colWidths: [15, 5],
});

table.push(['Alice', 24], ['Bob', 30]);

console.log(table.toString());
