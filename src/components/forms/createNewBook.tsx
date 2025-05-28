import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { IoAddSharp } from "react-icons/io5";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useState } from "react";
import { Author, fetchAuthors } from "@/services/authorService";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { addNewBook, Book } from "@/services/bookService";
import { LoadingSpinner } from "../loading/loadingSpinner";
import { Loader2 } from "lucide-react";

const newBookSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  genre: z.string().min(1, "Gênero é obrigatório"),
  publicationYear: z.coerce
    .number()
    .min(1, "Ano é obrigatório")
    .max(2025, "Ano inválido"),
  authorId: z.string().min(1, "Autor é obrigatório"),
});

export type newBookSchema = z.infer<typeof newBookSchema>;

interface Props {
  onBookCreated?: (book: Book) => void;
}

export function CreateNewBook({ onBookCreated }: Props) {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof newBookSchema>>({
    resolver: zodResolver(newBookSchema),
    defaultValues: {
      title: "",
      genre: "",
      publicationYear: 0,
      authorId: "",
    },
  });

  const { handleSubmit, reset, control } = form;

  useEffect(() => {
    getAuthors();
  }, []);

  async function getAuthors() {
    try {
      const response = await fetchAuthors();
      setAuthors(response);
    } catch (error) {
      console.error("Erro ao buscar autores:", error);
    }
  }

  const handleAddNewBook = async (data: z.infer<typeof newBookSchema>) => {
    setIsLoading(true);
    try {
      const response = await addNewBook(data);
      onBookCreated?.(response);
      reset();
      setOpen(false);
    } catch (error) {
      setOpen(false);
      console.error("Erro ao adicionar livro:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={(v) => !isLoading && setOpen(v)}>
        <DialogTrigger asChild>
          <Button>
            <IoAddSharp />
            Adicionar livro
          </Button>
        </DialogTrigger>
        <DialogContent
          className={isLoading ? "pointer-events-none opacity-90" : ""}
        >
          <DialogHeader>
            <DialogTitle>Adicionar novo livro</DialogTitle>
            <DialogDescription>
              Preencha os detalhes do novo livro abaixo.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={handleSubmit(handleAddNewBook)}
              className="space-y-2"
            >
              <FormField
                control={control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="title">Título</Label>
                    <FormControl>
                      <Input placeholder="Título do livro" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="genre">Gênero</Label>
                    <FormControl>
                      <Input placeholder="Gênero do livro" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="publicationYear"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="publicationYear">Ano</Label>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Ano de lançamento"
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === ""
                              ? ""
                              : parseInt(e.target.value),
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="authorId"
                render={({ field }) => (
                  <FormItem>
                    <Label>Autor</Label>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue=""
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o autor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Autores</SelectLabel>
                          {authors.map((author) => (
                            <SelectItem key={author.id} value={author.id}>
                              {author.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="mt-3">
                <Button type="submit">
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    "Salvar"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
