//Defines the shape of the state, ensuring type safety.
export interface BookFormState {
    id?: number;  
    title: string;
    author: string;
    description: string;
}