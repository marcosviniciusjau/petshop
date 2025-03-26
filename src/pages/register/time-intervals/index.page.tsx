import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from "@marcos-vinicius-design-system/react";
import { Container, FormError, Header } from "../styles";
import {
  IntervalBox,
  IntervalContainer,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
} from "./styles";
import { ArrowRight } from "phosphor-react";
import { z } from "zod";
import { Controller, Form, useFieldArray, useForm } from "react-hook-form";
import { getWeekDays } from "@/utils/get-week-days";
import { zodResolver } from "@hookform/resolvers/zod";
import { convertToMinutes } from "@/utils/convert-to-minutes";
import { api } from "@/lib/axios";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { useSession } from "next-auth/react";
import { ContainerLogin } from "@/pages/schedule/[email]/styles";

import { Header as HeaderHome } from "@/pages/home/components/Header";
import { parseCookies } from "nookies";
import { env } from "@/env/env";
const timeIntervalsFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      })
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length > 0, {
      message: "Você precisa selecionar pelo menos um dia da semana",
    })
    .transform((intervals) => {
      return intervals.map((interval) => {
        return {
          weekDay: interval.weekDay,
          startTimeInMinutes: convertToMinutes(interval.startTime),
          endTimeInMinutes: convertToMinutes(interval.endTime),
        };
      });
    })
    .refine(
      (intervals) => {
        return intervals.every(
          (interval) =>
            interval.endTimeInMinutes - 60 >= interval.startTimeInMinutes
        );
      },
      {
        message:
          "O horário de término deve ser pelo menos 1h distante do início.",
      }
    ),
});
type TimeIntervalsFormInput = z.input<typeof timeIntervalsFormSchema>;
type TimeIntervalsFormOutput = z.output<typeof timeIntervalsFormSchema>;

export default function TimeIntervals() {
  const {
    register,
    control,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<TimeIntervalsFormInput>({
    resolver: zodResolver(timeIntervalsFormSchema),
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: "08:00", endTime: "18:00" },
        { weekDay: 1, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 2, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 3, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 4, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 5, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 6, enabled: false, startTime: "08:00", endTime: "18:00" },
      ],
    },
  });
  const { fields } = useFieldArray({
    control,
    name: "intervals",
  });

  const weekDays = getWeekDays();
  const intervals = watch("intervals");

  const router = useRouter();
  const emailOwner = env.NEXT_EMAIL_OWNER;
  const session = useSession();
  const isSignedId =
    session.status === "authenticated" &&
    session.data.user.email === emailOwner;
  async function handleSetTimeIntervals(data: TimeIntervalsFormOutput) {
    const { intervals } = data;
    await api.post("/users/time-intervals", {
      intervals,
    });
    await router.push(`/schedule/${emailOwner}`);
  }

  return (
    <Header>
      <HeaderHome />
      {isSignedId ? (
        <>
          <NextSeo
            title="Selecione sua disponibilidade | PetShop"
            noindex
          />

          <Container>
            <Header>
              <Heading as="strong">Quase lá</Heading>
              <Text>
                Defina o intervalo de horário que você está disponível em cada
                dia da semana.
              </Text>
              <MultiStep size={4} currentStep={3} />
            </Header>
            <Form<TimeIntervalsFormInput, TimeIntervalsFormOutput>
              control={control}
              onSubmit={async ({ data }) => await handleSetTimeIntervals(data)}
            >
              <IntervalBox>
                <IntervalContainer>
                  {fields.map((field, index) => {
                    return (
                      <IntervalItem key={field.id}>
                        <IntervalDay>
                          <Controller
                            name={`intervals.${index}.enabled`}
                            control={control}
                            render={({ field }) => {
                              return (
                                <Checkbox
                                  onCheckedChange={(checked) => {
                                    field.onChange(checked === true);
                                  }}
                                  checked={field.value}
                                />
                              );
                            }}
                          />
                          <Text>{weekDays[field.weekDay]}</Text>
                        </IntervalDay>
                        <IntervalInputs>
                          <TextInput
                            containerProps={{ size: "sm" }}
                            type="time"
                            step={60}
                            disabled={intervals[index].enabled === false}
                            {...register(`intervals.${index}.startTime`)}
                          />
                          <TextInput
                            containerProps={{ size: "sm" }}
                            type="time"
                            step={60}
                            disabled={intervals[index].enabled === false}
                            {...register(`intervals.${index}.endTime`)}
                          />
                        </IntervalInputs>
                      </IntervalItem>
                    );
                  })}
                </IntervalContainer>
                {errors.intervals && (
                  <FormError size="sm">
                    {errors.intervals.root?.message}
                  </FormError>
                )}
                <Button type="submit" disabled={isSubmitting}>
                  Proximo Passo
                  <ArrowRight />
                </Button>
              </IntervalBox>
            </Form>
          </Container>
        </>
      ) : (
        <>
          <NextSeo title="Não autorizado | PetShop" noindex />

          <ContainerLogin>
            <Heading>Você precisa fazer login para acessar essa página</Heading>
            <a
              href="/register/connect-calendar"
              style={{ textDecoration: "none" }}
            >
              <Button>Fazer Login</Button>
            </a>
          </ContainerLogin>
        </>
      )}
    </Header>
  );
}
