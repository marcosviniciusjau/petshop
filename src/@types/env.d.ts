declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_DATABASE_URL: string;
    NEXT_API_KEY: string;
    NEXT_GOOGLE_CLIENT_ID: string;
    NEXT_GOOGLE_CLIENT_SECRET: string;
    NEXT_AUTH_SECRET: string;
    NEXT_EMAIL_OWNER: string;
    NEXT_JWT_SECRET: string;
    // Adicione outras variáveis conforme necessário
  }
}
