import { Book, editBook } from "@/services/bookService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  Sheet,
} from "@/components/ui/sheet";
import { MdEdit } from "react-icons/md";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { LoadingSpinner } from "../loading/loadingSpinner";
import { toast } from "sonner";

interface Props {
  book: Book;
  onBookEdited?: (book: Book) => void;
}

const currentYear = new Date().getFullYear();
const EditBookSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(1, "Título é obrigatório")
    .max(50, "O titulo não pode ser maior que 50 caracteres"),
  genre: z
    .string()
    .min(1, "Gênero é obrigatório")
    .max(20, "O titulo não pode ser maior que 20 caracteres"),
  publicationYear: z.coerce
    .number()
    .min(1, "Ano é obrigatório")
    .max(currentYear, `O ano não pode ser maior que ${currentYear}`),
});

export type EditBook = z.infer<typeof EditBookSchema>;

export function EditBook({ book, onBookEdited }: Props) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<EditBook>({
    resolver: zodResolver(EditBookSchema),
    defaultValues: {
      id: book.id,
      title: book.title,
      genre: book.genre,
      publicationYear: book.publicationYear,
    },
  });

  async function handleEditBook(data: EditBook) {
    try {
      const response = await editBook(data);
      onBookEdited?.(response);
      setOpen(false);
      toast("Livro editado", {
        description: `O livro ${data.title} foi editado com sucesso.`,
        action: { label: "Ok", onClick: () => console.log() },
      });
    } catch (error) {
      console.error("Erro ao adicionar livro:", error);
      toast("Erro", {
        description: `Ocorreu um erro ao tentar editar o livro, tente novamente mais tarde.`,
        action: { label: "Ok", onClick: () => console.log() },
      });
    } finally {
      setOpen(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>
          <MdEdit className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      {isSubmitting && <LoadingSpinner />}
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Editar livro</SheetTitle>
          <SheetDescription>
            Faça alterações do seu livro aqui. Clique em salvar alterações
            quando terminar.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit(handleEditBook)} className="space-y-2 p-2">
          <div>
            <Label htmlFor="titulo">Titulo</Label>
            <Input className="mt-1.5" id="titulo" {...register("title")} />
            <p className="mt-1 text-xs text-red-500">{errors.title?.message}</p>
          </div>
          <div>
            <Label htmlFor="genero">Gênero</Label>
            <Input className="mt-1.5" id="genero" {...register("genre")} />
            <p className="mt-1 text-xs text-red-500">{errors.genre?.message}</p>
          </div>
          <div>
            <Label htmlFor="publicationYear">Ano de lançamento</Label>
            <Input
              className="mt-1.5"
              id="publicationYear"
              type="number"
              {...register("publicationYear")}
            />
            <p className="mt-1 text-xs text-red-500">
              {errors.publicationYear?.message}
            </p>
          </div>
          <SheetFooter>
            <Button type="submit">Salvar alterações</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
