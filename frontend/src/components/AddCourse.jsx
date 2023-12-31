import React, { useState, useEffect, useContext} from 'react';
import { notification, Card, Dropdown, Button, Menu, Modal } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import axios from 'axios';
import addCourseImage from '../assets/addCourse.svg';

import { UserContext } from '../App';

const AddCourse = ({availableCourses, fetchAvailableCourses}) => {
    // const [availableCourses, setAvailableCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const userContext = useContext(UserContext);

    useEffect(() => {
        // Fetch available courses when the component mounts
        fetchAvailableCourses();
    }, []);

    const handleMenuClick = (e) => {
        const selectedCourseId = parseInt(e.key, 10);
        const course = availableCourses.find((c) => c.id === selectedCourseId);
        setSelectedCourse(course);
    };

    const handleEnrollButtonClick = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}enroll`, {
                courseId: selectedCourse.uid,
                uid: userContext.getUserUid(),
            });

            const result = response.data;

            if (result.success) {

                fetchAvailableCourses(); // Update available courses after enrolling
                notification.success({
                    message: 'Enrollment Success',
                    description: 'You have successfully enrolled in the course.',
                });
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error('Error enrolling in the course:', error);
        }
    };

    return (
        <Card
            title='Add course'
            cover={<img src={addCourseImage} alt="Add Course" height={300} />}
            style={{ height: 650, width: '60%' }}
            actions={[
                <Dropdown
                    overlay={
                        <Menu onClick={handleMenuClick}>
                            {availableCourses.map((course) => (
                                <Menu.Item key={course.id}>
                                    {course.courseName}
                                </Menu.Item>
                            ))}
                        </Menu>
                    }
                    placement="bottomLeft"
                    key="dropdown"
                >
                    <Button>
                        {selectedCourse ? selectedCourse.courseName : 'Select Course'} <DownOutlined />
                    </Button>
                </Dropdown>,
                <Button type="primary" key="button" disabled={!selectedCourse} onClick={handleEnrollButtonClick}>
                    Enroll Now
                </Button>,
            ]}
        >
            {selectedCourse && (
                <Card.Meta
                    title={`${selectedCourse.uid} ${selectedCourse.courseName}`}
                    description={
                        <div>
                            <p><strong>Teacher:</strong> {selectedCourse.teacher}</p>
                            <p><strong>Day:</strong> {selectedCourse.day}</p>
                            <p><strong>Time:</strong> {selectedCourse.startTime} - {selectedCourse.endTime}</p>
                            <p><strong>Classroom:</strong> {selectedCourse.classroom}</p>
                        </div>
                    }
                />
            )}
        </Card>
    );
};

export default AddCourse;
