import { getUserIds, calculateRevisionDates } from "./common.js";
import assert from "node:assert";
import test from "node:test";

test("User count is correct", () => {
  assert.equal(getUserIds().length, 5);
});

test("Revision dates are calculated correctly", () => {
  const result = calculateRevisionDates("2026-01-01");

  assert.deepEqual(result, [
    { date: "2026-01-08", interval: "1 week" },
    { date: "2026-02-01", interval: "1 month" },
    { date: "2026-04-01", interval: "3 months" },
    { date: "2026-07-01", interval: "6 months" },
    { date: "2027-01-01", interval: "1 year" },
  ]);
});
