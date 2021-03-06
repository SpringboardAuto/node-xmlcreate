/**
 * Copyright (C) 2016 Michael Kourlas
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {IStringOptions} from "../options";
import {isString} from "../utils";
import {validateChar} from "../validate";
import XmlNode from "./XmlNode";

/**
 * Represents an XML CDATA section.
 *
 * An XML CDATA section is structured as follows, where `{data}` is the
 * character data of the section:
 *
 * ```xml
 * <![CDATA[{data}]]>
 * ```
 *
 * The `{data}` value is a property of this node.
 *
 * XmlCdata nodes cannot have any children.
 */
export default class XmlCdata extends XmlNode {
    private _data: string;

    /**
     * Initializes a new instance of the {@link XmlCdata} class.
     *
     * @param data The character data of the CDATA section.
     */
    constructor(data: string) {
        super();
        this.data = data;
    }

    /**
     * Gets the character data of the CDATA section.
     *
     * @returns The character data of the CDATA section.
     */
    get data(): string {
        return this._data;
    }

    /**
     * Sets the character data of the CDATA section.
     *
     * @param data The character data of the CDATA section.
     */
    set data(data: string) {
        if (!isString(data)) {
            throw new TypeError("character data should be a string");
        } else if (!validateChar(data)) {
            throw new Error("character data should not contain characters not"
                            + " allowed in XML");
        } else if (/]]>/.test(data)) {
            throw new Error("data should not contain the string ']]>'");
        }
        this._data = data;
    }

    /**
     * Throws an exception since {@link XmlCdata} nodes cannot have any
     * children.
     *
     * @returns This method does not return.
     */
    public children(): XmlNode[] {
        throw new Error("XmlCdata nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlCdata} nodes cannot have any
     * children.
     *
     * @param node This parameter is unused.
     * @param index This parameter is unused.
     *
     * @returns This method does not return.
     */
    public insertChild(node: XmlNode, index?: number): XmlNode | undefined
    {
        throw new Error("XmlCdata nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlCdata} nodes cannot have any
     * children.
     *
     * @param node This parameter is unused.
     *
     * @returns This method does not return.
     */
    public removeChild(node: XmlNode): boolean {
        throw new Error("XmlCdata nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlCdata} nodes cannot have any
     * children.
     *
     * @param index This parameter is unused.
     *
     * @returns This method does not return.
     */
    public removeChildAtIndex(index: number): XmlNode {
        throw new Error("XmlCdata nodes cannot have children");
    }

    /**
     * Returns an XML string representation of this node.
     *
     * @param options Formatting options for the string representation.
     *
     * @returns An XML string representation of this node.
     */
    public toString(options: IStringOptions = {}): string {
        return "<![CDATA[" + this.data + "]]>";
    }
}
