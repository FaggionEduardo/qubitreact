import React, { useState } from 'react';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import MediasDetails from './EditMediasDetails';
import CreateMedias from './CreateMediasDetails';
import { useMutation, useQuery, gql } from '@apollo/client';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Modal from '../../../components/ModalIcon';
import ModalText from '../../../components/ModalText'
import marked from '../../../utils/marked'
import {
  Avatar,
  Box,
  Card,
  Container,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
  CardHeader,
  TextField,
  Button
} from '@material-ui/core';
import { Trash2 as TrashIcon, Edit as EditIcon } from 'react-feather';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  icon: {
    margin: '0 10px',
    cursor: 'pointer'
  }
}));

const MediasDelete = gql`
  mutation MediasDelete($id:ID!){
    deleteMedia(
      id:$id
    )
  }
`;
const MediasQuery = gql`
  query MediasQuery($page:Int!, $limit:Int!){
    paginateMedias(page:$page, limit:$limit) {
      docs{
        id
        title
        link
      }
      total
    }
  }
`;
const MediasEdit = gql`
  mutation MediasEdit($id:ID!, $title:String!, $link:String!){
    updateMedia(
      id:$id
      title:$title
      link:$link
  ),{
    id
   
  }
  }
`;
const MediasCreate = gql`
  mutation MediasCreate( $title:String!, $link:String!){
    createMedia(
      title:$title
      link:$link
  ),{
    id
   
  }
  }
`;


const MediasList = (props) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);
  const { loading, error, data } = useQuery(MediasQuery, {
    variables: { page: page, limit: limit },
  });
  const [mutationDelete] = useMutation(MediasDelete, {

    refetchQueries: [
      {
        query: MediasQuery,
        variables: { page: page, limit: limit }
      }
    ]
  });
  const [mutationEdit] = useMutation(MediasEdit, {
    refetchQueries: [
      {
        query: MediasQuery,
        variables: { page: page, limit: limit }
      }
    ]
  });
  const [mutationCreate] = useMutation(MediasCreate, {
    refetchQueries: [
      {
        query: MediasQuery,
        variables: { page: page, limit: limit }
      }
    ]
  });


  if (error) return <p>Error :(</p>;


  const defineEdit = (obj) => {
    setEdit(obj)
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage + 1);
  };
  const deleteMedia = (id) => {
    mutationDelete({ variables: { id } })
  };
  const editMedia = (values) => {

    mutationEdit({ variables: values })
    setEdit(false)
  };
  const createMedia = (values) => {
    mutationCreate({ variables: values })
    setCreate(false)
  };

  return (
    <Page
      className={classes.root}
      title="Media attention"
    >
      <Container maxWidth={false}>
        {edit == false && create == false ?
          <>
            <Toolbar create={setCreate} />
            <Box mt={3}>
              {loading ? '' :
                <Card>
                  <PerfectScrollbar>
                    <Box minWidth={1050}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              Title
                      </TableCell>
                            <TableCell>
                              Link
                      </TableCell>

                            <TableCell>

                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {data.paginateMedias.docs.slice(0, limit).map((media) => (
                            <TableRow
                              hover
                              key={media.id}
                            >

                              <TableCell>
                                <Box
                                  alignItems="center"
                                  display="flex"
                                >


                                  <ModalText title="Title" text={marked(media.title)} />

                                </Box>
                              </TableCell>
                              <TableCell>
                                <a href={media.link}>{media.link}</a>
                              </TableCell>
                              <TableCell>
                                <Modal
                                  className={classes.icon}
                                  icon={TrashIcon}
                                >
                                  <CardHeader
                                    subheader={'Are you sure you want to delete the media "' + media.title + '"?'}
                                    title="Delete media"
                                  />
                                  <Button
                                    variant="contained"
                                    style={{ margin: 10, backgroundColor: "#8B0000", color: '#fff' }}
                                    onClick={() => deleteMedia(media.id)}
                                  >
                                    Delete
                          </Button>
                                </Modal>

                                <EditIcon onClick={() => defineEdit(media)} className={classes.icon} />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </PerfectScrollbar>
                  <TablePagination
                    component="div"
                    count={data.paginateMedias.total}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handleLimitChange}
                    page={page - 1}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[5, 10, 25]}

                  />
                </Card>
              }
            </Box>
          </>
          :
          <>
            {edit !== false ? <MediasDetails set={setEdit} edit={editMedia} details={edit} /> : ''}
            {create !== false ? <CreateMedias set={setCreate} create={createMedia} /> : ''}
          </>
        }
      </Container>
    </Page>
  );
};

export default (MediasList);

