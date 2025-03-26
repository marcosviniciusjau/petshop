import medicamento from "@/assets/medicamento.jpg";
import banho from "@/assets/banho.jpg";
import racoes from "@/assets/racoes.jpg";
import vacinas from "@/assets/vacinas.jpg";

import { Heading, Text } from "@marcos-vinicius-design-system/react";
import {
  Container,
  Hero,
  Racoes,
  Vacinas,
  Medicamentos,
  Banho,
} from "./styles";
import Image from "next/image";

export function Do() {
  return (
    <Container>
      <Hero>
        <Heading size="3xl">o que fazemos</Heading>
      </Hero>

      <Banho>
        <Image
          src={banho}
          height={200}
          quality={100}
          priority
          style={{ borderRadius: "4px" }}
          alt="Imagem no Freepik"
        />
        <Text size="xl">Banho e tosa</Text>
        <Text size="sm">
          Cuidamos do seu pet com serviços de banho e tosa, garantindo higiene e
          bem-estar para o seu melhor amigo.
        </Text>
      </Banho>

      <Medicamentos>
        <Image
          src={medicamento}
          height={200}
          quality={100}
          style={{ borderRadius: "4px" }}
          priority
          alt="Imagem de pvproductions no Freepik"
        />
        <Text size="xl">Medicamentos</Text>
        <Text size="sm">
          Oferecemos uma variedade de medicamentos veterinários para garantir a
          saúde e o tratamento adequado do seu pet.
        </Text>
      </Medicamentos>

      <Racoes>
        <Image
          src={racoes}
          height={200}
          quality={100}
          style={{ borderRadius: "4px" }}
          priority
          alt="Imagem do Freepik"
        />
        <Text size="xl">Rações</Text>
        <Text size="sm">
          Trabalhamos com rações de alta qualidade para atender às necessidades
          nutricionais do seu pet em todas as fases da vida.
        </Text>
      </Racoes>

      <Vacinas>
        <Image
          src={vacinas}
          height={200}
          quality={100}
          style={{ borderRadius: "4px" }}
          priority
          alt="Imagem do Freepik"
        />
        <Text size="xl">Vacinas</Text>
        <Text size="sm">
          Proteja seu pet com as vacinas essenciais para garantir a saúde e
          prevenir doenças contagiosas.
        </Text>
      </Vacinas>
    </Container>
  );
}
