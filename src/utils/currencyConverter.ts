export class CurrencyConverter {
  private static rates: { [currency: string]: number } = {
    'USD': 1.0,
    'EUR': 0.85,
    'GBP': 0.73,
    'JPY': 110.0,
    'AUD': 1.35,
    'CAD': 1.25,
    'CHF': 0.92,
    'CNY': 6.45
  };

  static convert(amount: number, fromCurrency: string, toCurrency: string = 'USD'): number {
    const fromRate = this.rates[fromCurrency] || 1;
    const toRate = this.rates[toCurrency] || 1;
    
    // Convert to USD first, then to target currency
    const usdAmount = amount / fromRate;
    return usdAmount * toRate;
  }

  static getSupportedCurrencies(): string[] {
    return Object.keys(this.rates);
  }

  static getRate(currency: string): number {
    return this.rates[currency] || 1;
  }
}

export class UnitConverter {
  // Weight conversions
  static lbsToKg(lbs: number): number {
    return lbs * 0.453592;
  }

  static kgToLbs(kg: number): number {
    return kg / 0.453592;
  }

  // Volume conversions
  static flOzToMl(flOz: number): number {
    return flOz * 29.5735;
  }

  static mlToFlOz(ml: number): number {
    return ml / 29.5735;
  }

  static flOzToLiters(flOz: number): number {
    return flOz * 0.0295735;
  }

  static litersToFlOz(liters: number): number {
    return liters / 0.0295735;
  }

  static flOzToGallons(flOz: number): number {
    return flOz / 128;
  }

  static gallonsToFlOz(gallons: number): number {
    return gallons * 128;
  }
}