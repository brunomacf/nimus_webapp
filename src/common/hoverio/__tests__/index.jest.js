import React from "react"
import {shallow} from "enzyme"
import Hoverio from "../index"

describe("<Hoverio />", () => {
    test("renders children when passed in", () => {
        const wrapper = shallow((
            <Hoverio>
                <div className="unique" />
            </Hoverio>
        ))

        expect(wrapper.contains(<div className="unique" />)).toBe(true)
    })
})