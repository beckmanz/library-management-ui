import { useEffect, useState } from "react";
import {
  Book,
  deleteBook,
  fetchBooks,
  fetchBooksByTitle,
} from "../../services/bookService";
import { IoSearchOutline } from "react-icons/io5";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateNewBook } from "@/components/forms/createNewBook";
import { AlertDeleteBook } from "@/components/alerts/Alert";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { EditBook } from "@/components/forms/editBook";
import { Badge } from "@/components/ui/badge";

const searchSchema = z.object({
  search: z.string().min(2),
});

export default function Books() {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(searchSchema),
  });
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getBooks() {
    setIsLoading(true);
    try {
      const response = await fetchBooks();
      setBooks(response);
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function getBooksByTitle(data: any) {
    setIsLoading(true);
    try {
      const response = await fetchBooksByTitle(data.search);
      setBooks(response);
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeleteBook(bookId: string) {
    try {
      setBooks(books.filter((book) => book.id !== bookId));
      deleteBook(bookId);
    } catch (error) {
      throw error;
    }
  }

  function handleNewBook(book: Book) {
    setBooks((prev) => [...prev, book]);
  }

  async function handleEditBook(bookEdited: Book) {
    setBooks((prev) =>
      prev.map((book) => (book.id === bookEdited.id ? bookEdited : book)),
    );
  }

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="flex h-screen w-full flex-col gap-3 p-6">
      <div className="flex items-center justify-between">
        <form
          onSubmit={handleSubmit(getBooksByTitle)}
          className="flex items-center gap-2"
        >
          <Input {...register("search")} placeholder="Titulo do livro" />
          <Button variant="link" type="submit">
            <IoSearchOutline />
            Filtrar resultados
          </Button>
        </form>
        <CreateNewBook onBookCreated={handleNewBook} />
      </div>

      <main className="overflow-y-auto rounded-lg px-9">
        <Table className="items-center justify-center border">
          <TableHeader className="border-b-2">
            <TableRow>
              <TableHead className="font-semibold text-black/70">
                Titulo
              </TableHead>
              <TableHead className="text-black/70">Publicado</TableHead>
              <TableHead className="text-black/70">Gênero</TableHead>
              <TableHead className="text-black/70">Autor</TableHead>
              <TableHead className="text-black/70">Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book) => (
              <TableRow className="font-medium" key={book.id}>
                <TableCell>{book.title}</TableCell>
                <TableCell className="text-black/70">
                  {book.publicationYear}
                </TableCell>
                <TableCell className="text-black/70">
                  <Badge>{book.genre}</Badge>
                </TableCell>
                <TableCell className="text-black/70">
                  {book.author.name}
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      book.isAvailable
                        ? "rounded-full bg-green-100 p-2 text-center text-green-500"
                        : "rounded-full bg-red-100 p-3 text-center text-red-500"
                    }
                  >
                    {book.isAvailable ? "Disponivel" : "Indisponivel"}
                  </Badge>
                </TableCell>
                <TableCell className="flex gap-2">
                  <EditBook book={book} onBookEdited={handleEditBook} />
                  <AlertDeleteBook
                    onClick={() => handleDeleteBook(book.id)}
                    Title="Tem certeza que deseja prosseguir?"
                    Description="Ao prosseguir com essa ação você ira deletar esse livro permanente."
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  );
}
