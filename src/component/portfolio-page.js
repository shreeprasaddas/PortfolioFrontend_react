import { React, useState, useEffect } from "react";
import './protfolio-page.css';
import { menuClose } from "./NavBar";  // Assuming you have a NavBar component
import fetchPortfolioData from "./fetchData/fetchPortfolio.js";


const webUrl= "http://localhost:9000/";
const Portfolio = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const projectList = await fetchPortfolioData();
                console.log("Fetched projects:", projectList[0].Data);
                setProjects(projectList[0].Data);
            } catch (error) {
                console.error("Error in fetching data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="portfolio-main-container" onClick={menuClose}>
            <div className="container">
                {projects.length === 0 ? (
                    <p>No projects available</p>
                ) : (
                    projects.map((project, index) => (
                        <div key={index} className="element">
                            <img src={(webUrl+project.imgLink) || 'fallback-image.jpg'} alt="Project" />  {/* Dynamic image */}
                            <div className="content">
                                <h1 className="project_heading">{project.title}</h1>  {/* Dynamic title */}
                                <p className="project_paragraph">{project.paragraph}</p>  {/* Dynamic paragraph */}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Portfolio;
