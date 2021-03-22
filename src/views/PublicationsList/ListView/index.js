import React, { useState } from 'react';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import PublicationsDetails from './EditPublicationsDetails';
import CreatePublications from './CreatePublicationsDetails';
import { useMutation,useQuery, gql } from '@apollo/client';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Modal from '../../../components/ModalIcon';
import ModalImage from '../../../components/ModalImage';
import ModalText from '../../../components/ModalText';
import ModalLinks from '../../../components/ModalLinks';
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

const PublicationsDelete = gql`
  mutation PublicationsDelete($id:ID!){
    deletePublication(
      id:$id
    )
  }
`;
const PublicationsQuery = gql`
  query PublicationsQuery($page:Int!, $limit:Int!){
    paginatePublications(page:$page, limit:$limit) {
      docs{
        id
        title
        description
        linknames
        links
        imagename
        image64
      }
      total
    }
  }
`;

const PublicationsEdit = gql`
  mutation PublicationsEdit($id:ID!, $title:String!, $description:String!, $linknames:String!, $links:String!, $imagename:String!, $image64:String!){
    updatePublication(
      id:$id
      title:$title
      description:$description
      linknames:$linknames
      links:$links
      imagename:$imagename
      image64:$image64
  ),{
    id
   
  }
  }
`;
const PublicationsCreate = gql`
  mutation PublicationsCreate($title:String!, $description:String!, $linknames:String!, $links:String!, $imagename:String!, $image64:String!){
    createPublication(
      title:$title
      description:$description
      linknames:$linknames
      links:$links
      imagename:$imagename
      image64:$image64
      
  ),{
    id
   
  }
  }
`;


const PublicationsList = (props) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);
  const { loading, error, data } = useQuery(PublicationsQuery, {
    variables: { page:page, limit:limit },
  });
  const [mutationDelete] = useMutation(PublicationsDelete,{
    
    refetchQueries: [
      { query: PublicationsQuery,
       variables: { page:page, limit:limit }
       }
    ]
  });
  const [mutationEdit] = useMutation(PublicationsEdit,{
    refetchQueries: [
      { query: PublicationsQuery,
       variables: { page:page, limit:limit }
       }
    ]
  });  
  const [mutationCreate] = useMutation(PublicationsCreate,{
    refetchQueries: [
      { query: PublicationsQuery,
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
  const deletePublication = (id) => {
    mutationDelete({ variables: { id } })
  };
  const editPublication = (values) => {
    mutationEdit({ variables: values })
    setEdit(false)
  };
  const createPublication = (values) => {
    mutationCreate({ variables: values })
    setCreate(false)
  };
 
  return (
    <Page
      className={classes.root}
      title="Publications"
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
                        Links
                      </TableCell>
                      <TableCell>
                        Image
                      </TableCell>
                      
                      <TableCell>
                        
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.paginatePublications.docs.slice(0, limit).map((publication) => (
                      <TableRow
                        hover
                        key={publication.id}
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
                           <ModalText title="Title" text={marked(publication.title)}/> 
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                        <ModalText title="Description" text={marked(publication.description)}/>
                        </TableCell>
                        <TableCell>
                          <ModalLinks title="Links" array={{names:publication.linknames,links:publication.links}}/>
                        </TableCell>
                        <TableCell>
                          <ModalImage text={publication.imagename} img={publication.image64}/>
                        </TableCell>
                        <TableCell>
                          <Modal
                            className={classes.icon}
                            icon={TrashIcon}
                          >
                            <CardHeader
                            subheader={'Are you sure you want to delete the publication "'+publication.title+'"?'}
                            title="Delete publication"
                          />
                          <Button
                            variant="contained"
                            style={{margin:10,backgroundColor:"#8B0000",color:'#fff'}}
                            onClick={()=>deletePublication(publication.id)}
                          >
                            Delete
                          </Button>
                          </Modal>
                          
                          <EditIcon onClick={()=>defineEdit(publication)} className={classes.icon}/>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </PerfectScrollbar>
            <TablePagination
              component="div"
              count={data.paginatePublications.total}
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
        {edit!==false?<PublicationsDetails set={setEdit} edit={editPublication} details={edit}/>:''}
        {create!==false?<CreatePublications set={setCreate} create={createPublication} />:''}
        </>
        }
      </Container>
    </Page>
  );
};

export default (PublicationsList);

