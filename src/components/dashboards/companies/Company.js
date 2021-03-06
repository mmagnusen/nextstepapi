import React from 'react';
import axios from 'axios';
import SingleDashboardJob from '../jobs/SingleDashboardJob.js';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import { filter } from 'rxjs/operator/filter';

class Company extends React.Component {
    constructor(props) {
        super(props);
        this.viewExistingCompany = this.viewExistingCompany.bind(this);
        this.filterJobs = this.filterJobs.bind(this);

        this.state = {
            viewCompanyModalIsOpen: false,

            companyInfo: this.props.companyInfo,
            companyDescription: this.props.companyDescription,
            companyId: this.props.companyId,
            allJobs: [],
            filteredJobs: [],
            userCompanies: this.props.userCompanies,
            companyName: this.props.companyName
            }

           
        
    }

    componentWillMount() {
        const getJobsEndpoint = '/job/job/';

        axios({
            method: 'get',
            url: getJobsEndpoint, 
            headers: {
                'Authorization': 'JWT '+localStorage.getItem('token')
                }, 
            responseType: 'json'
        })
        .then( response => { 
            if (response.status === 200) {
                this.setState({
                    allJobs: response.data,
                });
           
            } else {

            }

        })
        .then(
            () => {
                const filteredJobs = this.state.allJobs.filter((job) => job.posted_by_company == this.state.companyId );
        
                this.setState({
                    filteredJobs: filteredJobs
                });
        })
        .catch(error => {
            console.log("this is an error yo", error);
          })
    }

    viewExistingCompany() {
        this.setState({
            viewCompanyModalIsOpen: true
        })
        console.log('open company modal');
    }

    filterJobs(e) {
        e.preventDefault();
        const filteredJobs = this.state.allJobs.filter((job) => job.posted_by_company == this.state.companyId );
        this.setState({
            filteredJobs: filteredJobs
        });
    }





    render() {
        return (
            <div className="single-company">
                <div className="company-header">
                    <div className="company-header-title">
                        <h2>{this.state.companyInfo.name}</h2>
                    </div>
                    <div className="button-container">
                        <Link to={{ pathname: "/new_job", state: {companiesFromLink: this.state.userCompanies} }}><button className="add-job-to-company-button">Add new job for this company</button></Link>
                    </div>
                    <div className="button-container">
                        <Link to={"/view_company/" + this.state.companyId}><button className="view-company-button">View Company Page</button></Link>
                    </div>
    
                </div>
                
                <section>
                    <div className="company-postings-title">
                        <h1>Job Postings for {this.state.companyInfo.name}</h1>
                    </div>
                    {this.state.filteredJobs ? this.state.filteredJobs.map((job) => <SingleDashboardJob 
                        title={job.title} 
                        companyName={this.state.companyName}
                        area={job.area}
                        created_date={job.created_date}
                        description={job.description}
                        experience={job.experience}
                        hours={job.hours}
                        location={job.location}
                        posted_by_company={job.posted_by_company}
                        salary={job.salary}
                        slug={job.slug}
                        id={job.id}
                        userCompanies={this.state.userCompanies}
                        />) : <p>no</p>}
                </section>   
         
            </div>
        )
    }
}

export default Company;