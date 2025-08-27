import {
  getSectorAllocations,
  getPortfolioSummary,
  holdingsData,
} from "./mockData";

describe("getSectorAllocations", () => {
  it("returns correct sector allocation percentages and values", () => {
    const allocations = getSectorAllocations();
    const total = holdingsData.reduce((sum, h) => sum + h.currentValue, 0);

    allocations.forEach(({ name, value, percentage }) => {
      const expectedValue = holdingsData
        .filter((h) => h.sector === name)
        .reduce((sum, h) => sum + h.currentValue, 0);
      expect(value).toBe(expectedValue);
      expect(percentage).toBeCloseTo((expectedValue / total) * 100, 5);
    });

    const percentSum = allocations.reduce((sum, a) => sum + a.percentage, 0);
    expect(percentSum).toBeCloseTo(100, 2);
  });
});

describe("getPortfolioSummary", () => {
  it("returns correct portfolio summary metrics", () => {
    const summary = getPortfolioSummary();
    const currentValue = holdingsData.reduce(
      (sum, h) => sum + h.currentValue,
      0
    );
    const totalCost = holdingsData.reduce(
      (sum, h) => sum + h.shares * h.avgCostBasis,
      0
    );
    const totalReturn = currentValue - totalCost;
    const totalReturnPercent = (totalReturn / totalCost) * 100;
    const dayChange = holdingsData.reduce(
      (sum, h) => sum + h.dayChange * h.shares,
      0
    );
    const dayChangePercent = (dayChange / currentValue) * 100;
    expect(summary.currentValue).toBe(currentValue);
    expect(summary.totalCost).toBe(totalCost);
    expect(summary.totalReturn).toBe(totalReturn);
    expect(summary.totalReturnPercent).toBeCloseTo(totalReturnPercent, 5);
    expect(summary.dayChange).toBeCloseTo(dayChange, 5);
    expect(summary.dayChangePercent).toBeCloseTo(dayChangePercent, 5);
  });
});
