import { it, describe } from "mocha";
import { expect } from "chai";
import parseOptions from "../src/parse-options";
import { resolve } from "path";

describe("parseOptions()", () => {
    it("should fill the with the default values", () => {
        expect(parseOptions({})).to.be.deep.equal({
            baseUrl: "/",
            manifestDirectory: resolve(__dirname + "/../src"),
            manifestName: "manifest.json",
            eraseBeforeWriting: false,
        });
    });

    it("should return an exception if the options is not an object", () => {
        expect(() => {
            // @ts-ignore
            throw parseOptions(42);
        }).to.throw("Expected options to be an Object.");
    });

    it("should throw an exception if the options.baseUrl is not a string", () => {
        expect(() => {
            throw parseOptions({
                // @ts-ignore
                baseUrl: 42,
            });
        }).to.throw("Expected options.baseUrl to be a String.");
    });

    it("should throw an exception if the options.manifestDirectory is not a string", () => {
        expect(() => {
            throw parseOptions({
                // @ts-ignore
                manifestDirectory: 42,
            });
        }).to.throw("Expected options.manifestDirectory to be a String.");
    });

    it("should throw an exception if the options.manifestName is not a string", () => {
        expect(() => {
            throw parseOptions({
                // @ts-ignore
                manifestName: 42,
            });
        }).to.throw("Expected options.manifestName to be a String.");
    });

    it("should throw an exception if the options.eraseBeforeWriting is not a boolean", () => {
        expect(() => {
            throw parseOptions({
                // @ts-ignore
                eraseBeforeWriting: 42,
            });
        }).to.throw("Expected options.eraseBeforeWriting to be a Boolean.");
    });
});
