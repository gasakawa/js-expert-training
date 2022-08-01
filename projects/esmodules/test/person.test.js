import mocha from 'mocha';
import chai from 'chai';
import Person from '../src/person.js';

const { describe, it } = mocha;
const { expect } = chai;

describe('Person Tests', () => {
  it('should return a person instance from a string', () => {
    const person = Person.generateInstanceFromString(
      '1 Bike,Car 2000 2020-01-01 2022-01-01',
    );

    const expected = {
      from: '2020-01-01',
      to: '2022-01-01',
      id: '1',
      kmTraveled: '2000',
      vehicles: ['Bike', 'Car'],
    };

    expect(person).to.be.deep.equal(expected);
  });

  it('should format values', () => {
    const person = new Person({
      from: '2020-01-01',
      to: '2022-01-01',
      id: '1',
      kmTraveled: '2000',
      vehicles: ['Bike', 'Car'],
    });
    const result = person.formatted('pt-BR');

    const expected = {
      from: '01 de janeiro de 2020',
      to: '01 de janeiro de 2022',
      id: 1,
      kmTraveled: '2.000 km',
      vehicles: 'Bike e Car',
    };

    expect(result).to.be.deep.equal(expected);
  });

  it('should return an error if data is no valid', () => {
    const expected =
      'O formato de entrada deve ser id [vehicles,*] 10000 yyyy-mm-dd, yyyy-mm-dd';

    try {
      Person.generateInstanceFromString('1 Bike');
    } catch (err) {
      console.log(err.message);
      expect(err.message).to.be.equals(expected);
    }
  });
});
