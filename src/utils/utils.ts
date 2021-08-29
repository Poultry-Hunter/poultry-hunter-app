import assert from 'assert';
import BN from 'bn.js';

export class Numberu32 extends BN {

    toBuffer(): Buffer {
        const a = super.toArray().reverse();
        const b = Buffer.from(a);
        if (b.length === 4) {
            return b;
        }
        assert(b.length < 4, 'Numberu32 too large');

        const zeroPad = Buffer.alloc(4);
        b.copy(zeroPad);
        return zeroPad;
    }

}

export class Numberu64 extends BN {

    toBuffer(): Buffer {
        const a = super.toArray().reverse();
        const b = Buffer.from(a);
        if (b.length === 8) {
            return b;
        }
        assert(b.length < 8, 'Numberu64 too large');

        const zeroPad = Buffer.alloc(8);
        b.copy(zeroPad);
        return zeroPad;
    }
}
