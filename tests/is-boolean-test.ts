import { it, describe } from "mocha";
import { expect } from "chai";
import isBoolean from "../src/is-boolean";

describe("isBoolean()", () => {
    it("should return true if the parameter is a boolean", () => expect(isBoolean(true)).to.be.true);

    it("should return false if the parameter is not a boolean", () => expect(isBoolean("true")).to.be.false);
});
