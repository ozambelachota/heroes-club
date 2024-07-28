import { Container, Typography } from "@mui/material";
import FormCreateDocente from "./components/form-create-docente";
import ListDocentes from "./components/list-docente";

function Docente() {
  return (
    <div className="flex flex-col gap-4">
      <Typography variant="h3" align="center">
        Administrar docente
      </Typography>
      <Container maxWidth="sm">
        <FormCreateDocente />
      </Container>
      <Container maxWidth="md">
        <ListDocentes />
      </Container>
    </div>
  );
}

export default Docente;
