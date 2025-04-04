import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Heading,
  Text,
  TextInput,
} from "@marcos-vinicius-design-system/react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { CalendarBlank, Clock } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "@/lib/axios";
import {
  ConfirmForm,
  FormActions,
  FormError,
  FormHeader,
  Select,
} from "./styles";

import { ToastContainer, toast } from "react-toastify";
import { ContainerLogin } from "../../styles";
import { useSession } from "next-auth/react";
const confirmFormSchema = z.object({
  name: z.string().min(3, { message: "O nome precisa no mínimo 3 caracteres" }),
  petName: z
    .string()
    .min(3, { message: "O nome do pet precisa no mínimo 3 caracteres" }),
  email: z.string().email({ message: "Digite um e-mail válido" }),
  observations: z
    .enum(["Banho e Tosa", "Vacinas", "Ração", "Medicamentos"])
    .default("Vacinas"),
});

type ConfirmFormData = z.infer<typeof confirmFormSchema>;

interface ConfirmStepProps {
  schedulingDate: Date;
  onCancelConfirmation: () => void;
}

export function ConfirmStep({
  schedulingDate,
  onCancelConfirmation,
}: ConfirmStepProps) {
  const router = useRouter();
  const session = useSession();
  const emailOwner = String(router.query.email);
  const isSignedId = session.status === "authenticated";

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm<ConfirmFormData>({
    defaultValues: {
      name: session.data?.user.name,
      email: session.data?.user.email,
      observations: "Vacinas",
    },
    resolver: zodResolver(confirmFormSchema),
  });

  async function handleConfirmScheduling(data: ConfirmFormData) {
    const { name, email, observations } = data;

    try {
      await api.post(`/users/${emailOwner}/schedule`, {
        name,
        email,
        observations,
        date: schedulingDate,
      });
      toast.success("Agendamento realizado com sucesso!");
    } catch (error) {
      toast.error("Ocorreu um erro. Tente outro horário ou outro dia");
      console.error(error);
    }
  }
  const describedDate = dayjs(schedulingDate).format("DD[ de ]MMMM[ de ]YYYY");
  const describedTime = dayjs(schedulingDate).format("HH:mm[h]");
  return (
    <>
      {isSignedId ? (
        <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
          <FormHeader>
            <Text>
              <CalendarBlank />
              {describedDate}
            </Text>
            <Text>
              <Clock />
              {describedTime}
            </Text>
          </FormHeader>

          <label>
            <Text size="sm">Nome</Text>
            <TextInput placeholder="Seu nome" {...register("name")} />
            {errors.name && (
              <FormError size="sm">{errors.name.message}</FormError>
            )}
          </label>

          <label>
            <Text size="sm">Nome do pet</Text>
            <TextInput placeholder="Nome do pet" {...register("petName")} />
            {errors.petName && (
              <FormError size="sm">{errors.petName.message}</FormError>
            )}
          </label>

          <label>
            <Text size="sm">Endereço de e-mail</Text>
            <TextInput
              type="email"
              placeholder="johndoe@example.com"
              {...register("email")}
            />
            {errors.email && (
              <FormError size="sm">{errors.email.message}</FormError>
            )}
          </label>

          <label>
            <Text size="sm">Observações</Text>
            <Select {...register("observations")} style={{ width: "100%" }}>
              <option value="Banho e Tosa">Banho e Tosa</option>
              <option value="Medicamentos">Medicamentos</option>
              <option value="Vacinas">Vacinas</option>
              <option value="Ração">Ração</option>
            </Select>
          </label>

          <FormActions>
            <Button
              type="button"
              variant="tertiary"
              onClick={onCancelConfirmation}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              Confirmar
            </Button>

            <ToastContainer />
          </FormActions>
        </ConfirmForm>
      ) : (
        <ContainerLogin>
          <Heading>Você precisa fazer login para acessar essa página</Heading>
          <a href="/sign-in" style={{ textDecoration: "none" }}>
            <Button>Fazer Login</Button>
          </a>
        </ContainerLogin>
      )}
    </>
  );
}
