import React, { useState } from 'react';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import ProjectsDetails from './EditProjectsDetails';
import CreateProjects from './CreateProjectsDetails';
import { useMutation,useQuery, gql } from '@apollo/client';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Modal from '../../../components/ModalIcon';
import ModalImage from '../../../components/ModalImage';
import ModalText from '../../../components/ModalText';
import ModalLinks from '../../../components/ModalLinks';
import ModalMembers from '../../../components/ModalMembers';
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

const ProjectsDelete = gql`
  mutation ProjectsDelete($id:ID!){
    deleteProject(
      id:$id
    )
  }
`;
const ProjectsQuery = gql`
  query ProjectsQuery($page:Int!, $limit:Int!){
    paginateProjects(page:$page, limit:$limit) {
      docs{
        id
        title
        description
        linknames
        links
        imagename
        image64
        members
      }
      total
    }
  }
`;

const ProjectsEdit = gql`
  mutation ProjectsEdit($id:ID!, $title:String!, $description:String!, $linknames:String!, $links:String!, $imagename:String!, $image64:String!, $members:String!){
    updateProject(
      id:$id
      title:$title
      description:$description
      linknames:$linknames
      links:$links
      imagename:$imagename
      image64:$image64
      members:$members
  ),{
    id
   
  }
  }
`;
const ProjectsCreate = gql`
  mutation ProjectsCreate($title:String!, $description:String!, $linknames:String!, $links:String!, $imagename:String!, $image64:String!, $members:String!){
    createProject(
      title:$title
      description:$description
      linknames:$linknames
      links:$links
      imagename:$imagename
      image64:$image64
      members:$members
  ),{
    id
   
  }
  }
`;


const ProjectsList = (props) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);
  const { loading, error, data } = useQuery(ProjectsQuery, {
    variables: { page:page, limit:limit },
  });
  const [mutationDelete] = useMutation(ProjectsDelete,{
    
    refetchQueries: [
      { query: ProjectsQuery,
       variables: { page:page, limit:limit }
       }
    ]
  });
  const [mutationEdit] = useMutation(ProjectsEdit,{
    refetchQueries: [
      { query: ProjectsQuery,
       variables: { page:page, limit:limit }
       }
    ]
  });  
  const [mutationCreate] = useMutation(ProjectsCreate,{
    refetchQueries: [
      { query: ProjectsQuery,
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
  const deleteProject = (id) => {
    mutationDelete({ variables: { id } })
  };
  const editProject = (values) => {
    mutationEdit({ variables: values })
    setEdit(false)
  };
  const createProject = (values) => {
    mutationCreate({ variables: values })
    setCreate(false)
  };
 
  return (
    <Page
      className={classes.root}
      title="Projects"
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
                        Members
                      </TableCell>
                      <TableCell>
                        
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.paginateProjects.docs.slice(0, limit).map((project) => (
                      <TableRow
                        hover
                        key={project.id}
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
                              {project.title}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                        <ModalText title="Description" text={marked(project.description)}/>
                        </TableCell>
                        <TableCell>
                          <ModalLinks title="Links" array={{names:project.linknames,links:project.links}}/>
                        </TableCell>
                        <TableCell>
                          <ModalImage text={project.imagename} img={project.image64}/>
                        </TableCell>
                        <TableCell>
                          <ModalMembers title="Members" array={project.members}/>
                        </TableCell>
                        <TableCell>
                          <Modal
                            className={classes.icon}
                            icon={TrashIcon}
                          >
                            <CardHeader
                            subheader={'Are you sure you want to delete the project "'+project.title+'"?'}
                            title="Delete project"
                          />
                          <Button
                            variant="contained"
                            style={{margin:10,backgroundColor:"#8B0000",color:'#fff'}}
                            onClick={()=>deleteProject(project.id)}
                          >
                            Delete
                          </Button>
                          </Modal>
                          
                          <EditIcon onClick={()=>defineEdit(project)} className={classes.icon}/>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </PerfectScrollbar>
            <TablePagination
              component="div"
              count={data.paginateProjects.total}
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
        {edit!==false?<ProjectsDetails set={setEdit} edit={editProject} details={edit}/>:''}
        {create!==false?<CreateProjects set={setCreate} create={createProject} />:''}
        </>
        }
      </Container>
    </Page>
  );
};

export default (ProjectsList);

