import React, { useState } from 'react';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import UpcomingsDetails from './EditUpcomingsDetails';
import CreateUpcomings from './CreateUpcomingsDetails';
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

const UpcomingsDelete = gql`
  mutation UpcomingsDelete($id:ID!){
    deleteUpcoming(
      id:$id
    )
  }
`;
const UpcomingsQuery = gql`
  query UpcomingsQuery($page:Int!, $limit:Int!){
    paginateUpcomings(page:$page, limit:$limit) {
      docs{
        id
        date
        text
        link
      }
      total
    }
  }
`;
const UpcomingsEdit = gql`
  mutation UpcomingsEdit($id:ID!, $text:String!, $link:String!, $date:String!){
    updateUpcoming(
      id:$id
      date:$date
      text:$text
      link:$link
  ),{
    id
   
  }
  }
`;
const UpcomingsCreate = gql`
  mutation UpcomingsCreate( $text:String!, $link:String!, $date:String!){
    createUpcoming(
      date:$date
      text:$text
      link:$link
  ),{
    id
   
  }
  }
`;


const UpcomingsList = (props) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);
  const { loading, error, data } = useQuery(UpcomingsQuery, {
    variables: { page:page, limit:limit },
  });
  const [mutationDelete] = useMutation(UpcomingsDelete,{
    
    refetchQueries: [
      { query: UpcomingsQuery,
       variables: { page:page, limit:limit }
       }
    ]
  });
  const [mutationEdit] = useMutation(UpcomingsEdit,{
    refetchQueries: [
      { query: UpcomingsQuery,
       variables: { page:page, limit:limit }
       }
    ]
  });  
  const [mutationCreate] = useMutation(UpcomingsCreate,{
    refetchQueries: [
      { query: UpcomingsQuery,
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
  const deleteUpcoming = (id) => {
    mutationDelete({ variables: { id } })
  };
  const editUpcoming = (values) => {
   
    mutationEdit({ variables: values })
    setEdit(false)
  };
  const createUpcoming = (values) => {
    mutationCreate({ variables: values })
    setCreate(false)
  };
  const addZeroes = (num, len) => {
    var numberWithZeroes = String(num);
    var counter = numberWithZeroes.length;
        
    while(counter < len) {
    
        numberWithZeroes = "0" + numberWithZeroes;
      
      counter++;
    
      }
    
    return numberWithZeroes;
  }
 
  return (
    <Page
      className={classes.root}
      title="Upcoming Talks"
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
                        Date
                      </TableCell>
                      <TableCell>
                        Text
                      </TableCell>
                      <TableCell>
                        Link
                      </TableCell>
                      
                      <TableCell>
                        
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.paginateUpcomings.docs.slice(0, limit).map((upcoming) => (
                      <TableRow
                        hover
                        key={upcoming.id}
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
                              {addZeroes(new Date(parseInt(upcoming.date)).getUTCMonth()+1,2)+"/"+addZeroes(new Date(parseInt(upcoming.date)).getUTCDate(),2)+"/"+new Date(parseInt(upcoming.date)).getUTCFullYear()}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <ModalText title="Text" text={marked(upcoming.text)}/> 
                        </TableCell>
                        <TableCell>
                          <a href={upcoming.link}>{upcoming.link}</a>
                        </TableCell>
                        <TableCell>
                          <Modal
                            className={classes.icon}
                            icon={TrashIcon}
                          >
                            <CardHeader
                            subheader={'Are you sure you want to delete the upcoming "'+upcoming.text+'"?'}
                            title="Delete upcoming"
                          />
                          <Button
                            variant="contained"
                            style={{margin:10,backgroundColor:"#8B0000",color:'#fff'}}
                            onClick={()=>deleteUpcoming(upcoming.id)}
                          >
                            Delete
                          </Button>
                          </Modal>
                          
                          <EditIcon onClick={()=>defineEdit(upcoming)} className={classes.icon}/>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </PerfectScrollbar>
            <TablePagination
              component="div"
              count={data.paginateUpcomings.total}
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
        {edit!==false?<UpcomingsDetails set={setEdit} edit={editUpcoming} details={edit}/>:''}
        {create!==false?<CreateUpcomings set={setCreate} create={createUpcoming} />:''}
        </>
        }
      </Container>
    </Page>
  );
};

export default (UpcomingsList);

