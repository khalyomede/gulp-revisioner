import { it, describe } from "mocha";
import { expect } from "chai";
import getRevisionKey from "../src/get-revision-key";

describe("getRevisionKey()", () => {
    it("should get the revision key", () => {
        const key = getRevisionKey("foo.css", "/css");

        expect(key).to.be.equal("/css/foo.css");
    });
});
