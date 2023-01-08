import { useEffect, useRef, useState } from "react";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MainNavBar from "./MainNavBar";
import defaultProfile from "../assets/defaultProfile.png";
import styles from "../stylesheets/AthleteShowcase.module.css";
import ClubImages from "./HomePage/ClubImages";
import ActivityCard from "./HomePage/ActivityCard";
import { authenticate } from "../store/session";

function AthleteShowcase() {
    const { athleteId } = useParams();
    const user = useSelector(state => state.session.user);
    const [athlete, setAthlete] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const activities = athlete?.activities || [];
    const history = useHistory();

    const profilePictureInput = useRef(null);
    const dispatch = useDispatch();
    document.title = `${athlete?.firstName} ${athlete?.lastName} | Strive`;


    useEffect(() => {
        fetch(`/api/users/${athleteId}`)
            .then(response => response.json())
            .then(athlete => setAthlete(athlete));
    }, [athleteId]);

    if (isLoaded && !athlete) {
        return <Redirect to="/" />;
    }

    async function handleImageChange(event) {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append("image", image);

        const res = await fetch('/api/images/user-profile/', {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            fetch(`/api/users/${athleteId}`)
                .then(response => response.json())
                .then(athlete => setAthlete(athlete));
            const updatedAthlete = await res.json();
            setAthlete(updatedAthlete);
        }
        else {
            const errors = await res.json();
            console.log(errors);
        }
    }


    return (
        <div className={styles.outerContainer}>
            <MainNavBar setIsloaded={setIsLoaded} />
            {isLoaded && <div className={styles.mainContent}>
                <div className={styles.profilePictureContainer}>
                    <div id={styles.profilePicture}>
                        <img src={athlete.profilePicture || defaultProfile} alt="Athlete Avatar" />
                        {user.id === athlete.id &&
                            <label>
                                <input
                                    style={{ display: "none" }}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    id="profile-image-upload"
                                    ref={profilePictureInput}
                                />
                            </label>}
                    </div>
                    {user.id === athlete.id &&
                        <div id={`${styles.faStack}`} className={`fa-stack`} onClick={() => profilePictureInput.current.click()}>
                            <i style={{ color: "white" }} className="fa-solid fa-circle fa-stack-1x" />
                            <i style={{ color: "lightgray" }} className="fa-solid fa-circle-plus fa-stack-2x" />
                        </div>
                    }
                </div>
                <p id={styles.name}>{athlete.firstName} {athlete.lastName}</p>
                <div className={styles.mainInfoContainer}>
                    <div className={styles.mainInfoContainerLeft}>
                        <ul id={styles.tabs}>
                            <li id={styles.activeTab}>Recent Activity</li>
                        </ul>
                        <ul className={styles.clubActivities}>
                            {activities.length > 0 ?
                                activities.map(activity => {
                                    return (
                                        <li key={activity.id} className={styles.activityCard}><ActivityCard activity={activity} /></li>
                                    );
                                }) : ["No Activities"].map(activity => {
                                    return (
                                        <li key={activity.id} className={styles.activityCard}><ActivityCard activity={activity} /></li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                    <div className={styles.mainInfoContainerRight}>
                        <div id={styles.clubSection}>
                            <p id={styles.clubs}>Clubs</p>
                            <ul id={styles.clubContainer}>
                                {Object.values(athlete.joined_clubs).length > 0 ?
                                    Object.values(athlete.joined_clubs).map(club => {
                                        return (
                                            <Link key={club.id} to={`/clubs/${club.id}`}><ClubImages club={club} /></Link>
                                        );
                                    }) : <li style={{ fontSize: "1.4rem" }}>No clubs yet!</li>}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>}
        </div >
    );
}

export default AthleteShowcase;