import { it, describe } from "mocha";
import { expect } from "chai";
import isInteger from "../src/is-integer";

describe("isInteger()", () => {
    it("should return true if the variable is an integer", () => expect(isInteger(42)).to.be.true);

    it("should return false if the variable is a float", () => expect(isInteger(42.42)).to.be.false);

    it("should return false if the variable is not a number", () => expect(isInteger("42")).to.be.false);
});
