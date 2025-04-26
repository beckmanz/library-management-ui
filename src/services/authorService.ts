import api from "../config/api";

export interface Author {
  id: string;
  name: string;
  nacionality: string;
}

export async function fetchAuthors() {
  try {
    const response = await api.get("/author");
    const authors: Author[] = response.data.data.map((author: any) => {
      return { ...author };
    });
    return authors;
  } catch (error) {
    console.error("Error fetching authors:", error);
    throw error;
  }
}

export async function getAuthorById(authorId: string) {
  try {
    const response = await api.get(`/author/${authorId}`);
    const author: Author = { ...response.data.data };
    return author;
  } catch (error) {
    throw error;
  }
}
