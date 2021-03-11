import React, { useState } from 'react';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import CoursesDetails from './EditCoursesDetails';
import CreateCourses from './CreateCoursesDetails';
import { useMutation,useQuery, gql } from '@apollo/client';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Modal from '../../../components/ModalIcon';
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

const CoursesDelete = gql`
  mutation CoursesDelete($id:ID!){
    deleteCourse(
      id:$id
    )
  }
`;
const CoursesQuery = gql`
  query CoursesQuery($page:Int!, $limit:Int!){
    paginateCourses(page:$page, limit:$limit) {
      docs{
        id
        title
        cod
        description
        period
      }
      total
    }
  }
`;
const CoursesEdit = gql`
  mutation CoursesEdit($id:ID!, $title:String!, $cod:String!, $description:String!, $period:String!){
    updateCourse(
      id:$id
      title:$title
      cod:$cod
      description:$description
      period:$period
  ),{
    id
   
  }
  }
`;
const CoursesCreate = gql`
  mutation CoursesCreate( $title:String!, $cod:String!, $description:String!, $period:String!){
    createCourse(
      title:$title
      cod:$cod
      description:$description
      period:$period
  ),{
    id
   
  }
  }
`;


const CoursesList = (props) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);
  const { loading, error, data } = useQuery(CoursesQuery, {
    variables: { page:page, limit:limit },
  });
  const [mutationDelete] = useMutation(CoursesDelete,{
    
    refetchQueries: [
      { query: CoursesQuery,
       variables: { page:page, limit:limit }
       }
    ]
  });
  const [mutationEdit] = useMutation(CoursesEdit,{
    refetchQueries: [
      { query: CoursesQuery,
       variables: { page:page, limit:limit }
       }
    ]
  });  
  const [mutationCreate] = useMutation(CoursesCreate,{
    refetchQueries: [
      { query: CoursesQuery,
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
  const deleteCourse = (id) => {
    mutationDelete({ variables: { id } })
  };
  const editCourse = (values) => {
    
    mutationEdit({ variables: values })
    setEdit(false)
  };
  const createCourse = (values) => {
    mutationCreate({ variables: values })
    setCreate(false)
  };
 
  return (
    <Page
      className={classes.root}
      title="Courses"
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
                        Code
                      </TableCell>
                      <TableCell>
                        Description
                      </TableCell>
                      <TableCell>
                        Period
                      </TableCell>
                      <TableCell>
                        
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.paginateCourses.docs.slice(0, limit).map((course) => (
                      <TableRow
                        hover
                        key={course.id}
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
                              {course.title}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                              {course.cod}
                        </TableCell>
                        <TableCell>
                          <ModalText title="Description" text={course.description}/>
                              
                        </TableCell>
                        <TableCell>
                              {course.period}
                        </TableCell>
                        <TableCell>
                          <Modal
                            className={classes.icon}
                            icon={TrashIcon}
                          >
                            <CardHeader
                            subheader={'Are you sure you want to delete the course "'+course.title+'"?'}
                            title="Delete course"
                          />
                          <Button
                            variant="contained"
                            style={{margin:10,backgroundColor:"#8B0000",color:'#fff'}}
                            onClick={()=>deleteCourse(course.id)}
                          >
                            Delete
                          </Button>
                          </Modal>
                          
                          <EditIcon onClick={()=>defineEdit(course)} className={classes.icon}/>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </PerfectScrollbar>
            <TablePagination
              component="div"
              count={data.paginateCourses.total}
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
        {edit!==false?<CoursesDetails set={setEdit} edit={editCourse} details={edit}/>:''}
        {create!==false?<CreateCourses set={setCreate} create={createCourse} />:''}
        </>
        }
      </Container>
    </Page>
  );
};

export default (CoursesList);

