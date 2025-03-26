import { Heading, Text } from "@marcos-vinicius-design-system/react";
import Image from "next/image";
import { Container, Hero, Imagem, Preview } from "./styles";

import previewImage from "../../assets/agenda.jpg";

import { UserForm } from "../home/components/UserForm.ts";
import { NextSeo } from "next-seo";
import { Header } from "../home/components/Header";
import { Do } from "../home/components/Do";
import { Footer } from "../home/components/Footer";
import { SocialMedia } from "./components/SocialMedia";
export default function Contact() {
  return (
    <>
      <NextSeo
        title="PetShop"
        description="PetShop. Agende seu horário e tenha o melhor sorriso."
      />
      <Header />
      <Container>
        <Preview>
          <Imagem src={previewImage} quality={100} priority alt="" />
        </Preview>
        <Hero>
          <Heading size="2xl"> Entre em contato conosco: </Heading>

          <SocialMedia />
        </Hero>
      </Container>
      <Footer />
    </>
  );
}
