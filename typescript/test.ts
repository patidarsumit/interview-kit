function getFirstElement<T>(arr: T[]): T {
    return arr[0];
}

const numbers = [1, 2, 3, 4, 5];
const firstNumber = getFirstElement(numbers);
console.log(firstNumber); // Output: 1

const strings = ["Hello", "World"];
const firstString = getFirstElement(strings);
console.log(firstString); // Output: "Hello"

const mixed = [1, "two", true];
const firstMixed = getFirstElement(mixed);
console.log(firstMixed); // Output: 1


type ApiResponse<T> = {
    data: T;
    status: number;
    message: string;
};

function handleApiResponse<T>(response: ApiResponse<T>): void {
    console.log(`Status: ${response.status}`);
    console.log(`Message: ${response.message}`);
    console.log(`Data:`, response.data);
}

const userResponse: ApiResponse<{ id: number; name: string }> = {
    data: { id: 1, name: "Alice" },
    status: 200,
    message: "User fetched successfully",
}; 