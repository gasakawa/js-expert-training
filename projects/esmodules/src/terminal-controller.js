import readline from 'readline';
import chalk from 'chalk';
import DrafLog from 'draftlog';
import chalkTable from 'chalk-table';

import Person from './person.js';

export default class TerminalController {
  constructor() {
    this.print = {};
    this.data = {};
    this.terminal = {};
  }

  initializeTerminal(database, language) {
    DrafLog(console).addLineListener(process.stdin);
    this.terminal = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.initializeTable(database, language);
  }

  initializeTable(database, language) {
    const data = database.map(item => new Person(item).formatted(language));
    const table = chalkTable(this.getTableOptions(), data);
    this.print = console.draft(table);
    this.data = data;
  }

  question(msg = '') {
    return new Promise(resolve => this.terminal.question(msg, resolve));
  }

  closeTerminal() {
    this.terminal.close();
  }

  getTableOptions() {
    return {
      leftPad: 2,
      columns: [
        { field: 'id', name: chalk.cyan('ID') },
        { field: 'vehicles', name: chalk.magenta('VEHICLES') },
        { field: 'kmTraveled', name: chalk.cyan('KM TRAVELED') },
        { field: 'from', name: chalk.cyan('FROM') },
        { field: 'to', name: chalk.cyan('TO') },
      ],
    };
  }
}
