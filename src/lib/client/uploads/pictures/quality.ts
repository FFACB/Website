
class Quality {
    private quality: number;
    private name: string;
    constructor(name:string, quality: number) {
        this.name = name;
        this.quality = quality;
    }

    public key(): string {
        return this.name;
    }

    public value(): number {
        return this.quality;
    }

    public toString(): string {
        return this.quality.toString();
    }
}

const quality100 = new Quality("100", 100);
const quality90 = new Quality("90", 90);
const quality80 = new Quality("80", 80);
const quality70 = new Quality("70", 70);
const quality60 = new Quality("60", 60);
const quality50 = new Quality("50", 50);

const qualities = [quality100, quality90, quality80, quality70, quality60, quality50];

export default qualities;
export {quality50, quality60, quality70, quality80, quality90, quality100,}