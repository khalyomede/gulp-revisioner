import { it, describe } from "mocha";
import { expect } from "chai";
import isString from "../src/is-string";

describe("isString()", () => {
    it("should return true if the parameter is a string", () => expect(isString("text")).to.be.true);

    it("should return false if the parameter is not a string", () => expect(isString({})).to.be.false);
});
