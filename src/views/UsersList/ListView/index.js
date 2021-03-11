import React, { useState } from 'react';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import UsersDetails from './EditUsersDetails';
import CreateUsers from './CreateUsersDetails';
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

const UsersDelete = gql`
  mutation UsersDelete($id:ID!){
    deleteUser(
      id:$id
    )
  }
`;
const UsersQuery = gql`
  query UsersQuery($page:Int!, $limit:Int!){
    paginateUsers(page:$page, limit:$limit) {
      docs{
        id
        name
        login
      }
      total
    }
  }
`;
const UsersEdit = gql`
  mutation UsersEdit($id:ID!, $name:String!, $login:String!){
    updateUser(
      id:$id
      name:$name
      login:$login
  ),{
    id
   
  }
  }
`;
const UsersCreate = gql`
  mutation UsersCreate( $name:String!, $login:String!, $password:String!){
    createUser(
      name:$name
      login:$login
      password:$password
  ),{
    id
   
  }
  }
`;


const UsersList = (props) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);
  const { loading, error, data } = useQuery(UsersQuery, {
    variables: { page:page, limit:limit },
  });
  const [mutationDelete] = useMutation(UsersDelete,{
    
    refetchQueries: [
      { query: UsersQuery,
       variables: { page:page, limit:limit }
       }
    ]
  });
  const [mutationEdit] = useMutation(UsersEdit,{
    refetchQueries: [
      { query: UsersQuery,
       variables: { page:page, limit:limit }
       }
    ]
  });  
  const [mutationCreate] = useMutation(UsersCreate,{
    refetchQueries: [
      { query: UsersQuery,
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
  const deleteUser = (id) => {
    mutationDelete({ variables: { id } })
  };
  const editUser = (values) => {
   
    mutationEdit({ variables: values })
    setEdit(false)
  };
  const createUser = (values) => {
    mutationCreate({ variables: values })
    setCreate(false)
  };
 
  return (
    <Page
      className={classes.root}
      title="Users"
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
                        Name
                      </TableCell>
                      <TableCell>
                        Login
                      </TableCell>
                      
                      <TableCell>
                        
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.paginateUsers.docs.slice(0, limit).map((user) => (
                      <TableRow
                        hover
                        key={user.id}
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
                              {user.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                              {user.login}
                        </TableCell>
                        <TableCell>
                          <Modal
                            className={classes.icon}
                            icon={TrashIcon}
                          >
                            <CardHeader
                            subheader={'Are you sure you want to delete the user "'+user.name+'"?'}
                            title="Delete user"
                          />
                          <Button
                            variant="contained"
                            style={{margin:10,backgroundColor:"#8B0000",color:'#fff'}}
                            onClick={()=>deleteUser(user.id)}
                          >
                            Delete
                          </Button>
                          </Modal>
                          
                          <EditIcon onClick={()=>defineEdit(user)} className={classes.icon}/>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </PerfectScrollbar>
            <TablePagination
              component="div"
              count={data.paginateUsers.total}
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
        {edit!==false?<UsersDetails set={setEdit} edit={editUser} details={edit}/>:''}
        {create!==false?<CreateUsers set={setCreate} create={createUser} />:''}
        </>
        }
      </Container>
    </Page>
  );
};

export default (UsersList);

