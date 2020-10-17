import { it, describe } from "mocha";
import { expect } from "chai";
import getJsonFromFile from "../src/get-json-from-file";

describe("getJsonFromFile()", () => {
    it("should get the json from a file", () => {
        expect(getJsonFromFile(__dirname + "/misc/sample.json")).to.be.deep.equal({
            bar: "baz"
        });
    });
});
