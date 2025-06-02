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
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Author, editAuthor } from "@/services/authorService";

interface Props {
  Author: Author;
  onAuthorEdited?: (Author: Author) => void;
}

const EditAutorSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "O nome é obrigatório"),
  nationality: z.string().min(1, "Nacionalidade é obrigatório"),
});

export type EditAuthor = z.infer<typeof EditAutorSchema>;

export function EditAuthor({ Author, onAuthorEdited }: Props) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<EditAuthor>({
    resolver: zodResolver(EditAutorSchema),
    defaultValues: {
      id: Author.id,
      name: Author.name,
      nationality: Author.nationality,
    },
  });

  async function handleEditAutor(data: EditAuthor) {
    try {
      const response = await editAuthor(data);
      onAuthorEdited?.(response);
      setOpen(false);
      toast("Autor editado", {
        description: `O autor ${data.name} foi editado com sucesso.`,
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
    <Sheet open={open} onOpenChange={(v) => !isSubmitting && setOpen(v)}>
      <SheetTrigger asChild>
        <Button>
          <MdEdit className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        className={isSubmitting ? "pointer-events-none opacity-90" : ""}
      >
        <SheetHeader>
          <SheetTitle>Editar autor</SheetTitle>
          <SheetDescription>
            Faça alterações do autor aqui. Clique em salvar alterações quando
            terminar.
          </SheetDescription>
        </SheetHeader>
        <form
          onSubmit={handleSubmit(handleEditAutor)}
          className="space-y-2 p-2"
        >
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input className="mt-1.5" id="name" {...register("name")} />
            <p className="mt-1 text-xs text-red-500">{errors.name?.message}</p>
          </div>
          <div>
            <Label htmlFor="nationality">Nacionalidade</Label>
            <Input
              className="mt-1.5"
              id="nationality"
              {...register("nationality")}
            />
            <p className="mt-1 text-xs text-red-500">
              {errors.nationality?.message}
            </p>
          </div>
          <SheetFooter>
            <Button type="submit">
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Salvar alterações"
              )}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
