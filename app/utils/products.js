function generatePriceTimeline(sources) {
  // Helper function to normalize the date by removing the time part
  function normalizeDate(date) {
    // Handle both string and Date objects
    if (typeof date === 'string') {
      return date.split('T')[0];
    }
    return date.toISOString().split('T')[0];
  }

  function createPriceLookup(timeline) {
    return timeline.reduce((lookup, { date, price }) => {
      const normalizedDate = normalizeDate(date);
      lookup[normalizedDate] = price;
      return lookup;
    }, {});
  }

  // Collect all prices from all sources
  const priceLookups = sources.map((source) =>
    createPriceLookup(source.timeline)
  );

  // Get all unique dates across all sources
  const allDates = new Set();
  sources.forEach((source) => {
    source.timeline.forEach((item) => {
      allDates.add(normalizeDate(item.date));
    });
  });

  // Convert Set of dates to an array and sort them
  const sortedDates = Array.from(allDates).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  // Build the final result with the normalized dates and prices from each source
  const result = sortedDates.map((date) => {
    const priceData = { date };

    sources.forEach((source, index) => {
      const sourceName = source.shopId.name;
      const sourcePrices = priceLookups[index];
      priceData[sourceName] = sourcePrices[date] || null;
    });

    return priceData;
  });

  return result;
}

export { generatePriceTimeline };