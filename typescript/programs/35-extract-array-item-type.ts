type ArrayItem<T> = T extends readonly (infer Item)[] ? Item : never;

type Names = string[];
type Name = ArrayItem<Names>;

const nameValue: Name = 'Sumit';

console.log(nameValue);

