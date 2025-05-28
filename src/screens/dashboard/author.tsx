import { Alert } from "@/components/alerts/Alert";
import { CreateNewAutor } from "@/components/forms/CreateNewAutor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Author, fetchAuthors, deleteAuthor } from "@/services/authorService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoSearchOutline } from "react-icons/io5";
import { toast } from "sonner";
import { z } from "zod";

const searchSchema = z.object({
  search: z.string().min(2),
});

export default function Authors() {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(searchSchema),
  });
  const [isLoading, setIsLoading] = useState(false);

  const [Autores, setAutores] = useState<Author[]>([]);

  async function getAutores() {
    setIsLoading(true);
    try {
      const response = await fetchAuthors();
      setAutores(response);
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  function handleNewAuthor(author: Author) {
    setAutores((prev) => [...prev, author]);
  }

  async function handleDeleteAutor(author: Author) {
    try {
      setAutores(Autores.filter((autor) => autor.id !== author.id));
      deleteAuthor(author.id);
      toast("Autor deletado", {
        description: `O autor ${author.name} foi deletado com sucesso.`,
        action: { label: "Ok", onClick: () => console.log() },
      });
    } catch (error) {}
  }

  async function handleSearch(data: any) {
    console.log(data);
  }

  useEffect(() => {
    getAutores();
  }, []);

  return (
    <div className="flex h-screen w-full flex-col gap-3 p-6">
      <div className="flex items-center justify-between">
        <form
          onSubmit={handleSubmit(handleSearch)}
          className="flex items-center gap-2"
        >
          <Input {...register("search")} placeholder="Nome do autor" />
          <Button variant="link" type="submit">
            <IoSearchOutline />
            Filtrar resultados
          </Button>
        </form>
        <CreateNewAutor onAuthorCreated={handleNewAuthor} />
      </div>
      <main className="overflow-y-auto rounded-lg px-9">
        <Table className="items-center justify-center border">
          <TableHeader className="border-b-2">
            <TableRow>
              <TableHead className="font-semibold text-black/70">
                Nome
              </TableHead>
              <TableHead className="text-black/70">Nacionalidade</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Autores.map((Autor) => (
              <TableRow className="font-medium" key={Autor.id}>
                <TableCell>{Autor.name}</TableCell>
                <TableCell>
                  <Badge>{Autor.nationality}</Badge>
                </TableCell>
                <TableCell className="flex gap-3">
                  <Alert
                    onClick={() => handleDeleteAutor(Autor)}
                    Title="Tem certeza que deseja prosseguir?"
                    Description="Ao prosseguir com essa ação você ira deletar esse autor e todos os livros associados a ele permanentemente."
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
