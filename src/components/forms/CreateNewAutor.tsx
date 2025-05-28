import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { IoAddSharp } from "react-icons/io5";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { AddNewAuthor, Author } from "@/services/authorService";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const newAutorSchema = z.object({
  name: z.string().min(2, "O nome do autor deve 2 caracteres ou mais."),
  nationality: z
    .string()
    .min(2, "A nacionalidade do autor deve 2 caracteres ou mais."),
});

export type NewAutor = z.infer<typeof newAutorSchema>;

interface Props {
  onAuthorCreated?: (Author: Author) => void;
}

export function CreateNewAutor({ onAuthorCreated }: Props) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<NewAutor>({
    resolver: zodResolver(newAutorSchema),
    defaultValues: {
      name: "",
      nationality: "",
    },
  });

  async function handleAddNewAutor(data: NewAutor) {
    try {
      const response = await AddNewAuthor(data);
      onAuthorCreated?.(response);
      reset();
      setOpen(false);
      toast("Autor adicionado", {
        description: `O autor ${data.name} foi adicionado com sucesso.`,
        action: { label: "Ok", onClick: () => console.log() },
      });
    } catch (error) {
      setOpen(false);
      console.error("Erro ao adicionar livro:", error);
    } finally {
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={(v) => !isSubmitting && setOpen(v)}>
        <DialogTrigger asChild>
          <Button>
            <IoAddSharp />
            Adicionar Autor
          </Button>
        </DialogTrigger>
        <DialogContent
          className={isSubmitting ? "pointer-events-none opacity-90" : ""}
        >
          <DialogHeader>
            <DialogTitle>Adicionar novo Autor</DialogTitle>
            <DialogDescription>
              Preencha as informações do autor abaixo.
            </DialogDescription>
            <form onSubmit={handleSubmit(handleAddNewAutor)}>
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input className="mt-1.5" id="name" {...register("name")} />
                <p className="mt-1 text-xs text-red-500">
                  {errors.name?.message}
                </p>
              </div>
              <div>
                <Label htmlFor="nacionalidade">Nacionalidade</Label>
                <Input
                  className="mt-1.5"
                  id="nacionalidade"
                  {...register("nationality")}
                />
                <p className="mt-1 text-xs text-red-500">
                  {errors.nationality?.message}
                </p>
              </div>

              <DialogFooter className="mt-3">
                <Button type="submit">
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    "Salvar"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
