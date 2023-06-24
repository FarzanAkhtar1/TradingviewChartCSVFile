const getData = async () => {
  const res = await fetch('data.csv');
  const resp = await res.text();
  //   console.log(resp);
  const cdata = resp.split('\n').map((row) => {
    const [time1, time2, open, high, low, close] = row.split(',');
    return {
      time: new Date(`${time1}, ${time2}`).getTime() / 1000,
      open: open * 1,
      high: high * 1,
      low: low * 1,
      close: close * 1,
    };
  });
  return cdata;
  //   console.log(cdata);
};

// getData();

const displayChart = async () => {
  const chartProperties = {
    width: 2140,
    height: 1000,
    timeScale: {
      timeVisible: true,
      secondsVisible: true,
    },
    rightPriceScale: {
      mode: LightweightCharts.PriceScaleMode.Logarithmic,
    }
  };

  const domElement = document.getElementById('tvchart');
  const chart = LightweightCharts.createChart(domElement, chartProperties);
  const candleseries = chart.addCandlestickSeries(
    {
      priceFormat: {
      type: 'price',
      precision: 4,
      minMove: 0.0001,
      }
    }
  );
  const klinedata = await getData();
  candleseries.setData(klinedata);
};

displayChart();