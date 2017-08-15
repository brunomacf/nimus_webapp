import React from "react"
import {shallow} from "enzyme"
import chai from "chai"
import chaiAsPromised from "chai-as-promised"
import Hoverio from "../index"

// Setup chai
chai.use(chaiAsPromised)
let {expect} = chai

describe("<Hoverio />", () => {
    it("renders children when passed in", () => {
        const wrapper = shallow((
            <Hoverio>
                <div className="unique" />
            </Hoverio>
        ))

        expect(wrapper.contains(<div className="unique" />)).to.equal(true)
    })
})