export const corsConfig = () => {
  return {
    origin: `${process.env.CLIENT_URL}`,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  };
};
