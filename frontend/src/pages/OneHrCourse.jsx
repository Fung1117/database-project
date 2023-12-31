import React, { useState, useEffect, useContext } from 'react';
import { Button, Empty } from 'antd';
import axios from 'axios';
import CourseInfoItem from '../components/CourseInfoItem';
import { UserContext } from '../App';

/*
GET, /upcomingCourse:

    {
        "uid": str (COMPXXXX),
        "name": str,
        "teacher": str,
        "startTime": str (HH:MM),
        "endTime": str (HH:MM),
        "day": str (Mon, Tue, Wed, Thu, Fri, Sat, Sun)
        "classroom": str,
        "zoomLink": str (Link to zoom meeting),
        "resourceLink": str (Link to course resources)
    }

*/

const OneHrCourse = () => {
    const [course, setCourses] = useState(null);
    const [timeLeft, setTimeLeft] = useState(3600);
    const [oneHrCourseExist, setOneHrCourseExist] = useState(false);
    const userContext = useContext(UserContext);

    const now = new Date();

    function isEmpty(obj) {
        for (const prop in obj) {
          if (Object.hasOwn(obj, prop)) {
            return false;
          }
        }
      
        return true;
      }

    useEffect(() => {
        const fetchUpcomingCourses = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}upcomingCourse`, {params:{uid: userContext.getUserUid()}});
                const data = response.data[0];
                if (isEmpty(data)) return;

                setOneHrCourseExist(true);
                setCourses(data);
                setTimeLeft(3600);
                const [hours, minutes] = data.startTime.split(':');
                setTimeLeft((hours - now.getHours()) * 3600 + (minutes - now.getMinutes()) * 60 + (60 - now.getSeconds()))
            } catch (error) {
                console.error('Error fetching upcoming courses:', error);
            }
        };

        fetchUpcomingCourses();
    }, []);

    return (
        <>
        {oneHrCourseExist && 
            <CourseInfoItem
                courseTitle={`${course.uid} ${course.name}`}
                courseUid={course.uid}
                timeLeft={timeLeft}
                zoomLink={course.zoomLink}
                resourceLink={course.resourceLink}
            />
        }
        {!oneHrCourseExist &&
            <Empty 
            description={
                <span>
                    No upcoming course
                </span>
              }>
            </Empty>
        }
        </>
    );
};

export default OneHrCourse;