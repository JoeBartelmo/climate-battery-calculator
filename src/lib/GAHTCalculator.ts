import { UnitConversionMap } from "./UnitConversionts";
import { MathContent } from './mathjax/MathJaxWrapper';

/**
 * MIT License
 * Copyright (c) 2020 Joe Bartelmo
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */
export class GAHTCalculator {
    /**
     * Converts input number to either cubic feet or sqft depending on the
     * dimensionality
     * @param amount the number in the unit of type
     * @param type unit for conversion
     * @todo convert type to an enum
     */
    public convert(amount: number, type: string) {
        return amount * UnitConversionMap[type];
    }

    /**
     * Computes the CFM from volume and desired number of exchanges per minute
     * @param volume volume of the room
     * @param airExchanges number of air exchanges per hour
     * @param fans integer, the number of climate batteries in this system
     * @implNotes Note that increasing fans from > 1 will double the amount of money to make this system
     */
    public computeCFM(volume: number, airExchanges: number, fans: number) { 
        return (volume * airExchanges / 60.0) / fans;
    }


    /**
     * Shows the work of the compute CFM equatino
     * @param volume volume of the room
     * @param airExchanges number of air exchanges per hour
     * @param fans integer, the number of climate batteries in this system
     * @implNotes Note that increasing fans from > 1 will double the amount of money to make this system
     */
    public latexCFMNotation(volume: number, airExchanges: number, fans: number): MathContent {
        return {
            latex:`
            $CFM = \\frac{Volume * Exchanges_{minute}}{Fans}$
            $ $
            $CFM = \\frac{${volume}ft^3 * \\frac{${airExchanges} hours}{\\frac{60 min}{1 hour}}}{${fans}}$
            $ $
            $CFM = \\frac{${this.computeCFM(volume, airExchanges, fans)}ft^3}{min}$`
        } as MathContent;
    }
}