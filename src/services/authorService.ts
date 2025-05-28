import { NewAutor } from "@/components/forms/CreateNewAutor";
import api from "../config/api";

export interface Author {
  id: string;
  name: string;
  nationality: string;
}

export async function fetchAuthors() {
  try {
    const response = await api.get("/author");
    const authors: Author[] = response.data.data.map((author: Author) => {
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

export async function AddNewAuthor(author: NewAutor) {
  try{
    const response = await api.post("/author", {
      name: author.name,
      nacionality: author.nationality
    });
    const NewAutor: Author = { ...response.data.data};
    return NewAutor;
  }catch (error) {
    console.log("Erro ao tentar adicionar o autor a biblioteca", error, author);
    throw error;
  }
}

export async function deleteAuthor(authorId: string){
  try {
    await api.delete(`/author/${authorId}`);
    return;
  } catch (error) {
    console.log("erro ao tentar deletar o autor.", error)
  }
}