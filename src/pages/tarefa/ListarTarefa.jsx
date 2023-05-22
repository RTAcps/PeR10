import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";

import CriarTarefa from "./CriarTarefa";
import EditarTarefa from "./EditarTarefa";

//A função abaixo é usada para criar o array contendo os dados iniciais da listagem de tarefas.
function createData(
  idTarefa,
  tituloTarefa,
  descricaoTarefa,
  inicioTarefa,
  fimTarefa,
  statusTarefa,
  recursoTarefa
) {
  return {
    idTarefa,
    tituloTarefa,
    descricaoTarefa,
    inicioTarefa,
    fimTarefa,
    statusTarefa,
    recursoTarefa,
  };
}

//Definição do array contendo os dados iniciais da listagem de tarefas
const initialRows = [
  createData(
    1,
    "Tarefa 1",
    "Preparar relatório trimestral de vendas",
    "2023-02-05",
    "2023-02-18",
    "Concluída",
    "Computador"
  ),
  createData(
    2,
    "Tarefa 2",
    "Realizar pesquisa de mercado sobre concorrentes",
    "2023-03-10",
    "2023-03-30",
    "Concluída",
    "Tablet"
  ),
  createData(
    3,
    "Tarefa 3",
    "Desenvolver protótipo de novo produto",
    "2023-04-15",
    "2023-05-30",
    "Em andamento",
    "Impressora 3D"
  ),
  createData(
    4,
    "Tarefa 4",
    "Organizar treinamento para equipe de vendas",
    "2023-06-01",
    "2023-06-15",
    "Pendente",
    "Projetor"
  ),
  createData(
    5,
    "Tarefa 5",
    "Atualizar o conteúdo do site corporativo",
    "2023-07-25",
    "2023-08-15",
    "Pendente",
    "Notebook"
  ),
  createData(
    6,
    "Tarefa 6",
    "Realizar auditoria financeira interna",
    "2023-04-10",
    "2023-04-30",
    "Atrasada",
    "Pasta de arquivos"
  ),
];

//Componente ListarTarefa
const ListarTarefa = () => {
  const [open, setOpen] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const [tarefa, setTarefa] = useState();
  const [idTarefaSelecionada, setIdTarefaSelecionada] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenEditar = () => setOpenEditar(true);
  const handleCloseEditar = () => setOpenEditar(false);

  //O array definido acima é setado como conteúdo do state Tarefas na renderização inicial do componente.
  useEffect(() => {
    setTarefas(initialRows);
  }, []);

  const handleEditar = (id) => {
    setIdTarefaSelecionada(id);

    //Objeto local para armazenamento da tarefa filtrada de acordo com a seleção do usuário
    let tarefaParaEditar = tarefas.filter((obj) => {
      return obj.idTarefa === id;
    })[0];

    //Atribuição do Objeto local, setado acima, ao state Tarefa
    setTarefa(tarefaParaEditar);

    //Seta como true o state responsável pela exibição do Model de Editar Tarefa
    setOpenEditar(true);
  };

  const handleDeletar = (id) => {
    setTarefas((current) =>
      current.filter((tarefa) => {
        return tarefa.idTarefa !== id;
      })
    );
  };

  return (
    <>
      <Card>
        <CardHeader title="Tarefas" subheader="Listagem de Tarefas" />
        <CardContent>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell align="center">Título</TableCell>
                  <TableCell align="center">Descrição</TableCell>
                  <TableCell align="center">Data de Início</TableCell>
                  <TableCell align="center">Data de Finalização</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Recurso</TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tarefas.map((row, indice) => (
                  <TableRow
                    key={indice}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.idTarefa}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.tituloTarefa}
                    </TableCell>
                    <TableCell align="center">{row.descricaoTarefa}</TableCell>
                    <TableCell align="center">{row.inicioTarefa}</TableCell>
                    <TableCell align="center">{row.fimTarefa}</TableCell>
                    <TableCell align="center">{row.statusTarefa}</TableCell>
                    <TableCell align="center">{row.recursoTarefa}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleEditar(row.idTarefa)}
                      >
                        <EditIcon fontSize="small" />
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeletar(row.idTarefa)}
                      >
                        <DeleteIcon fontSize="small" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        <CardActions>
          <Button size="small" variant="contained" onClick={handleOpen}>
            Criar Tarefa
          </Button>
          <Button size="small" variant="outlined">
            Cancelar
          </Button>
        </CardActions>
      </Card>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div>
            <CriarTarefa
              handleClose={handleClose}
              tarefas={tarefas}
              setTarefas={setTarefas}
            />
          </div>
        </Modal>
      </div>
      <div>
        <Modal
          open={openEditar}
          onClose={handleCloseEditar}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div>
            <EditarTarefa
              handleCloseEditar={handleCloseEditar}
              idTarefaSelecionada={idTarefaSelecionada}
              tarefas={tarefas}
              tarefa={tarefa}
              setTarefas={setTarefas}
            />
          </div>
        </Modal>
      </div>
    </>
  );
};

export default ListarTarefa;
