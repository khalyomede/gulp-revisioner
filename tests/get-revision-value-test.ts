import { it, describe } from "mocha";
import { expect } from "chai";
import getRevisionValue from "../src/get-revision-value";
import { existsSync } from "fs";

describe("getRevisionTest()", () => {
    it("should get the revision value", () => {

        const value = getRevisionValue("/foo.css", "/css", "foo");

        expect(value).to.be.equal("/css/foo.css?id=acbd18db4cc2f85cedef654fccc4a4d8");
    });
});
