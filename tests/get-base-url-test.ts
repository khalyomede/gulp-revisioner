import { it, describe } from "mocha";
import { expect } from "chai";
import getBaseUrl from "../src/get-base-url";
import { sep } from "path";

describe("getBaseUrl()", () => {
    it("should add a slash before", () => expect(getBaseUrl("css")).to.be.equal(sep + "css"));

    it("it should return the same string", ()  => expect(getBaseUrl("/css")).to.be.equal(sep  + "css"));
});
