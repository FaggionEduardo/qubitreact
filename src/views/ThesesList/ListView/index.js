import React, { useState } from 'react';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import ThesesDetails from './EditThesesDetails';
import CreateTheses from './CreateThesesDetails';
import { useMutation,useQuery, gql } from '@apollo/client';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Modal from '../../../components/ModalIcon';
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

const ThesesDelete = gql`
  mutation ThesesDelete($id:ID!){
    deleteThese(
      id:$id
    )
  }
`;
const ThesesQuery = gql`
  query ThesesQuery($page:Int!, $limit:Int!){
    paginateTheses(page:$page, limit:$limit) {
      docs{
        id
        title
        link
      }
      total
    }
  }
`;
const ThesesEdit = gql`
  mutation ThesesEdit($id:ID!, $title:String!, $link:String!){
    updateThese(
      id:$id
      title:$title
      link:$link
  ),{
    id
   
  }
  }
`;
const ThesesCreate = gql`
  mutation ThesesCreate( $title:String!, $link:String!){
    createThese(
      title:$title
      link:$link
  ),{
    id
   
  }
  }
`;


const ThesesList = (props) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);
  const { loading, error, data } = useQuery(ThesesQuery, {
    variables: { page:page, limit:limit },
  });
  const [mutationDelete] = useMutation(ThesesDelete,{
    
    refetchQueries: [
      { query: ThesesQuery,
       variables: { page:page, limit:limit }
       }
    ]
  });
  const [mutationEdit] = useMutation(ThesesEdit,{
    refetchQueries: [
      { query: ThesesQuery,
       variables: { page:page, limit:limit }
       }
    ]
  });  
  const [mutationCreate] = useMutation(ThesesCreate,{
    refetchQueries: [
      { query: ThesesQuery,
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
  const deleteThese = (id) => {
    mutationDelete({ variables: { id } })
  };
  const editThese = (values) => {
   
    mutationEdit({ variables: values })
    setEdit(false)
  };
  const createThese = (values) => {
    mutationCreate({ variables: values })
    setCreate(false)
  };
 
  return (
    <Page
      className={classes.root}
      title="Theses"
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
                        Link
                      </TableCell>
                      
                      <TableCell>
                        
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.paginateTheses.docs.slice(0, limit).map((these) => (
                      <TableRow
                        hover
                        key={these.id}
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
                              {these.title}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <a href={these.link}>{these.link}</a>
                        </TableCell>
                        <TableCell>
                          <Modal
                            className={classes.icon}
                            icon={TrashIcon}
                          >
                            <CardHeader
                            subheader={'Are you sure you want to delete the these "'+these.title+'"?'}
                            title="Delete these"
                          />
                          <Button
                            variant="contained"
                            style={{margin:10,backgroundColor:"#8B0000",color:'#fff'}}
                            onClick={()=>deleteThese(these.id)}
                          >
                            Delete
                          </Button>
                          </Modal>
                          
                          <EditIcon onClick={()=>defineEdit(these)} className={classes.icon}/>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </PerfectScrollbar>
            <TablePagination
              component="div"
              count={data.paginateTheses.total}
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
        {edit!==false?<ThesesDetails set={setEdit} edit={editThese} details={edit}/>:''}
        {create!==false?<CreateTheses set={setCreate} create={createThese} />:''}
        </>
        }
      </Container>
    </Page>
  );
};

export default (ThesesList);

