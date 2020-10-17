import {it, describe} from "mocha";
import {expect} from "chai";
import isObject from "../src/is-object";
import main from "../lib/index";

describe("isObject()", () => {
    it("should return true if the parameter is an object", () => expect(isObject({})).to.be.true);

    it("should return false if the parameter is not an object", () => expect(isObject(42)).to.be.false);
});
