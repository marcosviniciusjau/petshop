import { Heading, Text } from "@marcos-vinicius-design-system/react";
import Image from "next/image";
import {
  Container,
  Hero,
  Accordion,
  AccordionItem,
  AccordionWrapper,
  Panel,
  Preview,
  Contacts,
  Imagem,
  Gmail,
  Questions,
  Whatsapp,
} from "./styles";

import previewImage from "../../assets/banho-de-pet.jpg";

import { UserForm } from "./components/UserForm.ts";
import { NextSeo } from "next-seo";
import { Header } from "./components/Header";
import { Do } from "./components/Do";
import { Footer } from "./components/Footer";
import LogoGmail from "@/assets/logo_gmail.svg";
import LogoWhatsapp from "@/assets/logo_whatsapp.svg";

import { useState } from "react";

export default function Home() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <NextSeo
        title="PetShop"
        description="PetShop. Agende seu horário"
      />
      <Header />
      <Container>
        <Preview>
          <Imagem src={previewImage} quality={100} priority alt="image of storyset of freepik" />
        </Preview>
        <Hero>
          <Heading size="2xl"> O melhor para deixar seu cãozinho limpinho e cheiroso </Heading>
          <Text size="lg">
            {" "}
            Agende agora mesmo para oferecer o melhor tratamento para seu pet{" "}
          </Text>
        </Hero>
      </Container>
      <Do />
      <Contacts>
        <AccordionWrapper>
          <Heading size="lg">Perguntas frequentes</Heading>
          {[
            {
              question: "Qual o preço médio do tratamento?",
              answer: "A partir de 150",
            },
            {
              question: "Qual o horário de funcionamento?",
              answer: "De segunda a sexta, das 8h às 18h.",
            },
            {
              question: "Posso cancelar o tratamento?",
              answer: "Sim, com até 24h de antecedência.",
            },
          ].map((item, index) => (
            <AccordionItem key={index}>
              <Accordion
                onClick={() => toggleAccordion(index)}
                isOpen={openIndex === index}
              >
                <Text>{item.question}</Text>
              </Accordion>
              <Panel isOpen={openIndex === index}>
                <Text>{item.answer}</Text>
              </Panel>
            </AccordionItem>
          ))}
        </AccordionWrapper>
        <Questions>
          <Heading>Tem alguma mais dúvida?</Heading>
          <Text>Então envie um email para:</Text>
          <Gmail>
            <Image
              src={LogoGmail}
              width={80}
              quality={100}
              priority
              style={{ borderRadius: "4px" }}
              alt="logo Gmail"
            />

            <a
              href="mailto:mvaraujowebsites@gmail.com"
              style={{ textDecoration: "none" }}
              target="_parent"
            >
              <Text size="xl">petshop@gmail.com</Text>
            </a>
          </Gmail>
          <Text>Ou nos envie uma mensagem para:</Text>
          <Whatsapp>
            <Image
              src={LogoWhatsapp}
              width={80}
              quality={100}
              priority
              style={{ borderRadius: "4px" }}
              alt="logo whatsapp"
            />

            <a
              href="https://api.whatsapp.com/send?phone=5514982078002&text=Como+posso+te+ajudar%3F"
              style={{ textDecoration: "none" }}
              target="_parent"
            >
              <Text size="xl">14 982078002</Text>
            </a>
          </Whatsapp>
        </Questions>
      </Contacts>
      <UserForm />
      <Footer />
    </>
  );
}
