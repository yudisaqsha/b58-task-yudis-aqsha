import { Author } from "./threads"
export  interface Comment{
    id: number,
    content: string,
    image: string,
    author: Author
}