import { newBookSchema } from "@/components/forms/createNewBook";
import api from "../config/api";
import { Author, getAuthorById } from "./authorService";
import { Book } from "lucide-react";
import { EditBook } from "@/components/forms/editBook";

export interface Book {
  id: string;
  title: string;
  genre: string;
  publicationYear: number;
  isAvailable: boolean;
  addedAt: string;
  authorId: string;
  author: Author;
  libraryId: string;
}

export async function addNewBook(data: newBookSchema) {
  try {
    const response = await api.post("/book", {
      title: data.title,
      genre: data.genre,
      publicationYear: data.publicationYear,
      authorId: data.authorId,
    });
    const author = await getAuthorById(data.authorId);
    const newBook: Book = { ...response.data.data, author };
    return newBook;
  } catch (error) {
    console.log("Erro ao tentar adicionar o livro a biblioteca", error, data);
    throw error;
  }
}

export async function fetchBooks() {
  try {
    const response = await api.get("/book");
    const books = await Promise.all(
      response.data.data.map(async (book: Book) => {
        const author = await getAuthorById(book.authorId);
        return { ...book, author };
      }),
    );
    return books;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
}

export async function editBook(data: EditBook) {
  try {
    const response = await api.put("/book", {
      id: data.id,
      title: data.title,
      genre: data.genre,
      publicationYear: data.publicationYear,
    });
    const author = await getAuthorById(response.data.data.authorId);
    const bookEdited: Book = { ...response.data.data, author };
    return bookEdited;
  } catch (error) {
    console.log("Erro ao tentar editar o livro", error, data);
    throw error;
  }
}

export async function fetchBooksByTitle(title: string) {
  try {
    const response = await api.get(`/book/bytitle/${title}`);
    const books: Book[] = await Promise.all(
      response.data.data.map(async (book: any) => {
        const author = await getAuthorById(book.authorId);
        return { ...book, author };
      }),
    );
    return books;
  } catch (error) {
    console.error("Erro ao buscar o livro:", error, title);
    throw error;
  }
}

export async function deleteBook(bookId: string) {
  try {
    await api.delete(`/book/${bookId}`);
  } catch (error) {
    console.error("Erro ao tentar deletar livro", error, bookId);
    throw error;
  }
}
