import { Text } from "@marcos-vinicius-design-system/react";
import { Container } from "./styles";
export function Footer() {
  const date = new Date().getFullYear();
  return (
    <Container>
      <Text>
        Copyright © {date} PetShop. Todos os direitos reservados.
      </Text>
    </Container>
  );
}
