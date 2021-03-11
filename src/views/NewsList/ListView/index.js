import React, { useState } from 'react';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import NewsDetails from './EditNewsDetails';
import CreateNews from './CreateNewsDetails';
import { useMutation,useQuery, gql } from '@apollo/client';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Modal from '../../../components/ModalIcon';
import ModalImage from '../../../components/ModalImage';
import ModalText from '../../../components/ModalText';
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

const NewsDelete = gql`
  mutation NewsDelete($id:ID!){
    deleteNews(
      id:$id
    )
  }
`;
const NewsQuery = gql`
  query NewsQuery($page:Int!, $limit:Int!){
    paginateNews(page:$page, limit:$limit) {
      docs{
        id
        date
        text
        urlname
        url
        imagename
        image64
      }
      total
    }
  }
`;

const NewsEdit = gql`
  mutation NewsEdit($id:ID!, $date:String!, $text:String!, $urlname:String!, $url:String!, $imagename:String!, $image64:String!){
    updateNews(
      id:$id
      date:$date
      text:$text
      urlname:$urlname
      url:$url
      imagename:$imagename
      image64:$image64
  ),{
    id
   
  }
  }
`;
const NewsCreate = gql`
  mutation NewsCreate( $date:String!, $text:String!, $urlname:String!, $url:String!, $imagename:String!, $image64:String!){
    createNews(
      date:$date
      text:$text
      urlname:$urlname
      url:$url
      imagename:$imagename
      image64:$image64
  ),{
    id
   
  }
  }
`;


const NewsList = (props) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);
  const { loading, error, data } = useQuery(NewsQuery, {
    variables: { page:page, limit:limit },
  });
  const [mutationDelete] = useMutation(NewsDelete,{
    
    refetchQueries: [
      { query: NewsQuery,
       variables: { page:page, limit:limit }
       }
    ]
  });
  const [mutationEdit] = useMutation(NewsEdit,{
    refetchQueries: [
      { query: NewsQuery,
       variables: { page:page, limit:limit }
       }
    ]
  });  
  const [mutationCreate] = useMutation(NewsCreate,{
    refetchQueries: [
      { query: NewsQuery,
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
  const deleteNews = (id) => {
    mutationDelete({ variables: { id } })
  };
  const editNews = (values) => {
    mutationEdit({ variables: values })
    setEdit(false)
  };
  const createNews = (values) => {
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
      title="News"
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
                        Image
                      </TableCell>
                      
                      <TableCell>
                        
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.paginateNews.docs.slice(0, limit).map((news) => (
                      <TableRow
                        hover
                        key={news.id}
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
                              {addZeroes(new Date(parseInt(news.date)).getUTCMonth()+1,2)+"/"+addZeroes(new Date(parseInt(news.date)).getUTCDate(),2)+"/"+new Date(parseInt(news.date)).getUTCFullYear()}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <ModalText title="Text" text={news.text}/>
                        </TableCell>
                        <TableCell>
                          <a href={news.url}>{news.urlname}</a>
                        </TableCell>
                        <TableCell>
                          <ModalImage text={news.imagename} img={news.image64}/>
                         
                        </TableCell>
                        <TableCell>
                          <Modal
                            className={classes.icon}
                            icon={TrashIcon}
                          >
                            <CardHeader
                            subheader={'Are you sure you want to delete the news?'}
                            title="Delete news"
                          />
                          <Button
                            variant="contained"
                            style={{margin:10,backgroundColor:"#8B0000",color:'#fff'}}
                            onClick={()=>deleteNews(news.id)}
                          >
                            Delete
                          </Button>
                          </Modal>
                          
                          <EditIcon onClick={()=>defineEdit(news)} className={classes.icon}/>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </PerfectScrollbar>
            <TablePagination
              component="div"
              count={data.paginateNews.total}
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
        {edit!==false?<NewsDetails set={setEdit} edit={editNews} details={edit}/>:''}
        {create!==false?<CreateNews set={setCreate} create={createNews} />:''}
        </>
        }
      </Container>
    </Page>
  );
};

export default (NewsList);

