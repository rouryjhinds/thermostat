'use strict';

describe('Thermostat', function() {
  let thermostat;

  beforeEach(function () {
    thermostat = new Thermostat();
  });

  it('default temp is 20 degrees', function() {
    expect(thermostat.getCurrentTemp()).toEqual(20);
  });

  it('can increase the temperature', function() {
    thermostat.up(1);
    expect(thermostat.getCurrentTemp()).toEqual(21);
  });

  it('can decrease the temperature', function() {
    thermostat.down(1);
    expect(thermostat.getCurrentTemp()).toEqual(19);
  });

  it('minimum temperature is 10 degrees', function() {
    expect(function() {thermostat.down(11)}).toThrow(new Error ('cannot go below 10 degrees!'));
  });

  it('maximum temp is 25 degrees in power saving mode', function() {
    expect(function() {thermostat.up(6)}).toThrow(new Error ('cannot exceed 25 degrees in power saving mode!'));
  });

  it('maximum temp is 32 degrees when power saving mode is off', function() {
    thermostat.powerSavingModeOff();
    expect(function() {thermostat.up(15)}).toThrow(new Error ('cannot exceed 32 degrees!'));
  });

  it("power saving mode is on by default but it can also be turned off", function() {
    thermostat.powerSavingModeOff();
    expect(thermostat.powerSavingMode).toBe(false);
  });

  it("can turn power saving mode back on", function() {
    thermostat.powerSavingModeOff();
    thermostat.powerSavingModeOn();
    expect(thermostat.powerSavingMode).toBe(true);
  });

  it("can reset the temperature to 20 with a reset function", function() {
    thermostat.up(1);
    thermostat.reset();
    expect(thermostat.getCurrentTemp()).toEqual(20);
  });

  describe('energy usage, temps...', function() {

    it('below 18 degrees return low-usage', function() {
      thermostat.down(3);
      expect(thermostat.energyUsage()).toEqual("low-usage");
    });
    it('below or equal to 25 degrees return medium-usage', function() {
      thermostat.down(2);
      expect(thermostat.energyUsage()).toEqual("medium-usage");
    });
    it('below or equal to 25 degrees return medium-usage', function() {
      thermostat.up(4);
      expect(thermostat.energyUsage()).toEqual("medium-usage");
    });
    it('above 25 degrees return high-usage', function() {
      thermostat.powerSavingModeOff();
      thermostat.up(10);
      expect(thermostat.energyUsage()).toEqual("high-usage");
    });
  });

});