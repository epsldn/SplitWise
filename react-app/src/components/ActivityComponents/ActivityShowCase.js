import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteActivity } from "../../store/activities";
import styles from "../../stylesheets/ActivityShowCase.module.css";
import MainNavBar from "../MainNavBar";

function ActivityShowCase() {
    const { activityId } = useParams();
    const user = useSelector(state => state.session.user);
    const activity = useSelector(state => state.activites[activityId]);
    const dispatch = useDispatch();
    const history = useHistory();

    function handleDeleteActivity() {
        const deleted = dispatch(deleteActivity(activityId));

        if (deleted.error) {
            console.log(deleted);
        } else {
            history.push("/");
        }
    }

    function formatTime(time) {
        if (!time) return "00";

        time = time.toString();

        if (time.length === 1) {
            console.log(time);
            return "0" + time;
        }

        return time;
    }

    let date, tHours, tMinutes, tSeconds;
    if (activity) {
        date = new Date(activity.date);
        [tHours, tMinutes, tSeconds] = activity.time.split(":");
    }

    console.log(date, tHours, tMinutes, tSeconds);
    return (
        <div className={styles.pageOuterContainer}>
            <MainNavBar />
            <div className={styles.activitiesContainer}>
                {
                    user?.id === activity?.user_id &&
                    <div className={styles.iconsContainer}>
                        <div className={styles.iconContainer}>
                            <i className="fa-solid fa-pencil" />
                        </div>
                        <div className={styles.iconContainer} onClick={handleDeleteActivity}>
                            <i className="fa-regular fa-trash-can" />
                        </div>
                    </div>
                }

                <div className={styles.activityInfo}>
                    <div className={styles.activityHeader}>
                        <h1>{`${"first".slice(0, 1).toUpperCase() + "first".slice(1).toLocaleLowerCase()} ${"last".slice(0, 1).toUpperCase() + "last".slice(1).toLocaleLowerCase()} - ${activity?.sport}`}</h1>
                    </div>
                    <div className={styles.activityBody}>
                        <div className={styles.activityBodyLeft}>
                            <div id={styles.activityMainContent}>
                                <div id={styles.activityProfilePicture}>
                                    <img src={activity?.profilePicture || "https://striveonrender.s3.us-west-2.amazonaws.com/29215abf55974d0084dcb1b46a1f3c8c.png"} alt="Profile" />
                                </div>
                                <div id={styles.activityMainContentInfo}>
                                    <p></p>
                                    <p>{activity?.title}</p>
                                    <p>{activity?.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.activityBodyRight}>
                            <div id={styles.activityTime}>
                                {`${activity?.hours}:${formatTime(activity?.minutes)}:${formatTime(activity?.seconds)}`}
                                <p>Duration</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default ActivityShowCase;