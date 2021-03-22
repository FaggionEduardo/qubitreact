import React, { useState } from 'react';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import TalksDetails from './EditTalksDetails';
import CreateTalks from './CreateTalksDetails';
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

const TalksDelete = gql`
  mutation TalksDelete($id:ID!){
    deleteTalk(
      id:$id
    )
  }
`;
const TalksQuery = gql`
  query TalksQuery($page:Int!, $limit:Int!){
    paginateTalks(page:$page, limit:$limit) {
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
const TalksEdit = gql`
  mutation TalksEdit($id:ID!, $text:String!, $link:String!, $date:String!){
    updateTalk(
      id:$id
      date:$date
      text:$text
      link:$link
  ),{
    id
   
  }
  }
`;
const TalksCreate = gql`
  mutation TalksCreate( $text:String!, $link:String!, $date:String!){
    createTalk(
      date:$date
      text:$text
      link:$link
  ),{
    id
   
  }
  }
`;


const TalksList = (props) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);
  const { loading, error, data } = useQuery(TalksQuery, {
    variables: { page:page, limit:limit },
  });
  const [mutationDelete] = useMutation(TalksDelete,{
    
    refetchQueries: [
      { query: TalksQuery,
       variables: { page:page, limit:limit }
       }
    ]
  });
  const [mutationEdit] = useMutation(TalksEdit,{
    refetchQueries: [
      { query: TalksQuery,
       variables: { page:page, limit:limit }
       }
    ]
  });  
  const [mutationCreate] = useMutation(TalksCreate,{
    refetchQueries: [
      { query: TalksQuery,
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
  const deleteTalk = (id) => {
    mutationDelete({ variables: { id } })
  };
  const editTalk = (values) => {
   
    mutationEdit({ variables: values })
    setEdit(false)
  };
  const createTalk = (values) => {
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
      title="Talks"
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
                    {data.paginateTalks.docs.slice(0, limit).map((talk) => (
                      <TableRow
                        hover
                        key={talk.id}
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
                              {addZeroes(new Date(parseInt(talk.date)).getUTCMonth()+1,2)+"/"+addZeroes(new Date(parseInt(talk.date)).getUTCDate(),2)+"/"+new Date(parseInt(talk.date)).getUTCFullYear()}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <ModalText title="Text" text={marked(talk.text)}/> 
                        </TableCell>
                        <TableCell>
                          <a href={talk.link}>{talk.link}</a>
                        </TableCell>
                        <TableCell>
                          <Modal
                            className={classes.icon}
                            icon={TrashIcon}
                          >
                            <CardHeader
                            subheader={'Are you sure you want to delete the talk "'+talk.text+'"?'}
                            title="Delete talk"
                          />
                          <Button
                            variant="contained"
                            style={{margin:10,backgroundColor:"#8B0000",color:'#fff'}}
                            onClick={()=>deleteTalk(talk.id)}
                          >
                            Delete
                          </Button>
                          </Modal>
                          
                          <EditIcon onClick={()=>defineEdit(talk)} className={classes.icon}/>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </PerfectScrollbar>
            <TablePagination
              component="div"
              count={data.paginateTalks.total}
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
        {edit!==false?<TalksDetails set={setEdit} edit={editTalk} details={edit}/>:''}
        {create!==false?<CreateTalks set={setCreate} create={createTalk} />:''}
        </>
        }
      </Container>
    </Page>
  );
};

export default (TalksList);

