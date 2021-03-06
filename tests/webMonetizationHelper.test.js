import {
  startMonetization,
  stopMonetization,
  getPointerFromMetaTag,
  observeMetaTagMutations,
} from "../src/webMonetizationHelper";
import { delay } from "./utils";

const paymentPointer = "$custompaymentpointer";

describe("WebMonetization", () => {
  it("Should start monetization", () => {
    startMonetization(paymentPointer);
    expect(getPointerFromMetaTag()).toBe(paymentPointer);
  });

  it("Should stop monetization", () => {
    stopMonetization();
    expect(getPointerFromMetaTag()).toBeNull();
  });

  it("Should detect meta has been added and removed and readded", async () => {
    const onAdded = jest.fn();
    const onRemoved = jest.fn();
    observeMetaTagMutations({ onAdded, onRemoved });
    startMonetization();
    await delay(100);
    stopMonetization();
    await delay(100);
    startMonetization();
    await delay(100);
    expect(onAdded).toHaveBeenCalledTimes(2);
    expect(onRemoved).toHaveBeenCalledTimes(1);
  });
});
