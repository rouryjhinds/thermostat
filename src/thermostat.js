'use strict';

class Thermostat {
  constructor() {
    this.DEFAULT_TEMP = 20;
    this.temperature = this.DEFAULT_TEMP;
    this.MINIMUM_TEMP = 10;
    this.MAX_TEMP_POWERSAVING = 25;
    this.powerSavingMode = true;
    this.MAX_TEMP = 32;
  } 

  getCurrentTemp() {
    return this.temperature;
  }

  isMinimumTemp() {
    this.temperature === this.MINIMUM_TEMP;
  }

  up(temp) {
    this.temperature += temp;
    if (this.powerSavingMode === true && this.temperature > this.MAX_TEMP_POWERSAVING) {
      throw new Error('cannot exceed 25 degrees in power saving mode!')
    }
    if (this.powerSavingMode === false && this.temperature > this.MAX_TEMP) {
      throw new Error('cannot exceed 32 degrees!')
    }
    return this.temperature;
  }

  isPowerSavingModeOn() {
    return this.powerSavingMode === true;
  }
  
  powerSavingModeOff() {
    return this.powerSavingMode = false;
  }
  powerSavingModeOn() {
    return this.powerSavingMode = true;
  }

  down(temp) {
    this.temperature -= temp;
    if (this.temperature < this.MINIMUM_TEMP) {
      throw new Error('cannot go below 10 degrees!')
    }
    return this.temperature;
  }

  reset() {
    this.temperature = this.DEFAULT_TEMP; 
  }

  energyUsage() {
    if (this.temperature < 18) {
      return "low-usage";
    }
    if (this.temperature >= 18 && this.temperature <= 25) {
      return "medium-usage";
    }
    return "high-usage";
  }
}