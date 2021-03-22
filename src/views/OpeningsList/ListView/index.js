import React, { useState } from 'react';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import OpeningsDetails from './EditOpeningsDetails';
import CreateOpenings from './CreateOpeningsDetails';
import { useMutation,useQuery, gql } from '@apollo/client';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Modal from '../../../components/ModalIcon';
import ModalText from '../../../components/ModalText';
import marked from "../../../utils/marked"
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
import { Trash2 as TrashIcon, Edit as EditIcon} from 'react-feather';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  icon:{
    margin:'0 10px',
    cursor:'pointer'
  }
}));

const OpeningsDelete = gql`
  mutation OpeningsDelete($id:ID!){
    deleteOpening(
      id:$id
    )
  }
`;
const OpeningsQuery = gql`
  query OpeningsQuery($page:Int!, $limit:Int!){
    paginateOpenings(page:$page, limit:$limit) {
      docs{
        id
        title
        link
        description
        minqualifications
        prefqualifications
      }
      total
    }
  }
`;

const OpeningsEdit = gql`
  mutation OpeningsEdit($id:ID!, $title:String!, $link:String!, $description:String!, $minqualifications:String!, $prefqualifications:String!){
    updateOpening(
      id:$id
      title:$title
      link:$link
      description:$description
      minqualifications:$minqualifications
      prefqualifications:$prefqualifications
  ),{
    id
   
  }
  }
`;
const OpeningsCreate = gql`
  mutation OpeningsCreate( $title:String!, $link:String!, $description:String!, $minqualifications:String!, $prefqualifications:String!){
    createOpening(
      title:$title
      link:$link
      description:$description
      minqualifications:$minqualifications
      prefqualifications:$prefqualifications
  ),{
    id
   
  }
  }
`;


const OpeningsList = (props) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);
  const { loading, error, data } = useQuery(OpeningsQuery, {
    variables: { page:page, limit:limit },
  });
  const [mutationDelete] = useMutation(OpeningsDelete,{
    
    refetchQueries: [
      { query: OpeningsQuery,
       variables: { page:page, limit:limit }
       }
    ]
  });
  const [mutationEdit] = useMutation(OpeningsEdit,{
    refetchQueries: [
      { query: OpeningsQuery,
       variables: { page:page, limit:limit }
       }
    ]
  });  
  const [mutationCreate] = useMutation(OpeningsCreate,{
    refetchQueries: [
      { query: OpeningsQuery,
       variables: { page:page, limit:limit }
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
    setPage(newPage+1);
  };
  const deleteOpening = (id) => {
    mutationDelete({ variables: { id } })
  };
  const editOpening = (values) => {
    mutationEdit({ variables: values })
    setEdit(false)
  };
  const createOpening = (values) => {
    mutationCreate({ variables: values })
    setCreate(false)
  };
 
  return (
    <Page
      className={classes.root}
      title="Openings"
    >
      <Container maxWidth={false}>
      {edit==false && create==false?
      <>
        <Toolbar create={setCreate} />
        <Box mt={3}>
          {loading?'':
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
                        Description
                      </TableCell>
                      <TableCell>
                        Minimum Qualifications
                      </TableCell>
                      <TableCell>
                        Preferred Qualifications
                      </TableCell>
                      <TableCell>
                        Link
                      </TableCell>
                      
                      <TableCell>
                        
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.paginateOpenings.docs.slice(0, limit).map((opening) => (
                      <TableRow
                        hover
                        key={opening.id}
                      >
                        
                        <TableCell>
                          <Box
                            alignItems="center"
                            display="flex"
                          >
                          
                            <Typography
                              color="textPrimary"
                              variant="body1"
                            >
                              {opening.title}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <ModalText title="Description" text={marked(opening.description)}/>
                        </TableCell>
                        <TableCell size="small">
                          <ModalText title="Minimum Qualifications" text={opening.minqualifications}/>
                        </TableCell>
                        <TableCell size="small">
                          <ModalText title="Preferred Qualifications" text={opening.prefqualifications}/>
                        </TableCell>
                        <TableCell>
                          <a href={opening.link}>Link</a>
                        </TableCell>
                        <TableCell>
                          <Modal
                            className={classes.icon}
                            icon={TrashIcon}
                          >
                            <CardHeader
                            subheader={'Are you sure you want to delete the opening "'+opening.title+'"?'}
                            title="Delete opening"
                          />
                          <Button
                            variant="contained"
                            style={{margin:10,backgroundColor:"#8B0000",color:'#fff'}}
                            onClick={()=>deleteOpening(opening.id)}
                          >
                            Delete
                          </Button>
                          </Modal>
                          
                          <EditIcon onClick={()=>defineEdit(opening)} className={classes.icon}/>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </PerfectScrollbar>
            <TablePagination
              component="div"
              count={data.paginateOpenings.total}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handleLimitChange}
              page={page-1}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25]}
              
            />
          </Card>
          }
        </Box>
        </>
        :
        <>
        {edit!==false?<OpeningsDetails set={setEdit} edit={editOpening} details={edit}/>:''}
        {create!==false?<CreateOpenings set={setCreate} create={createOpening} />:''}
        </>
        }
      </Container>
    </Page>
  );
};

export default (OpeningsList);

