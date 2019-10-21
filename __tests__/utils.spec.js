const { addPriceToData, processData, monthSum, cleanStockMarket } = require('../src/utils');


describe('Test utils functions', () => {
  const arrayInput = [
        {
        '2019-04-01 0:00:00': '2019-05-01 0:00:00',
        '0,05': '297,45',
        '86,62': '43,05',
        '0,00': '1,00',
        '49923,70': '51225,60'
      },
      {
        '2019-04-01 0:00:00': '2019-06-01 0:01:00',
        '0,05': '300,08',
        '86,62': '102,26',
        '0,00': '1,00',
        '49923,70': '51225,60'
    },
    {
      '2019-04-01 0:00:00': '2019-05-01 0:02:00',
        '0,05': '307,42',
        '86,62': '105,66',
        '0,00': '1,00',
        '49923,70': '51225,60'
    },
    {
      '2019-04-01 0:00:00': '2019-06-01 0:02:00',
        '0,05': '307,42',
        '86,62': '111,66',
        '0,00': '1,00',
        '49923,70': '51225,60'
    },
    {
      '2019-04-01 0:00:00': '2019-06-01 0:02:00',
        '0,05': '308,02',
        '86,62': '1871,66',
        '0,00': '1,00',
        '49923,70': '51225,60'
    }
    ];

    const stockMarket = [
      { 'Delivery day': '03.06.2019',
      Hours: 'H16',
      'Prices (EUR/MWh)': '39.86' },
    { 'Delivery day': '03.06.2019',
      Hours: 'H17',
      'Prices (EUR/MWh)': '40.44' },
    { 'Delivery day': '03.06.2019',
      Hours: 'H18',
      'Prices (EUR/MWh)': '42.97' },
    { 'Delivery day': '03.06.2019',
      Hours: 'H19',
      'Prices (EUR/MWh)': '47.56' },
    { 'Delivery day': '03.06.2019',
      Hours: 'H20',
      'Prices (EUR/MWh)': '51.48' },
    { 'Delivery day': '03.06.2019',
      Hours: 'H21',
      'Prices (EUR/MWh)': '56.54' },
      { 'Delivery day': '05.06.2019',
        Hours: 'H21',
        'Prices (EUR/MWh)': '56.54' }
    ]
    const cleanDataWithPrice = addPriceToData(arrayInput);
    const processedData = processData(cleanDataWithPrice);
    const monthSumData = monthSum(processedData);
    const stockMarketPrice = cleanStockMarket(stockMarket);
  test('addPriceToData should return array of object with right properties and price', () => {
    // the return array should have the same legth as the inout array
    expect(cleanDataWithPrice.length).toBe(5);
    // check the array elements attribute
    expect(Object.keys(cleanDataWithPrice[0])[0]).toBe('date');
    expect(Object.keys(cleanDataWithPrice[1])[1]).toBe('mw');
    expect(Object.keys(cleanDataWithPrice[1])[2]).toBe('igv');
    expect(Object.keys(cleanDataWithPrice[2])[3]).toBe('flameOn');
    expect(Object.keys(cleanDataWithPrice[1])[4]).toBe('eoh');
    expect(Object.keys(cleanDataWithPrice[2])[5]).toBe('price');
    expect(Object.keys(cleanDataWithPrice[0])[6]).toBe('position');
    // checke the right price
    expect(cleanDataWithPrice[0]['price']).toBe(0);
    expect(cleanDataWithPrice[1]['price']).toBe(0.42);
    expect(cleanDataWithPrice[2]['price']).toBe(1.25);
    expect(cleanDataWithPrice[3]['price']).toBe(2.08);
    // the values should be the same
    expect(cleanDataWithPrice[0]['mw']).toBe(297.45);
    expect(cleanDataWithPrice[1]['igv']).toBe(102.26);
  });

  test('processData should return array of object by date', () => {
    expect(processedData.length).toBe(2);
    expect(processedData[0]['date']).toBe('2019-05-01');
    expect(processedData[1]['date']).toBe('2019-06-01');
  });
  test('processData should return the sum of price and mw by date and category', () => {
    expect(processedData[1]['mw']).toBe(915.52);
    expect(processedData[1]['price']).toBe(4.58);
    expect(processedData[1]['max']).toBe(615.44);
  });

  test('monthSum should return the sum of price and mw by month', () => {
    expect(monthSumData['mw']).toBe('1520.39');
    expect(monthSumData['price']).toBe('5.83');
  });

  test('cleanStockMarket should return the price of stock market by days', () => {
    expect(stockMarketPrice[0]['date']).toBe('2019-06-03');
    expect(stockMarketPrice[0]['price']).toBe(278.85);
  });
})
