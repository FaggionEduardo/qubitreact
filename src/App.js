import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import PrivateRoute from "./routes/PrivateRoute";
import UnPrivateRoute from "./routes/UnPrivateRoute";
import AuthProvider from "./providers/Auth";
import Dashboard from "./layouts/DashboardLayout"
import Page from "./layouts/PageLayout"
import Main from "./layouts/MainLayout"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginView from 'src/views/auth';
import CoursesList from 'src/views/CoursesList/ListView';
import Courses from 'src/views/Courses';
import BooksList from 'src/views/BooksList/ListView';
import Books from 'src/views/Books';
import MembersList from 'src/views/MembersList/ListView';
import NewsList from 'src/views/NewsList/ListView';
import OpeningsList from 'src/views/OpeningsList/ListView';
import Openings from 'src/views/Openings';
import ProjectsList from 'src/views/ProjectsList/ListView';
import PublicationsList from 'src/views/PublicationsList/ListView';
import TalksList from 'src/views/TalksList/ListView';
import ThesesList from 'src/views/ThesesList/ListView';
import Theses from 'src/views/Theses';
import UpcomingsList from 'src/views/UpcomingsList/ListView';
import Users from 'src/views/UsersList/ListView';
import Home from 'src/views/Home';
import News from 'src/views/News';
import Upcomings from 'src/views/Upcomings';
import Talks from 'src/views/Talks';
import Team from 'src/views/Team';
import Projects from 'src/views/Projects';
import Publications from 'src/views/Publications';

const App = () => {
 

  return (
    <Router>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>  
            <Switch>
            <Route
            exact 
            path="/" 
            component={() => <Page Children={Home} />} 
            />
            <Route
            exact 
            path="/news" 
            component={() => <Page Children={News} />} 
            />
            <Route
            exact 
            path="/upcomings" 
            component={() => <Page Children={Upcomings} />} 
            />
            <Route
            exact 
            path="/talks" 
            component={() => <Page Children={Talks} />} 
            />
            <Route
            exact 
            path="/team" 
            component={() => <Page Children={Team} />} 
            />
            <Route
            exact 
            path="/projects" 
            component={() => <Page Children={Projects} />} 
            />
            <Route
            exact 
            path="/publications" 
            component={() => <Page Children={Publications} />} 
            />
            <Route
            exact 
            path="/theses" 
            component={() => <Page Children={Theses} />} 
            />
            <Route
            exact 
            path="/books" 
            component={() => <Page Children={Books} />} 
            />
            <Route
            exact 
            path="/courses" 
            component={() => <Page Children={Courses} />} 
            />
            <Route
            exact 
            path="/openings" 
            component={() => <Page Children={Openings} />} 
            />
            
            <UnPrivateRoute
             exact 
             path="/admin" 
             component={() => <Main Children={LoginView} />} 
             />
          
            <PrivateRoute
              exact
              path="/admin/books"
              component={() => <Dashboard Children={BooksList} />}
            />

            <PrivateRoute
              exact
              path="/admin/courses"
              component={() => <Dashboard Children={CoursesList} />}
            />

            <PrivateRoute
              exact
              path="/admin/members"
              component={() => <Dashboard Children={MembersList} />}
            />

            <PrivateRoute
              exact
              path="/admin/news"
              component={() => <Dashboard Children={NewsList} />}
            />

            <PrivateRoute
              exact
              path="/admin/openings"
              component={() => <Dashboard Children={OpeningsList} />}
            />

            <PrivateRoute
              exact
              path="/admin/projects"
              component={() => <Dashboard Children={ProjectsList} />}
            />
            
            <PrivateRoute
              exact
              path="/admin/publications"
              component={() => <Dashboard Children={PublicationsList} />}
            />

            <PrivateRoute
              exact
              path="/admin/talks"
              component={() => <Dashboard Children={TalksList} />}
            />

            <PrivateRoute
              exact
              path="/admin/theses"
              component={() => <Dashboard Children={ThesesList} />}
            />

            <PrivateRoute
              exact
              path="/admin/upcomings"
              component={() => <Dashboard Children={UpcomingsList} />}
            />

            <PrivateRoute
              exact
              path="/admin/users"
              component={() => <Dashboard Children={Users} />}
            />
          </Switch>
    </AuthProvider>
    </ThemeProvider>
    </Router>
  );
};

export default App;
