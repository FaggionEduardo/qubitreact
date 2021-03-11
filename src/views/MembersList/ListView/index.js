import React, { useState } from 'react';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import MembersDetails from './EditMembersDetails';
import CreateMembers from './CreateMembersDetails';
import { useMutation,useQuery, gql } from '@apollo/client';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Modal from '../../../components/ModalIcon';
import ModalImage from '../../../components/ModalImage';
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

const MembersDelete = gql`
  mutation MembersDelete($id:ID!){
    deleteMember(
      id:$id
    )
  }
`;
const MembersQuery = gql`
  query MembersQuery($page:Int!, $limit:Int!){
    paginateMembers(page:$page, limit:$limit) {
      docs{
        id
        name
        email
        acting
        profile64
      }
      total
    }
  }
`;

const MembersEdit = gql`
  mutation MembersEdit($id:ID!, $name:String!, $email:String!, $acting:String!, $profile64:String!){
    updateMember(
      id:$id
      name:$name
      email:$email
      acting:$acting
      profile64:$profile64
  ),{
    id
   
  }
  }
`;
const MembersCreate = gql`
  mutation MembersCreate( $name:String!, $email:String!, $acting:String!, $profile64:String!){
    createMember(
      name:$name
      email:$email
      acting:$acting
      profile64:$profile64
  ),{
    id
   
  }
  }
`;


const MembersList = (props) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);
  const { loading, error, data } = useQuery(MembersQuery, {
    variables: { page:page, limit:limit },
  });
  const [mutationDelete] = useMutation(MembersDelete,{
    
    refetchQueries: [
      { query: MembersQuery,
       variables: { page:page, limit:limit }
       }
    ]
  });
  const [mutationEdit] = useMutation(MembersEdit,{
    refetchQueries: [
      { query: MembersQuery,
       variables: { page:page, limit:limit }
       }
    ]
  });  
  const [mutationCreate] = useMutation(MembersCreate,{
    refetchQueries: [
      { query: MembersQuery,
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
  const deleteMember = (id) => {
    mutationDelete({ variables: { id } })
  };
  const editMember = (values) => {
    mutationEdit({ variables: values })
    setEdit(false)
  };
  const createMember = (values) => {
    mutationCreate({ variables: values })
    setCreate(false)
  };
 
  return (
    <Page
      className={classes.root}
      title="Team Members"
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
                        Email
                      </TableCell>
                      <TableCell>
                        Acting
                      </TableCell>
                      <TableCell>
                        Profile
                      </TableCell>
                      
                      <TableCell>
                        
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.paginateMembers.docs.slice(0, limit).map((member) => (
                      <TableRow
                        hover
                        key={member.id}
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
                              {member.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          {member.email}
                        </TableCell>
                        <TableCell>
                          {member.acting}
                        </TableCell>
                        <TableCell>
                          <ModalImage text="Profile" img={member.profile64}/>
                         
                        </TableCell>
                        <TableCell>
                          <Modal
                            className={classes.icon}
                            icon={TrashIcon}
                          >
                            <CardHeader
                            subheader={'Are you sure you want to delete the member "'+member.name+'"?'}
                            title="Delete member"
                          />
                          <Button
                            variant="contained"
                            style={{margin:10,backgroundColor:"#8B0000",color:'#fff'}}
                            onClick={()=>deleteMember(member.id)}
                          >
                            Delete
                          </Button>
                          </Modal>
                          
                          <EditIcon onClick={()=>defineEdit(member)} className={classes.icon}/>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </PerfectScrollbar>
            <TablePagination
              component="div"
              count={data.paginateMembers.total}
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
        {edit!==false?<MembersDetails set={setEdit} edit={editMember} details={edit}/>:''}
        {create!==false?<CreateMembers set={setCreate} create={createMember} />:''}
        </>
        }
      </Container>
    </Page>
  );
};

export default (MembersList);

