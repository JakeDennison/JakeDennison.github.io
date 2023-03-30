
import React, { useRef } from 'react';
import { Link, animateScroll as scroll } from "react-scroll";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import logo from './images/new_logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './custom-bootstrap.css';

function App() {
  const classes = [
    {
      name: "Puppy Foundation Class",
      availability: "Open",
      image: "/images/foundation.png",
      timeslot: "7:00pm - 7:30pm",
      description: (
        <div className="text-start list-unstyled">
        <p>The Kennel Club have a detailed description of what the puppy and handler will have learnt by the end of the course. The topics include:</p>
        <ul>
        <li>Responsibility and Care:</li>
        <ul>
          <li>Cleanliness and Identification</li>
          <li>Recognition of basic health problems</li>
          <li>Teething, chewing and daily routine</li>
          <li>House training and separation anxiety</li>
        </ul>
        <li>Puppy Play</li>
        <li>Socialisation, with dogs and people</li>
        <li>Puppy Recall</li>
        <li>Basic Puppy Positions</li>
        <li>Walking on the lead</li>
        <li>Stay (for about 10 seconds at this stage)</li>
        <li>Take an article away from the puppy</li>
        <li>Food Manners</li>
        </ul>
        </div>
      ),
    },
    {
      name: "Bronze dog Award Class",
      availability: "Fully booked",
      image: "/images/bronze.png",
      timeslot: "7:30pm - 8:00pm",
      description: (
        <div className="text-start list-unstyled">
        <p>
          The dog and handler must have passed the Bronze Award before they can take the Silver Award.
          <a href="http://www.thekennelclub.org.uk/dogtraining" target="_blank" title="About the Kennel Club Good Citizen scheme. Opens in a new window">
            The Kennel Club
          </a>
          have a
          <a href="http://www.thekennelclub.org.uk/download/2851/gcdssilver.pdf" title="PDF of Silver Award Scheme. Opens in a new window">
            detailed description
          </a>
          of what the dog and handler will have learnt by the end of this course. This includes:
        </p>
        <ul>
          <li>Play with the Dog: Play adds an extra dimension to a dog's life and can be used to make training fun.</li>
          <li>Road Walk: test the ability of the dog to walk on a lead under control on a public highway</li>
          <li>Rejoin handler: the dog to remain steady, off lead, while the handler moves away, and to rejoin the handler when called</li>
          <li>Vehicle Control: That the dog will enter, stay in, and exit the car safely and under control</li>
          <li>Come away from Distractions</li>
          <li>Stay in one place without changing position: for two minutes with the handler nearby</li>
          <li>Controlled Greeting: without jumping up</li>
          <li>Food Manners: not to beg for or steal food</li>
          <li>Examination: by the examiner, of mouth, teeth, throat, eyes, ears and feet</li>
          <li>Responsibility and Care: Topics include a dog's needs, illness, responsibilities of ownership, other responsibilities, children, barking, dogs and stationary vehicles and vehicle travel</li>
        </ul>
        </div>
      ),
    },
    {
      name: "Silver Award Class",
      availability: "Fully booked",
      image: "/images/silver.png",
      timeslot: "8:00pm - 8:30pm",
      description: (
        <div className="text-start list-unstyled">
        <p>The Kennel Club have a detailed description of what the puppy and handler will have learnt by the end of the course. The topics include:</p>
        <ul>
        <li>Responsibility and Care:</li>
        <ul>
          <li>Cleanliness and Identification</li>
          <li>Recognition of basic health problems</li>
          <li>Teething, chewing and daily routine</li>
          <li>House training and separation anxiety</li>
        </ul>
        <li>Puppy Play</li>
        <li>Socialisation, with dogs and people</li>
        <li>Puppy Recall</li>
        <li>Basic Puppy Positions</li>
        <li>Walking on the lead</li>
        <li>Stay (for about 10 seconds at this stage)</li>
        <li>Take an article away from the puppy</li>
        <li>Food Manners</li>
        </ul>
        </div>
      ),
    },
    {
      name: "Gold Award Class",
      availability: "Fully booked",
      image: "/images/gold.png",
      timeslot: "8:30pm - 9:00pm",
      description: (
        <div className="text-start list-unstyled">
          <p>
          The dog and handler must have passed the
          <a href="http://www.bexleydogtrainingclub.co.uk/bronze.htm">Bronze Award</a>
          before they can take the Silver Award.
          <a href="http://www.thekennelclub.org.uk/dogtraining" target="_blank" title="About the Kennel Club Good Citizen scheme. Opens in a new window">
            The Kennel Club
          </a>
          have a
          <a href="http://www.thekennelclub.org.uk/download/2851/gcdssilver.pdf" title="PDF of Silver Award Scheme. Opens in a new window">
            detailed description
          </a>
          of what the dog and handler will have learnt by the end of this course. This includes:
        </p>
        <ul>
          <li>Play with the Dog: Play adds an extra dimension to a dog's life and can be used to make training fun.</li>
          <li>Road Walk: test the ability of the dog to walk on a lead under control on a public highway</li>
          <li>Rejoin handler: the dog to remain steady, off lead, while the handler moves away, and to rejoin the handler when called</li>
          <li>Vehicle Control: That the dog will enter, stay in, and exit the car safely and under control</li>
          <li>Come away from Distractions</li>
          <li>Stay in one place without changing position: for two minutes with the handler nearby</li>
          <li>Controlled Greeting: without jumping up</li>
          <li>Food Manners: not to beg for or steal food</li>
          <li>Examination: by the examiner, of mouth, teeth, throat, eyes, ears and feet</li>
          <li>Responsibility and Care: Topics include a dog's needs, illness, responsibilities of ownership, other responsibilities, children, barking, dogs and stationary vehicles and vehicle travel</li>
        </ul>
        </div>
      ),
    },
    {
      name: "Nine O'clockers",
      availability: "Fully booked",
      image: "/images/9oclock.png",
      timeslot: "9:00pm - 9:30pm",
      description: (
        <div className="text-start list-unstyled">
          <p>
          When you have obtained your Bronze, Silver and Gold Awards, what then? Tuesday evenings have become a way of life for you and your dog. You've seen what a difference the club has made to you both and have made friends with other owners, but there are no more Good Citizen Awards to go for.
          </p>
          <p>
          You're ready for the 9o'clock class! As well as working on more advanced obedience training, the class includes other activities such as Agility training and Scent retrieve training. Some members of this class are working towards competition standard.
          </p>
        </div>
      ),
    },
  ];
  
  const contactFormRef = useRef();

  const handleButtonClick = (contactType) => {
    // Scroll to contact form
    contactFormRef.current.scrollIntoView({ behavior: 'smooth' });

    // Set the contact type value
    document.getElementById(contactType).checked = true;
  };
  

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top" id="main-navbar">
      <div className="container">
            <Link
              className="navbar-brand"
              to="header"
              smooth={true}
              duration={500}
            >
              <img src={logo} alt="Bexley Dog Training Club" height="40" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="welcome-message"
                    smooth={true}
                    duration={500}
                  >
                    Our Message
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="gallery"
                    smooth={true}
                    duration={500}
                  >
                    Gallery
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="classes"
                    smooth={true}
                    duration={500}
                  >
                    Classes
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="about-us"
                    smooth={true}
                    duration={500}
                  >
                    About us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="links"
                    smooth={true}
                    duration={500}
                  >
                    Information & Useful Links
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="contact-us"
                    smooth={true}
                    duration={500}
                  >
                    Contact us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
      </nav>
  
      <div id="content" data-bs-spy="scroll" data-bs-target="#main-navbar" data-bs-offset="70">

        {/* Updates section */}
                <section id="updates" className="container section-anchor my-5">
            <div
              className="alert alert-info alert-dismissible fade show"
              role="alert"
            >
              {/* Add your latest update message here */}
              We have a new class starting next week! Register now to secure your spot.
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
        </section>

        {/* Welcome message */}
        <section id="welcome-message" className="container section-anchor my-5">
            <h2>Bexley Dog Training Club</h2>
            <p>
              We are a friendly local dog training club run by volunteers. Our members
              come from all around the local area and our trainers are all qualified and
              experienced ADTB trainers and/or The Kennel Club qualified good citizen
              examiners. We are registered with the Kennel Club and fully insured.
            </p>
            <p>
              Our classes start with Puppy class and extend through the Kennel Club
              Bronze, Silver and Gold awards. Many of our members choose to continue at
              the club after achieving these, as one of the Nine o'clockers.
            </p>
        </section>
  
        {/* Carousel */}
        <section id="gallery" className="container section-anchor carousel carousel-dark slide my-5">
        <div
              id="carouselExampleControls"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                {/* Replace "path/to/image" with the correct path to your images */}
                <div className="carousel-item active">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/9/99/Brooks_Chase_Ranger_of_Jolly_Dogs_Jack_Russell.jpg"
                    className="d-block w-100"
                    alt="Image 1"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Retriever_in_water.jpg"
                    className="d-block w-100"
                    alt="Image 2"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/c/c8/Black_Labrador_Retriever_-_Male_IMG_3323.jpg"
                    className="d-block w-100"
                    alt="Image 3"
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
        </section>
  
        {/* Classes */}
        <section id="classes" className="container section-anchor my-5">
        <div className="row">
          {classes.map((item, index) => (
            <div key={index} className="col-lg-5ths col-md-6 col-sm-12 mb-4">
              <div className="card h-100">
                <img src={item.image} className="card-img-top p-5" alt={`${item.name} class`} />
                <div className="card-body text-center">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">Availability: <span className={`badge ${item.availability === "Open" ? "bg-success" : "bg-danger"}`}>{item.availability}</span></p>
                  <p className="card-text">Timeslot: {item.timeslot}</p>
                </div>
                <div className="card-footer p-0">
                <button
                  className={`btn ${item.availability === "Open" ? "btn-primary" : "btn-secondary"} w-100 full-width-button`}
                  onClick={() => handleButtonClick(item.availability === "Open" ? "newBooking" : "joinWaitingList")}
                >
                  {item.availability === "Open" ? "Book Class" : "Join Waiting List"}
                </button>
                </div>
                <button type="button" className="btn btn-info badge rounded-pill position-absolute top-0 end-0 m-2" data-bs-toggle="modal" data-bs-target={`#modal${index}`}>
                  <FontAwesomeIcon icon={['fas', 'info']} />
                </button>
              </div>
              <div className="modal fade" id={`modal${index}`} tabIndex="-1" aria-labelledby={`modalLabel${index}`} aria-hidden="true">
                <div className="modal-dialog modal-wide">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id={`modalLabel${index}`}>{item.name} Information</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <p>{item.description}</p>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        </section>

        {/* About Us */}
        <section id="about-us" className="container section-anchor my-5">
          <h2>About Us</h2>
          <div className="row">
            <div className="col-md-6">
              <p>
                We are a passionate team of dog trainers dedicated to helping you and your furry friends build a strong, positive relationship. Our training programs are designed to equip both you and your dog with the skills necessary for a happy, well-behaved life together.
              </p>
              <p>
                With years of experience and a deep understanding of canine behavior, our trainers are committed to providing the highest quality training in a fun and supportive environment. We believe that every dog is unique, and our personalized approach ensures that your dog receives the attention and guidance they need to thrive.
              </p>
            </div>
            <div className="col-md-6">
              <iframe
                title="Google Map"
                width="100%"
                height="350"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0ulNH5eBBhh1ncRfAMNbo_2gd8puaOEg&q=St+Michaels+Church+HallUpper+Wickham+Ln,+Welling+DA16+3AP"
              ></iframe>
            </div>
          </div>
        </section>

        {/* Information & Useful Links */}
        <section id="links-contact" className="container section-anchor my-5">
          <div className="row">
          <div id="links" className="col-md-6 col-sm-12">
              <h2>Information & Useful Links</h2>
              <div className="d-grid gap-2">
                <button className="btn btn-outline-secondary text-start" onClick={() => window.open("https://www.example.com/link1", "_blank", "noopener noreferrer")}>
                  An item
                </button>
                <button className="btn btn-outline-secondary text-start" onClick={() => window.open("https://www.example.com/link2", "_blank", "noopener noreferrer")}>
                  A second item
                </button>
                <button className="btn btn-outline-secondary text-start" onClick={() => window.open("https://www.example.com/link3", "_blank", "noopener noreferrer")}>
                  A third item
                </button>
                <button className="btn btn-outline-secondary text-start" onClick={() => window.open("https://www.example.com/link4", "_blank", "noopener noreferrer")}>
                  A fourth item
                </button>
                <button className="btn btn-outline-secondary text-start" onClick={() => window.open("https://www.example.com/link5", "_blank", "noopener noreferrer")}>
                  And a fifth one
                </button>
              </div>
            </div>
              <div id="contact-us" className="col-md-6 col-sm-12" ref={contactFormRef}>
                <h2>Contact Us</h2>
                <form>
                  <div className="mb-3">
                    <label htmlFor="contactName" className="form-label">Name</label>
                    <input type="text" className="form-control" id="contactName" placeholder="Your name" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="contactEmail" className="form-label">Email</label>
                    <input type="email" className="form-control" id="contactEmail" placeholder="Your email" />
                  </div>
                  <div className="mb-3">
                  <label className="form-label">Contact Type</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="contactType" id="enquiry" value="Enquiry" required defaultChecked/>
                      <label className="form-check-label" htmlFor="enquiry">
                        Enquiry
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="contactType" id="newBooking" value="New Booking" />
                      <label className="form-check-label" htmlFor="newBooking">
                        New Booking
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="contactType" id="joinWaitingList" value="Join Waiting List" />
                      <label className="form-check-label" htmlFor="joinWaitingList">
                        Join Waiting List
                      </label>
                    </div>
                  </div>
                </div>

                  <div className="mb-3">
                    <label htmlFor="contactMessage" className="form-label">Message</label>
                    <textarea className="form-control" id="contactMessage" rows="5" placeholder="Your message"></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">Send Message</button>
                </form>
              </div>
            </div>
        </section>
      </div>
    </div>
  );
}

export default App;