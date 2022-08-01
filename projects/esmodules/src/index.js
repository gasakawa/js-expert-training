import database from '../database.json' assert { type: 'json' };
import Person from './person.js';
import TerminalController from './terminal-controller.js';

const DEFAULT_LANG = 'pt-BR';
const STOP_TERM = ':q';

const terminalController = new TerminalController();
terminalController.initializeTerminal(database, DEFAULT_LANG);

async function mainLoop() {
  try {
    const answer = await terminalController.question();

    if (answer === STOP_TERM) {
      terminalController.closeTerminal();
      console.log('process finished!');
      return;
    }
    const person = Person.generateInstanceFromString(answer);

    return mainLoop();
  } catch (error) {
    console.error(error.message);
    return mainLoop();
  }
}

await mainLoop();
