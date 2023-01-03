import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "../../stylesheets/ActivityShowCase.module.css";
import MainNavBar from "../MainNavBar";

function ActivityShowCase() {
    const { activityId } = useParams();
    const user = useSelector(state => state.session.user);
    const activity = useSelector(state => state.activites[activityId]);

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
                        <div className={styles.iconContainer}>
                            <i className="fa-regular fa-trash-can" />
                        </div>
                    </div>
                }
            </div>
        </div >
    );
}

export default ActivityShowCase;