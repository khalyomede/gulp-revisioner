import { it, describe } from "mocha";
import { expect } from "chai";
import writeJsonToFile from "../src/write-json-to-file";
import { readFileSync, unlinkSync } from "fs";

describe("writeJsonToFile()", () => {
    it("it should write JSON to the file", () => {
        const filePath = __dirname + "/misc/file.json";

        writeJsonToFile(filePath, {
            foo: "bar",
        });

        expect(readFileSync(filePath).toString()).to.be.equal('{\n  "foo": "bar"\n}\n');

        unlinkSync(filePath);
    });
});
