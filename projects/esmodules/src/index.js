import DrafLog from 'draftlog';
import chalk from 'chalk';
import chalkTable from 'chalk-table';
import readline from 'readline';

import database from '../database.json' assert { type: 'json' };
import Person from './person.js';

DrafLog(console).addLineListener(process.stdin);

const options = {
  leftPad: 2,
  columns: [
    { field: 'id', name: chalk.cyan('ID') },
    { field: 'vehicles', name: chalk.magenta('VEHICLES') },
    { field: 'kmTraveled', name: chalk.cyan('KM TRAVELED') },
    { field: 'from', name: chalk.cyan('FROM') },
    { field: 'to', name: chalk.cyan('TO') },
  ],
};

const table = chalkTable(
  options,
  database.map(item => new Person(item).formatted()),
);
const print = console.draft(table);

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// terminal.question('What is your name?', msg => {
//   console.log('msg', msg.toString());
// });
